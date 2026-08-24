import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.satisa-formation.fr"),
  title: {
    default: "Satisa Formation - Certification RNCP/RS et ingénierie pédagogique digitale",
    template: "%s - Satisa Formation",
  },
  description:
    "Satisa Formation accompagne les organismes de formation et certificateurs sur la certification RNCP/RS et l'ingénierie pédagogique et digitale, du référentiel jusqu'au déploiement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
