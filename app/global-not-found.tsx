import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "@/styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { ROUTES } from "@/lib/routes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page introuvable - Satisa Formation",
  description: "La page que vous cherchez n'existe pas ou plus.",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={inter.variable}>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <Header />
        <main id="main">
          <section className="notfound-hero">
            <div className="notfound-bg" aria-hidden="true">
              <span
                className="notfound-bg__item"
                style={{ top: "8%", left: "6%", fontSize: "2rem", animationDuration: "7s", "--notfound-rotate": "-10deg" } as CSSProperties}
              >
                404
              </span>
              <span
                className="notfound-bg__item"
                style={{ top: "14%", left: "85%", fontSize: "3.5rem", animationDuration: "9s", animationDelay: "1s", "--notfound-rotate": "8deg" } as CSSProperties}
              >
                404
              </span>
              <span
                className="notfound-bg__item"
                style={{ top: "42%", left: "3%", fontSize: "4.5rem", animationDuration: "8s", animationDelay: "2s", "--notfound-rotate": "-6deg" } as CSSProperties}
              >
                404
              </span>
              <span
                className="notfound-bg__item"
                style={{ top: "58%", left: "90%", fontSize: "2.5rem", animationDuration: "10s", animationDelay: "0.5s", "--notfound-rotate": "12deg" } as CSSProperties}
              >
                404
              </span>
              <span
                className="notfound-bg__item"
                style={{ top: "78%", left: "12%", fontSize: "3rem", animationDuration: "7.5s", animationDelay: "1.5s", "--notfound-rotate": "5deg" } as CSSProperties}
              >
                404
              </span>
              <span
                className="notfound-bg__item"
                style={{ top: "82%", left: "78%", fontSize: "2rem", animationDuration: "9.5s", animationDelay: "2.5s", "--notfound-rotate": "-8deg" } as CSSProperties}
              >
                404
              </span>
              <span
                className="notfound-bg__item"
                style={{ top: "4%", left: "45%", fontSize: "1.75rem", animationDuration: "8.5s", animationDelay: "0.8s", "--notfound-rotate": "3deg" } as CSSProperties}
              >
                404
              </span>
            </div>
            <div className="container section-head section-head--center">
              <p className="eyebrow">Erreur 404</p>
              <h1>Cette page n&apos;existe pas (ou plus).</h1>
              <p className="hero-page__subtitle" style={{ marginInline: "auto", marginTop: "1rem" }}>
                Le lien que vous avez suivi est peut-être obsolète, ou l&apos;adresse comporte une erreur.
                Retournez à l&apos;accueil ou explorez nos offres.
              </p>
              <div
                className="hero__actions"
                style={{ flexDirection: "column", alignItems: "center", marginTop: "1.5rem" }}
              >
                <div className="hero__actions" style={{ justifyContent: "center" }}>
                  <Link href={ROUTES.certification} className="btn btn--outline">
                    Déposer une certification
                  </Link>
                  <Link href={ROUTES.formations} className="btn btn--outline">
                    Concevoir mes formations
                  </Link>
                </div>
                <Link href={ROUTES.home} className="btn btn--dark" style={{ marginTop: "1.5rem" }}>
                  Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
