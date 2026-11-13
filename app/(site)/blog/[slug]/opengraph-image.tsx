import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";
import { getPost, getPostSlugs } from "@/lib/posts";

export const alt = "Article du blog Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Le titre de l'image est celui de la balise <title> de l'article (titre SEO, sinon titre de l'article).
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  return renderOgImage(post ? post.seoTitle || post.title : "Blog Satisa Formation");
}
