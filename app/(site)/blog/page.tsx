import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { getAllPosts, CATEGORY_LABELS, formatPostDate } from "@/lib/posts";
import BlogFilters from "@/components/BlogFilters";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Certification RNCP/RS, ingénierie pédagogique et digitalisation : les articles de Satisa Formation pour les organismes de formation et certificateurs.",
  alternates: {
    canonical: "https://www.satisa-formation.fr/blog",
  },
  openGraph: {
    title: "Blog - Satisa Formation",
    description:
      "Certification RNCP/RS, ingénierie pédagogique et digitalisation : les articles de Satisa Formation pour les organismes de formation et certificateurs.",
    url: "https://www.satisa-formation.fr/blog",
    siteName: "Satisa Formation",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Satisa Formation",
    description:
      "Certification RNCP/RS, ingénierie pédagogique et digitalisation : les articles de Satisa Formation pour les organismes de formation et certificateurs.",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Le blog</p>
            <h1>Certification et digitalisation, expliquées sans jargon</h1>
            <p className="hero-page__subtitle" style={{ marginTop: "1rem" }}>
              Des articles pratiques pour les organismes de formation et certificateurs qui avancent sur leur projet
              RNCP/RS ou leur digitalisation pédagogique.
            </p>
          </div>
        </div>
      </section>

      <section className="section--flush-top">
        <div className="container">
          <BlogFilters>
            <div className="blog-filters" role="group" aria-label="Filtrer par catégorie">
              <button className="tag tag--active" data-filter="all">Tous les articles</button>
              <button className="tag" data-filter="certification">Certification RNCP/RS</button>
              <button className="tag" data-filter="formations">Formations et digital</button>
            </div>

            <div className="grid grid--3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  className="post-card"
                  data-category={post.category}
                  href={`${ROUTES.blog}/${post.slug}`}
                >
                  <div className="post-card__thumb">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="post-card__thumb-img"
                      />
                    )}
                  </div>
                  <div className="post-card__body">
                    <div className="post-card__meta">
                      <span>{CATEGORY_LABELS[post.category]}</span>
                      <span>·</span>
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    </div>
                    <h2 className="post-card__title">{post.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </BlogFilters>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Une question sur votre situation ?</h2>
              <p>Les articles donnent des repères généraux. Parlons de votre cas précis.</p>
            </div>
            <div className="cta-banner__actions">
              <Link href={ROUTES.contact} className="btn btn--primary">Prendre un rendez-vous</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
