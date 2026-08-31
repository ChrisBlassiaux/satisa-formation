import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Conception de parcours de formation - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Conception de parcours de formation",
    "Programme Qualiopi, contenus pédagogiques, digitalisation e-learning, LMS."
  );
}
