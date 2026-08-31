import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Blog - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Blog Satisa Formation",
    "Certification RNCP/RS, ingénierie pédagogique et digitalisation pour organismes de formation."
  );
}
