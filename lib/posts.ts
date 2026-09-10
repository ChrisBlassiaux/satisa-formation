import { createReader } from "@keystatic/core/reader";
import Markdoc, { Tag, type Node } from "@markdoc/markdoc";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

const WORDS_PER_MINUTE = 200;

function extractPlainText(node: unknown): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractPlainText).join(" ");
  if (Tag.isTag(node)) return extractPlainText(node.children);
  return "";
}

export function computeReadingTime(node: Node): string {
  const text = extractPlainText(Markdoc.transform(node));
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min de lecture`;
}

export const CATEGORY_LABELS: Record<string, string> = {
  certification: "Certification RNCP/RS",
  formations: "Formations & digital",
};

export type PostSummary = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  coverImage: string | null;
};

export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await reader.collections.posts.all();
  const summaries = await Promise.all(
    posts.map(async ({ slug, entry }) => {
      const { node } = await entry.content();
      return {
        slug,
        title: entry.title,
        category: entry.category,
        date: entry.date ?? "",
        readingTime: computeReadingTime(node),
        excerpt: entry.excerpt ?? "",
        coverImage: entry.coverImage,
      };
    })
  );
  return summaries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostSlugs() {
  return reader.collections.posts.list();
}

export async function getPost(slug: string) {
  return reader.collections.posts.readOrThrow(slug);
}

export function formatPostDate(date: string) {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
