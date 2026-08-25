import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

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
  return posts
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      category: entry.category,
      date: entry.date ?? "",
      readingTime: entry.readingTime ?? "",
      excerpt: entry.excerpt ?? "",
      coverImage: entry.coverImage,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
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
