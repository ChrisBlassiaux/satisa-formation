import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Markdoc, { Tag, type Config, type RenderableTreeNode } from "@markdoc/markdoc";
import { ROUTES, LINKEDIN_URL } from "@/lib/routes";
import LinkedInIcon from "@/components/LinkedInIcon";
import { addImageDimensions, promoteTableHeaders } from "@/lib/markdoc-enhance";
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
    image: {
      render: "img",
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        title: { type: String },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        return new Tag("img", { ...attributes, loading: "lazy", decoding: "async" }, []);
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

// Falls back to turning a plain "**Question ?**" + answer paragraph(s)
// pattern under an "FAQ" heading into the same accordion the {% faq-item %}
// tag produces. Content editors writing through Keystatic's rich-text
// editor don't reliably keep the custom tag syntax on re-save, so the
// accordion must also work without it.
function isBoldOnlyParagraph(node: RenderableTreeNode): boolean {
  if (!Tag.isTag(node) || node.name !== "p") return false;
  const kids = node.children.filter((c) => !(typeof c === "string" && c.trim() === ""));
  return kids.length === 1 && Tag.isTag(kids[0]) && kids[0].name === "strong";
}

const FAQ_HEADINGS = ["faq", "questions fréquentes", "questions frequentes", "foire aux questions"];

function headingLevel(node: RenderableTreeNode): number {
  return Tag.isTag(node) && /^h[1-6]$/.test(node.name) ? Number(node.name[1]) : 0;
}

function buildFaqItem(question: string, answer: RenderableTreeNode[]): RenderableTreeNode {
  return new Tag("details", { className: "faq-item" }, [
    new Tag("summary", { className: "faq-item__question" }, [
      question,
      new Tag("span", { className: "faq-item__icon", "aria-hidden": "true" }, []),
    ]),
    new Tag("div", { className: "faq-item__answer" }, answer),
  ]);
}

// Accepts two ways of writing the FAQ under a "FAQ" / "Questions fréquentes" heading:
//   1. "**Question ?**" paragraphs, each followed by its answer paragraph(s);
//   2. sub-headings (one per question), each followed by its answer (paragraphs, lists...).
function autoWrapFaqSection(tag: RenderableTreeNode): RenderableTreeNode {
  if (!Tag.isTag(tag)) return tag;
  const faqHeadingIndex = tag.children.findIndex(
    (c) =>
      headingLevel(c) >= 2 &&
      FAQ_HEADINGS.includes(extractText((c as Tag).children).trim().toLowerCase().replace(/\s+/g, " "))
  );
  if (faqHeadingIndex === -1) return tag;

  const faqLevel = headingLevel(tag.children[faqHeadingIndex]);
  const before = tag.children.slice(0, faqHeadingIndex + 1);
  const rest = tag.children.slice(faqHeadingIndex + 1);

  const items: RenderableTreeNode[] = [];
  let i = 0;

  if (rest.length > 0 && headingLevel(rest[0]) > faqLevel) {
    while (i < rest.length && headingLevel(rest[i]) > faqLevel) {
      const question = extractText((rest[i] as Tag).children).replace(/\s+/g, " ").trim();
      i++;
      const answer: RenderableTreeNode[] = [];
      while (i < rest.length && headingLevel(rest[i]) === 0) {
        answer.push(rest[i]);
        i++;
      }
      items.push(buildFaqItem(question, answer));
    }
  } else {
    while (i < rest.length && isBoldOnlyParagraph(rest[i])) {
      const question = extractText((rest[i] as Tag).children);
      i++;
      const answer: RenderableTreeNode[] = [];
      while (i < rest.length && Tag.isTag(rest[i]) && (rest[i] as Tag).name === "p" && !isBoldOnlyParagraph(rest[i])) {
        answer.push(rest[i]);
        i++;
      }
      items.push(buildFaqItem(question, answer));
    }
  }

  if (items.length === 0) return tag;
  return new Tag(tag.name, tag.attributes, [...before, ...items, ...rest.slice(i)]);
}

const SITE_URL = "https://www.satisa-formation.fr";

type FaqEntry = { question: string; answer: string };

// Reads the FAQ accordions (explicit {% faq-item %} tags or the auto-wrapped
// plain "**Question ?**" pattern) so the same content feeds the FAQPage JSON-LD.
function collectFaqEntries(tag: unknown): FaqEntry[] {
  if (!Tag.isTag(tag)) return [];
  if (tag.name === "details" && tag.attributes.className === "faq-item") {
    const summary = tag.children.find((c) => Tag.isTag(c) && c.name === "summary");
    const body = tag.children.find((c) => Tag.isTag(c) && c.name === "div");
    if (!Tag.isTag(summary) || !Tag.isTag(body)) return [];
    const question = extractText(summary.children).replace(/\s+/g, " ").trim();
    const answer = body.children
      .map((block) =>
        Tag.isTag(block) && (block.name === "ul" || block.name === "ol")
          ? block.children.map(extractText).join(" ")
          : extractText(block)
      )
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    return question && answer ? [{ question, answer }] : [];
  }
  return tag.children.flatMap(collectFaqEntries);
}

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

// Articles are written in Keystatic, so the two highlighted blocks are recognised by their structure rather
// than by an exact wording: the "L'essentiel à retenir" summary at the top, and the call to action at the end
// (the last group of buttons that point to Satisa's offer pages, with its title and intro when it has them).
// The FAQ and sources stay in the normal flow of the article.
function headingKey(node: RenderableTreeNode): string {
  return extractText((node as Tag).children)
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{N}\s'?]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

const OFFER_LINK =
  /^(?:https?:\/\/(?:www\.)?satisa-formation\.fr)?\/(?:deposer-une-certification-rncp-rs|concevoir-digitaliser-vos-formations|rendez-vous)(?:[/?#]|$)/;
const CTA_TITLE_WORDS = /accompagn|besoin d|rendez-vous|contact/;
const DEFAULT_CTA_TITLE = "Besoin d'un accompagnement ?";

type ArticleLink = { href: string; text: string };

function collectLinks(node: RenderableTreeNode): ArticleLink[] {
  if (!Tag.isTag(node)) return [];
  if (node.name === "a") {
    return [{ href: String(node.attributes.href ?? ""), text: extractText(node.children).replace(/\s+/g, " ").trim() }];
  }
  return node.children.flatMap(collectLinks);
}

function textOutsideLinks(node: unknown): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textOutsideLinks).join("");
  if (!Tag.isTag(node) || node.name === "a") return "";
  return textOutsideLinks(node.children);
}

// A "button" is a paragraph, quote or list made only of links to Satisa offer pages.
function isButtonNode(node: RenderableTreeNode): boolean {
  if (!Tag.isTag(node) || !["p", "blockquote", "ul", "ol"].includes(node.name)) return false;
  const links = collectLinks(node);
  return (
    links.length > 0 &&
    links.every((link) => OFFER_LINK.test(link.href)) &&
    textOutsideLinks(node).replace(/[\s\\]/g, "") === ""
  );
}

function isPlainParagraph(node: RenderableTreeNode): boolean {
  return Tag.isTag(node) && node.name === "p" && !isBoldOnlyParagraph(node);
}

function wrapKeyPoints(nodes: RenderableTreeNode[]): RenderableTreeNode[] {
  const out: RenderableTreeNode[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const level = headingLevel(node);
    const key = Tag.isTag(node) ? headingKey(node) : "";
    const isLabel = Tag.isTag(node) && (level >= 2 || node.name === "p") && key.includes("à retenir") && key.length < 60;
    if (!isLabel) {
      out.push(node);
      continue;
    }

    // Under a heading the summary runs to the next heading; after a bold label it is the list that follows.
    const items: RenderableTreeNode[] = [];
    let j = i + 1;
    while (
      j < nodes.length &&
      (level >= 2
        ? headingLevel(nodes[j]) === 0 && !(Tag.isTag(nodes[j]) && (nodes[j] as Tag).name === "hr")
        : Tag.isTag(nodes[j]) && ["ul", "ol"].includes((nodes[j] as Tag).name))
    ) {
      items.push(nodes[j]);
      j++;
    }
    const title = extractText((node as Tag).children).replace(/\s+/g, " ").trim();
    out.push(
      new Tag("div", { className: "article-key-points" }, [
        new Tag("p", { className: "article-key-points__title" }, [title]),
        ...items,
      ])
    );
    i = j - 1;
  }
  return out;
}

function wrapCta(nodes: RenderableTreeNode[]): { nodes: RenderableTreeNode[]; hasCta: boolean } {
  let last = -1;
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (isButtonNode(nodes[i])) {
      last = i;
      break;
    }
  }
  if (last === -1) return { nodes, hasCta: false };

  let first = last;
  while (first > 0 && isButtonNode(nodes[first - 1])) first--;

  // The intro paragraphs and title belong to the call to action only when the title speaks of support;
  // otherwise the paragraphs above are the conclusion of the article and stay where they are.
  let k = first - 1;
  const intro: RenderableTreeNode[] = [];
  while (k >= 0 && isPlainParagraph(nodes[k])) {
    intro.unshift(nodes[k]);
    k--;
  }
  const titleNode = k >= 0 ? nodes[k] : null;
  const hasTitle =
    titleNode !== null &&
    (headingLevel(titleNode) >= 2 || isBoldOnlyParagraph(titleNode)) &&
    CTA_TITLE_WORDS.test(headingKey(titleNode));

  const links: ArticleLink[] = [];
  for (const node of nodes.slice(first, last + 1)) {
    for (const link of collectLinks(node)) {
      if (!links.some((existing) => existing.href === link.href)) links.push(link);
    }
  }

  const title = hasTitle
    ? extractText((titleNode as Tag).children).replace(/\s+/g, " ").trim()
    : DEFAULT_CTA_TITLE;
  const box = new Tag("div", { className: "article-cta" }, [
    new Tag("h2", {}, [title]),
    ...(hasTitle ? intro : []),
    new Tag(
      "div",
      { className: "article-cta__actions" },
      links.map((link) => new Tag("a", { href: link.href, className: "article-cta__button" }, [link.text]))
    ),
  ]);

  const start = hasTitle ? k : first;
  return { nodes: [...nodes.slice(0, start), box, ...nodes.slice(last + 1)], hasCta: true };
}

function highlightSections(tag: RenderableTreeNode): { body: RenderableTreeNode; hasCta: boolean } {
  if (!Tag.isTag(tag)) return { body: tag, hasCta: false };
  const { nodes, hasCta } = wrapCta(wrapKeyPoints(tag.children));
  return { body: new Tag(tag.name, tag.attributes, nodes), hasCta };
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

  const metaTitle = post.seoTitle || post.title;

  return {
    title: metaTitle,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.satisa-formation.fr/blog/${slug}`,
    },
    openGraph: {
      title: `${metaTitle} - Satisa Formation`,
      description: post.excerpt,
      url: `https://www.satisa-formation.fr/blog/${slug}`,
      siteName: "Satisa Formation",
      locale: "fr_FR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${metaTitle} - Satisa Formation`,
      description: post.excerpt,
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
  const renderable = await addImageDimensions(promoteTableHeaders(autoWrapFaqSection(Markdoc.transform(node, MARKDOC_CONFIG))));
  const article = highlightSections(renderable);
  const contentHtml = Markdoc.renderers.react(article.body, React);
  const tocItems = collectToc(article.body);
  const readingTime = computeReadingTime(node);

  const allPosts = await getAllPosts();
  const suggestedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const faqEntries = collectFaqEntries(renderable);
  const faqJsonLd =
    faqEntries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }
      : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [`${SITE_URL}${post.coverImage}`] : undefined,
    datePublished: postDate,
    dateModified: post.updatedDate || postDate,
    mainEntityOfPage: `${SITE_URL}${ROUTES.blog}/${slug}`,
    author: {
      "@type": "Person",
      name: "Chris Blassiaux",
      url: `${SITE_URL}${ROUTES.about}`,
      sameAs: [LINKEDIN_URL],
    },
    publisher: {
      "@type": "Organization",
      name: "Satisa Formation",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo/logo-satisa-noir.svg` },
    },
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
                quality={90}
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                preload
                fetchPriority="high"
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
              <Image src="/images/photos/profil-chris-apropos-2.webp" alt="" width={56} height={56} />
            </div>
            <div>
              <p className="author-signature__name">Chris Blassiaux</p>
              <Link className="author-signature__link" href={ROUTES.about}>Découvrir son parcours</Link>
            </div>
            <a
              href={LINKEDIN_URL}
              className="social-link author-signature__social"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Chris Blassiaux sur LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
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
                        sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) 33vw, 380px"
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

      {!article.hasCta && (
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
      )}
    </>
  );
}
