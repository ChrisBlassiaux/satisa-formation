import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/OgImage";

export const alt = "Dépôt de certification RNCP/RS - Satisa Formation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage(
    "Dépôt de certification RNCP/RS",
    "Diagnostic, référentiel, dépôt : guidé ou piloté selon votre formule."
  );
}
