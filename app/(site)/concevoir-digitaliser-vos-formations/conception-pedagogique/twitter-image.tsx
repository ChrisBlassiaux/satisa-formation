import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Conception de formation conforme Qualiopi - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Conception de formation conforme Qualiopi",
    "Programme, scénario pédagogique et contenus alignés sur votre référentiel RNCP, RS ou interne."
  );
}
