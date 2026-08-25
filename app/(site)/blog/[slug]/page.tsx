import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Markdoc from "@markdoc/markdoc";
import { ROUTES } from "@/lib/routes";
import { getAllPosts, getPost, getPostSlugs, CATEGORY_LABELS, formatPostDate } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.satisa-formation.fr/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();

  const postDate = post.date ?? "";

  const { node } = await post.content();
  const renderable = Markdoc.transform(node);
  const contentHtml = Markdoc.renderers.react(renderable, React);

  const allPosts = await getAllPosts();
  const suggestedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: postDate,
    author: { "@type": "Person", name: "Chris Blassiaux" },
    publisher: { "@type": "Organization", name: "Satisa Formation" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section>
        <div className="container article-header">
          <p className="eyebrow">{CATEGORY_LABELS[post.category]}</p>
          <h1>{post.title}</h1>
          <p className="post-card__meta">
            <time dateTime={postDate}>{formatPostDate(postDate)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </p>
        </div>
      </section>

      {post.coverImage && (
        <section className="section--flush-top">
          <div className="container article-body">
            <div className="article-cover">
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="section--flush-top">
        <div className="container article-body">{contentHtml}</div>
      </section>

      <section className="section--flush-top">
        <div className="container article-body">
          <div className="author-signature">
            <div className="photo-placeholder photo-placeholder--round" role="img" aria-label="Photo de Chris Blassiaux">
              CB
            </div>
            <div>
              <p className="author-signature__name">Chris Blassiaux</p>
              <Link className="author-signature__link" href={ROUTES.about}>Découvrir son parcours</Link>
            </div>
          </div>
        </div>
      </section>

      {suggestedPosts.length > 0 && (
        <section>
          <div className="container">
            <div className="section-head">
              <h2>Articles suggérés</h2>
            </div>
            <div className="grid grid--3">
              {suggestedPosts.map((suggested) => (
                <Link key={suggested.slug} className="post-card" href={`${ROUTES.blog}/${suggested.slug}`}>
                  <div className="post-card__thumb">
                    {suggested.coverImage && (
                      <Image
                        src={suggested.coverImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="post-card__thumb-img"
                      />
                    )}
                  </div>
                  <div className="post-card__body">
                    <div className="post-card__meta">
                      <span>{CATEGORY_LABELS[suggested.category]}</span>
                      <span>·</span>
                      <time dateTime={suggested.date}>{formatPostDate(suggested.date)}</time>
                    </div>
                    <h3 className="post-card__title">{suggested.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Un projet en tête ?</h2>
              <p>Commençons par un échange pour évaluer la faisabilité de votre projet.</p>
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
