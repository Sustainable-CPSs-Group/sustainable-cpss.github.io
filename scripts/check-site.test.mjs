import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkSite } from "./check-site.mjs";
import { withBase } from "../src/lib/base-path.mjs";

test("base paths preserve external links and fragments", () => {
  for (const link of ["https://example.org/", "//example.org/image.png", "mailto:person@example.org", "#reference"]) {
    assert.equal(withBase(link, "/group/"), link);
  }
  assert.equal(withBase("/people/", "/group/"), "/group/people/");
  assert.equal(withBase("/group/people/", "/group/"), "/group/people/");
});

test("site checks detect broken images, links and citation anchors under a project path", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "site-check-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(join(directory, "people"));
  await writeFile(join(directory, "people/index.html"), '<h1 id="person">Person</h1>');
  await writeFile(join(directory, "image.webp"), "fixture");
  await writeFile(join(directory, "index.html"), '<a href="/group/people/#person">Person</a><img src="/group/image.webp" srcset="/group/image.webp 1x" width="20" height="30" alt="Portrait"><a href="https://example.org/">External</a>');
  assert.deepEqual((await checkSite({ directory, base: "/group/" })).errors, []);

  await writeFile(join(directory, "index.html"), '<a href="/people/">Wrong base</a><a href="/group/people/#missing">Broken citation</a><img src="/group/missing.webp" alt="Missing image">');
  const { errors } = await checkSite({ directory, base: "/group/" });
  assert(errors.some((e) => e.includes("base path")));
  assert(errors.some((e) => e.includes("Missing anchor")));
  assert(errors.some((e) => e.includes("Missing local page or asset")));
  assert(errors.some((e) => e.includes("missing dimensions")));
});
