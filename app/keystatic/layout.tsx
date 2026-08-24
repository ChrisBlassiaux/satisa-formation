import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Keystatic",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return (
    <html lang="fr">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
