import { NextResponse, type NextRequest } from "next/server";

// Old URLs that have a direct equivalent on the current site: permanent
// redirect so search engines swap the old page for the new one.
const REDIRECTS: Record<string, string> = {
  "/politique-de-confidentialite": "/politique-confidentialite",
  "/prise-de-contact": "/rendez-vous",
};

// Pages intentionally removed for good (old blog posts, previous site) —
// respond 410 Gone so search engines drop them from the index instead of
// leaving them as an ambiguous 404.
export function proxy(request: NextRequest) {
  const target = REDIRECTS[request.nextUrl.pathname];
  if (target) {
    return NextResponse.redirect(new URL(target, request.url), 301);
  }
  return new NextResponse(null, { status: 410 });
}

export const config = {
  matcher: [
    "/blog/erreurs-projet-rncp",
    "/blog/digitaliser-formation-par-ou-commencer",
    "/blog/cpf-rncp-rs-difference",
    "/blog/organisme-certificateur-ou-organisme-de-formation-quelle-difference-et-qui-peut-certifier-une-formation-rncp-ou-rs",
    "/blog/formateur-independant-comment-beneficier-de-lexoneration-de-tva",
    "/politique-de-confidentialite",
    "/prise-de-contact",
    "/conditions-generales-de-vente",
    "/rejoindre-notre-reseau",
    "/formateurs/librairie-pedagogique",
    "/formateurs/nos-supports-pedagogiques",
    "/formateurs/recevoir-support-exemple-gratuit",
    "/centres-de-formation-et-ecoles/conception-des-formations",
    "/centres-de-formation-et-ecoles/digitalisation-des-formations",
    "/centres-de-formation-et-ecoles/configurateur-de-votre-offre-sur-mesure",
    "/ressources/sinscrire-a-la-newsletter",
    "/ressources/template-notion-organisation-des-formateurs",
    "/ressources/faq",
    "/ressources/blog",
    "/supports/decouverte-de-sass-simplifiez-et-dynamisez-vos-feuilles-de-style",
  ],
};
