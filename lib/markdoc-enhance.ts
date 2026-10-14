import { join } from "node:path";
import sharp from "sharp";
import { Tag, type RenderableTreeNode } from "@markdoc/markdoc";

type TagChild = Tag["children"][number];

function isTag(node: unknown, name?: string): node is Tag {
  return Tag.isTag(node) && (name === undefined || node.name === name);
}

// A "header-like" cell wraps its whole content in <strong>, which is how editors write a table's first row in Keystatic.
function isStrongOnlyCell(cell: TagChild): boolean {
  if (!isTag(cell, "td")) return false;
  const content = cell.children.filter((child) => !(typeof child === "string" && child.trim() === ""));
  return content.length > 0 && content.every((child) => isTag(child, "strong"));
}

// Markdown tables written in the editor come out with an empty <thead> and their header row in <tbody> as <td>.
// Moves that first row into <thead> and turns its cells into <th scope="col"> so screen readers get real headers.
export function promoteTableHeaders(node: RenderableTreeNode): RenderableTreeNode {
  if (!isTag(node)) return node;
  const children = node.children.map(promoteTableHeaders);

  if (node.name !== "table") return new Tag(node.name, node.attributes, children);

  const thead = children.find((child) => isTag(child, "thead")) as Tag | undefined;
  const tbody = children.find((child) => isTag(child, "tbody")) as Tag | undefined;
  const firstRow = tbody?.children.find((child) => isTag(child, "tr")) as Tag | undefined;
  const hasHeader = thead && thead.children.some((child) => isTag(child, "tr"));

  if (hasHeader || !thead || !tbody || !firstRow) return new Tag(node.name, node.attributes, children);
  if (!firstRow.children.filter((child) => isTag(child)).every(isStrongOnlyCell)) {
    return new Tag(node.name, node.attributes, children);
  }

  const headerRow = new Tag(
    "tr",
    firstRow.attributes,
    firstRow.children.map((cell) =>
      isTag(cell, "td")
        ? new Tag("th", { ...cell.attributes, scope: "col" }, cell.children.flatMap((c) => (isTag(c, "strong") ? c.children : [c])))
        : cell,
    ),
  );
  const newThead = new Tag("thead", thead.attributes, [headerRow]);
  const newTbody = new Tag(
    "tbody",
    tbody.attributes,
    tbody.children.filter((child) => child !== firstRow),
  );

  return new Tag(
    node.name,
    node.attributes,
    children.map((child) => (child === thead ? newThead : child === tbody ? newTbody : child)),
  );
}

// Adds width/height to body images (read from the files in /public) so the browser reserves their space before they load.
export async function addImageDimensions(node: RenderableTreeNode): Promise<RenderableTreeNode> {
  if (!isTag(node)) return node;
  const children = await Promise.all(node.children.map(addImageDimensions));
  const attributes = { ...node.attributes };

  if (node.name === "img" && typeof attributes.src === "string" && attributes.src.startsWith("/") && !attributes.width) {
    try {
      const { width, height } = await sharp(join(process.cwd(), "public", attributes.src)).metadata();
      if (width && height) {
        attributes.width = width;
        attributes.height = height;
      }
    } catch {
      // File not readable at runtime: keep the image without explicit dimensions.
    }
  }

  return new Tag(node.name, attributes, children);
}
