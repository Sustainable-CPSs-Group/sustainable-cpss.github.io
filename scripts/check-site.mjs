import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { parse } from "parse5";

function elements(node) {
  return [node, ...(node.childNodes || []).flatMap(elements)];
}

export async function checkSite({ directory = "dist", base = "/", site = "https://sustainable-cpss-group.github.io" } = {}) {
  const root = resolve(directory);
  const prefix = base === "/" ? "" : "/" + base.replace(/^\/+|\/+$/g, "");
  const origin = new URL(site).origin;
  const files = (await readdir(root, { recursive: true })).filter((file) => file.endsWith(".html"));
  const documents = new Map();
  const errors = [];
  const error = (file, message) => errors.push(`${file}: ${message}`);
  for (const file of files) {
    const nodes = elements(parse(await readFile(resolve(root, file), "utf8")));
    documents.set(resolve(root, file), {
      nodes,
      ids: new Set(nodes.flatMap((n) => (n.attrs || []).filter((a) => a.name === "id").map((a) => a.value))),
    });
  }
  if (!files.length) errors.push("No HTML pages were built.");

  async function checkURL(value, pageURL, file) {
    if (!value || /^(mailto:|tel:|data:|javascript:)/i.test(value)) return;
    const url = new URL(value, pageURL);
    if (url.origin !== origin) return;
    if (prefix && url.pathname !== prefix && !url.pathname.startsWith(prefix + "/")) {
      error(file, `Link leaves the configured base path: ${value}`);
      return;
    }
    const local = decodeURIComponent(url.pathname.slice(prefix.length));
    let target = resolve(root, "." + (local || "/"));
    const rel = relative(root, target);
    if (rel === ".." || rel.startsWith(".." + sep)) {
      error(file, `Path leaves the build directory: ${value}`);
      return;
    }
    try {
      if ((await stat(target)).isDirectory()) target = resolve(target, "index.html");
      await stat(target);
    } catch {
      error(file, `Missing local page or asset: ${value}`);
      return;
    }
    if (url.hash && !url.hash.startsWith("#:~:") && documents.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!documents.get(target).ids.has(id)) error(file, `Missing anchor: ${value}`);
    }
  }

  for (const [filePath, { nodes }] of documents) {
    const file = relative(root, filePath).split(sep).join("/");
    const route = file === "index.html" ? "" : file.replace(/index\.html$/, "");
    const pageURL = new URL(prefix + "/" + route, origin);
    for (const node of nodes) {
      const attrs = Object.fromEntries((node.attrs || []).map((a) => [a.name, a.value]));
      if (node.tagName === "img") {
        if (!("alt" in attrs)) error(file, "Image is missing alt text.");
        if (!(Number(attrs.width) > 0 && Number(attrs.height) > 0)) error(file, `Image is missing dimensions: ${attrs.src}`);
      }
      if (["a", "link"].includes(node.tagName)) await checkURL(attrs.href, pageURL, file);
      if (["img", "script", "source"].includes(node.tagName)) await checkURL(attrs.src, pageURL, file);
      if (attrs.srcset && !attrs.srcset.startsWith("data:")) {
        for (const candidate of attrs.srcset.split(",")) {
          await checkURL(candidate.trim().split(/\s+/)[0], pageURL, file);
        }
      }
    }
  }
  return { pages: files.length, errors };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = await checkSite({ base: process.env.ASTRO_BASE || "/", site: process.env.ASTRO_SITE });
  if (result.errors.length) {
    console.error(result.errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Checked ${result.pages} pages: local links, anchors, image dimensions, and assets are valid.`);
  }
}
