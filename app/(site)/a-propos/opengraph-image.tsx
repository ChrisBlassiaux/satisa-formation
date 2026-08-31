import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Ingénieur de certification RNCP freelance - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Ingénieur de certification RNCP freelance",
    "Ingénieur pédagogique pour organismes de formation. Double compétence, un seul interlocuteur."
  );
}
