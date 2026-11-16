import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://www.satisa-formation.fr";

// Last meaningful content change of each static page (update when a page's content changes).
const PAGE_LAST_MODIFIED = {
  home: "2026-10-21",
  certification: "2026-10-21",
  certificationRncp: "2026-10-21",
  certificationRs: "2026-10-21",
  formations: "2026-10-13",
  formationsConception: "2026-10-21",
  formationsDigitalisation: "2026-10-21",
  about: "2026-10-21",
  contact: "2026-10-08",
  legal: "2026-10-14",
  cgv: "2026-10-20",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const latestPostDate = posts.reduce((latest, post) => {
    const date = post.updatedDate ?? post.date;
    return date && date > latest ? date : latest;
  }, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}${ROUTES.home}`, lastModified: new Date(PAGE_LAST_MODIFIED.home), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}${ROUTES.certification}`, lastModified: new Date(PAGE_LAST_MODIFIED.certification), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}${ROUTES.certificationRncp}`, lastModified: new Date(PAGE_LAST_MODIFIED.certificationRncp), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}${ROUTES.certificationRs}`, lastModified: new Date(PAGE_LAST_MODIFIED.certificationRs), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}${ROUTES.formations}`, lastModified: new Date(PAGE_LAST_MODIFIED.formations), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}${ROUTES.formationsConception}`, lastModified: new Date(PAGE_LAST_MODIFIED.formationsConception), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}${ROUTES.formationsDigitalisation}`, lastModified: new Date(PAGE_LAST_MODIFIED.formationsDigitalisation), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}${ROUTES.about}`, lastModified: new Date(PAGE_LAST_MODIFIED.about), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}${ROUTES.blog}`, lastModified: latestPostDate ? new Date(latestPostDate) : undefined, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}${ROUTES.contact}`, lastModified: new Date(PAGE_LAST_MODIFIED.contact), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}${ROUTES.legalMentions}`, lastModified: new Date(PAGE_LAST_MODIFIED.legal), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}${ROUTES.privacy}`, lastModified: new Date(PAGE_LAST_MODIFIED.legal), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}${ROUTES.cgv}`, lastModified: new Date(PAGE_LAST_MODIFIED.cgv), changeFrequency: "yearly", priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
    lastModified: post.updatedDate || post.date ? new Date(post.updatedDate ?? post.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes];
}
