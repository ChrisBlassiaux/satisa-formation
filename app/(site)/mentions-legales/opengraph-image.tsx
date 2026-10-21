import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Mentions légales - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Mentions légales",
    "Satisa Formation, ingénierie de certification RNCP/RS et ingénierie pédagogique."
  );
}
