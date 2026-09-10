import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Markdoc, { Tag, type Config } from "@markdoc/markdoc";
import { ROUTES } from "@/lib/routes";
import { getAllPosts, getPost, getPostSlugs, CATEGORY_LABELS, formatPostDate, computeReadingTime } from "@/lib/posts";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractText(node: unknown): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (Tag.isTag(node)) return extractText(node.children);
  return "";
}

// Lets articles author FAQ entries as {% faq-item question="..." %}...{% /faq-item %},
// rendered as the same <details>/<summary> accordion used on the offer pages.
const MARKDOC_CONFIG: Config = {
  nodes: {
    heading: {
      children: ["inline"],
      attributes: {
        level: { type: Number, render: false, required: true },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        const id = slugify(extractText(children));
        return new Tag(`h${node.attributes["level"]}`, { ...attributes, id }, children);
      },
    },
  },
  tags: {
    "faq-item": {
      render: "details",
      attributes: {
        question: { type: String, required: true },
      },
      children: ["paragraph", "list", "heading", "hr"],
      transform(node, config) {
        const { question } = node.transformAttributes(config);
        return new Tag("details", { className: "faq-item" }, [
          new Tag("summary", { className: "faq-item__question" }, [
            question,
            new Tag("span", { className: "faq-item__icon", "aria-hidden": "true" }, []),
          ]),
          new Tag("div", { className: "faq-item__answer" }, node.transformChildren(config)),
        ]);
      },
    },
  },
};

type TocItem = { id: string; text: string; level: number };

function collectToc(tag: unknown): TocItem[] {
  if (!Tag.isTag(tag)) return [];
  const items: TocItem[] = [];
  for (const child of tag.children) {
    if (Tag.isTag(child) && (child.name === "h2" || child.name === "h3")) {
      items.push({
        id: String(child.attributes.id ?? ""),
        text: extractText(child.children),
        level: Number(child.name[1]),
      });
    }
  }
  return items;
}

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
    openGraph: {
      title: `${post.title} - Satisa Formation`,
      description: post.excerpt,
      url: `https://www.satisa-formation.fr/blog/${slug}`,
      siteName: "Satisa Formation",
      locale: "fr_FR",
      type: "article",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Satisa Formation`,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
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
  const renderable = Markdoc.transform(node, MARKDOC_CONFIG);
  const contentHtml = Markdoc.renderers.react(renderable, React);
  const tocItems = collectToc(renderable);
  const readingTime = computeReadingTime(node);

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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.satisa-formation.fr/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.satisa-formation.fr/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.satisa-formation.fr/blog/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section>
        <div className="container article-header">
          <p className="eyebrow">{CATEGORY_LABELS[post.category]}</p>
          <h1>{post.title}</h1>
          <p className="post-card__meta">
            <time dateTime={postDate}>{formatPostDate(postDate)}</time>
            <span>·</span>
            <span>{readingTime}</span>
          </p>
        </div>
      </section>

      {post.coverImage && (
        <section className="section--flush-top">
          <div className="container article-body">
            <div className="article-cover">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="section--flush-top">
        <div className="container article-layout">
          {tocItems.length > 1 && (
            <aside className="article-toc">
              <p className="article-toc__title">Sommaire</p>
              <ul>
                {tocItems.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "article-toc__item--sub" : undefined}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <div className="article-body">{contentHtml}</div>
        </div>
      </section>

      <section className="section--flush-top">
        <div className="container article-body">
          <div className="author-signature">
            <div className="author-signature__avatar">
              <Image src="/images/photos/profil-chris.webp" alt="" width={56} height={56} />
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
                        alt={suggested.title}
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
