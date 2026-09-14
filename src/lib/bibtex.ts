export interface BibEntry {
  key: string;
  type: string;
  fields: Record<string, string>;
}

function clean(value = "") {
  return value
    .replace(/[{}]/g, "")
    .replace(/\\&/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseBibtex(source: string): BibEntry[] {
  const entries: BibEntry[] = [];
  let cursor = 0;
  while (cursor < source.length) {
    const start = source.indexOf("@", cursor);
    if (start < 0) break;
    const header = source.slice(start).match(/^@(\w+)\s*[{(]\s*([^,\s]+)\s*,/);
    if (!header) {
      cursor = start + 1;
      continue;
    }
    const type = header[1].toLowerCase();
    let i = start + header[0].length;
    let depth = 1;
    let quoted = false;
    while (i < source.length && depth > 0) {
      const char = source[i];
      if (char === '"' && source[i - 1] !== "\\") quoted = !quoted;
      if (!quoted && (char === "{" || char === "(")) depth++;
      if (!quoted && (char === "}" || char === ")")) depth--;
      i++;
    }
    cursor = i;
    if (type === "comment" || type === "preamble" || type === "string") continue;
    const body = source.slice(start + header[0].length, i - 1);
    const fields: Record<string, string> = {};
    let pos = 0;
    while (pos < body.length) {
      const field = body.slice(pos).match(/(?:^|,)\s*([\w-]+)\s*=\s*/);
      if (!field) break;
      const name = field[1].toLowerCase();
      pos += field.index! + field[0].length;
      const opener = body[pos];
      let value = "";
      if (opener === "{" || opener === '"') {
        const closer = opener === "{" ? "}" : '"';
        let nested = opener === "{" ? 1 : 0;
        let j = pos + 1;
        while (j < body.length) {
          const char = body[j];
          if (opener === "{" && char === "{") nested++;
          if (char === closer && (opener === '"' || --nested === 0)) break;
          value += char;
          j++;
        }
        pos = j + 1;
      } else {
        const end = body.indexOf(",", pos);
        value = body.slice(pos, end < 0 ? body.length : end);
        pos = end < 0 ? body.length : end + 1;
      }
      fields[name] = clean(value);
    }
    entries.push({ key: header[2], type, fields });
  }
  return entries.sort((a, b) => Number(b.fields.year || 0) - Number(a.fields.year || 0));
}

export function formatAuthors(author = "") {
  return author
    .split(/\s+and\s+/)
    .map((name) => {
      const [family, given] = name.split(",").map((part) => part.trim());
      return given ? `${given} ${family}` : family;
    })
    .join(", ");
}

export function venue(entry: BibEntry) {
  return entry.fields.journal || entry.fields.booktitle || entry.fields.publisher || "";
}
