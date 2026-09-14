import { visit } from "unist-util-visit";
import { withBase } from "./base-path.mjs";

export default function remarkLinks({ base = "/" } = {}) {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "link" || node.type === "definition") {
        node.url = withBase(node.url, base);
      }
    });
  };
}
