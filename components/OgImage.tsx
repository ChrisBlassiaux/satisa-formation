import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import type { Metadata } from "next";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const SITE_SUFFIX = " - Satisa Formation";

// Titre de la balise <title> d'une page, sans le suffixe « - Satisa Formation » (ajouté par le gabarit du site).
export function ogTitle(metadata: Metadata): string {
  const title = metadata.title;
  let text = "Satisa Formation";
  if (typeof title === "string") text = title;
  else if (title && "absolute" in title && title.absolute) text = title.absolute;
  else if (title && "default" in title && title.default) text = title.default;
  return text.endsWith(SITE_SUFFIX) ? text.slice(0, -SITE_SUFFIX.length) : text.trim();
}

// Fond du gabarit (logo, vagues, pinceau turquoise vide, ordinateur) : public/images/og/fond-open-graph.png
let backgroundCache: string | undefined;
async function background(): Promise<string> {
  if (!backgroundCache) {
    const file = await readFile(join(process.cwd(), "public/images/og/fond-open-graph.png"));
    backgroundCache = `data:image/png;base64,${file.toString("base64")}`;
  }
  return backgroundCache;
}

// Zone du pinceau (en pixels de l'image 1200 x 630) dans laquelle s'écrit le titre.
const BANNER = { left: 157, top: 233, width: 580, height: 160 };

// Plus le titre est long, plus la police diminue, pour que tout tienne dans le pinceau.
function titleFontSize(title: string): number {
  for (const size of [52, 46, 42, 38, 34, 30, 27, 24]) {
    const charsPerLine = Math.floor(BANNER.width / (size * 0.56));
    const lines = Math.ceil(title.length / charsPerLine);
    if (lines * size * 1.2 <= BANNER.height) return size;
  }
  return 22;
}

export async function renderOgImage(title: string) {
  const fontSize = titleFontSize(title);
  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#ffffff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={await background()}
          alt=""
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            left: BANNER.left,
            top: BANNER.top,
            width: BANNER.width,
            height: BANNER.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize,
            fontWeight: 700,
            // La police par défaut n'a pas de graisse intermédiaire : un léger contour reproduit le style semi-gras du modèle.
            WebkitTextStroke: "1.4px #002730",
            lineHeight: 1.2,
            textWrap: "balance",
            color: "#002730",
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
