import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://www.satisa-formation.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}${ROUTES.home}`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}${ROUTES.certification}`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}${ROUTES.formations}`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}${ROUTES.about}`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}${ROUTES.blog}`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}${ROUTES.contact}`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}${ROUTES.blog}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes];
}
