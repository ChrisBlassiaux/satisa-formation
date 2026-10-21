import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { getPost } from "@/lib/posts";

// Bloc « Pour aller plus loin » : liens vers les articles du blog, pour le maillage interne entre pages d'offre et articles.
export default async function RelatedArticles({ slugs }: { slugs: string[] }) {
  const posts = (await Promise.all(slugs.map((slug) => getPost(slug).catch(() => null)))).map((post, index) =>
    post ? { slug: slugs[index], title: post.title, excerpt: post.excerpt } : null
  );
  const items = posts.filter((post): post is { slug: string; title: string; excerpt: string } => post !== null);
  if (items.length === 0) return null;

  return (
    <section>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Pour aller plus loin</p>
          <h2>Nos guides sur le sujet</h2>
        </div>
        <ul className="related-articles">
          {items.map((item) => (
            <li key={item.slug}>
              <Link href={`${ROUTES.blog}/${item.slug}`} className="related-articles__link">
                <strong>{item.title}</strong>
                <span>{item.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
