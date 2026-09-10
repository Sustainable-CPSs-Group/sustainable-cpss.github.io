import { visit } from "unist-util-visit";

const citationPattern = /\[@([\w:.-]+)\]/g;

export default function remarkCitations() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (index === undefined || !parent || !citationPattern.test(node.value)) return;

      citationPattern.lastIndex = 0;
      const children = [];
      let cursor = 0;
      for (const match of node.value.matchAll(citationPattern)) {
        if (match.index > cursor) children.push({ type: "text", value: node.value.slice(cursor, match.index) });
        children.push({
          type: "link",
          url: `#ref-${match[1]}`,
          data: { hProperties: { className: ["citation"], "aria-label": `Reference ${match[1]}` } },
          children: [{ type: "text", value: `[${match[1]}]` }],
        });
        cursor = match.index + match[0].length;
      }
      if (cursor < node.value.length) children.push({ type: "text", value: node.value.slice(cursor) });
      parent.children.splice(index, 1, ...children);
      return index + children.length;
    });
  };
}
