import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage(tagline: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#002730",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div style={{ width: "10px", height: "56px", background: "#97e1dc", borderRadius: "4px", display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "56px", fontWeight: 800, color: "#ffffff", letterSpacing: "2px", lineHeight: 1 }}>
              SATISA
            </span>
            <span style={{ fontSize: "20px", fontWeight: 600, color: "#97e1dc", letterSpacing: "6px" }}>
              FORMATION
            </span>
          </div>
        </div>
        <span style={{ fontSize: "40px", fontWeight: 700, color: "#ffffff", maxWidth: "920px", lineHeight: 1.3 }}>
          {tagline}
        </span>
        <span style={{ fontSize: "26px", color: "#d4f3f0", marginTop: "20px", maxWidth: "880px" }}>
          {subtitle}
        </span>
      </div>
    ),
    { ...OG_SIZE }
  );
}

// Image de partage d'un article : titre à gauche, illustration de couverture (PNG) à droite.
export function renderArticleOgImage(title: string, coverDataUri?: string) {
  const fontSize = title.length > 70 ? 40 : 46;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#002730",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: coverDataUri ? "580px" : "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
            <div style={{ width: "8px", height: "48px", background: "#97e1dc", borderRadius: "4px", display: "flex" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "44px", fontWeight: 800, color: "#ffffff", letterSpacing: "2px", lineHeight: 1 }}>
                SATISA
              </span>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#97e1dc", letterSpacing: "5px" }}>
                FORMATION
              </span>
            </div>
          </div>
          <span style={{ fontSize: `${fontSize}px`, fontWeight: 700, color: "#ffffff", lineHeight: 1.25 }}>
            {title}
          </span>
          <span style={{ fontSize: "24px", color: "#97e1dc", marginTop: "28px" }}>
            Blog certification RNCP/RS
          </span>
        </div>
        {coverDataUri ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverDataUri}
            alt=""
            width={480}
            height={320}
            style={{ width: "480px", height: "320px", borderRadius: "24px", objectFit: "cover" }}
          />
        ) : null}
      </div>
    ),
    { ...OG_SIZE }
  );
}
