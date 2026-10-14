import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Satisa Formation",
    short_name: "Satisa",
    description: "Ingénierie de certification RNCP/RS et ingénierie pédagogique et digitale pour les organismes de formation.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#002730",
    lang: "fr",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
