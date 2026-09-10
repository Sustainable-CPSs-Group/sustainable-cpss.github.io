import { visit } from "unist-util-visit";

// An image followed by an italic caption stays simple to author in Markdown.
export default function remarkFigures() {
  return (tree) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (index === undefined || !parent || node.children.length !== 1 || node.children[0].type !== "image") return;
      const caption = parent.children[index + 1];
      if (caption?.type !== "paragraph" || caption.children.length !== 1 || caption.children[0].type !== "emphasis") return;
      node.data = { ...node.data, hName: "figure" };
      node.children.push({
        ...caption.children[0],
        data: { ...caption.children[0].data, hName: "figcaption" },
      });
      parent.children.splice(index + 1, 1);
    });
  };
}
