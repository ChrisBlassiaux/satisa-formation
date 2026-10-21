import { join } from "node:path";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { renderArticleOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";
import { getPost, getPostSlugs } from "@/lib/posts";

export const alt = "Article du blog Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Convertit l'illustration de couverture (WebP) en PNG : format lu par le générateur d'images.
async function coverAsPng(cover?: string | null): Promise<string | undefined> {
  if (!cover || !cover.startsWith("/")) return undefined;
  try {
    const file = await readFile(join(process.cwd(), "public", cover));
    const png = await sharp(file).resize(480, 320, { fit: "cover" }).png().toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) return renderArticleOgImage("Blog Satisa Formation");
  return renderArticleOgImage(post.title, await coverAsPng(post.coverImage));
}
