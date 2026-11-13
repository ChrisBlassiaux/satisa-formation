import { renderOgImage, ogTitle, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";
import { metadata } from "./page";

export const alt = "Satisa Formation - Certification RNCP/RS et ingénierie pédagogique digitale";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(ogTitle(metadata));
}
