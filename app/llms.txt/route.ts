import { ROUTES } from "@/lib/routes";
import { getAllPosts } from "@/lib/posts";
import { metadata as certificationMetadata } from "@/app/(site)/deposer-une-certification-rncp-rs/page";
import { metadata as rncpMetadata } from "@/app/(site)/deposer-une-certification-rncp-rs/depot-rncp/page";
import { metadata as rsMetadata } from "@/app/(site)/deposer-une-certification-rncp-rs/depot-rs/page";
import { metadata as formationsMetadata } from "@/app/(site)/concevoir-digitaliser-vos-formations/page";
import { metadata as conceptionMetadata } from "@/app/(site)/concevoir-digitaliser-vos-formations/conception-pedagogique/page";
import { metadata as digitalisationMetadata } from "@/app/(site)/concevoir-digitaliser-vos-formations/digitalisation-formation/page";
import { metadata as simulateurMetadata } from "@/app/(site)/concevoir-digitaliser-vos-formations/simulateur-prix-digitalisation/page";
import { metadata as aboutMetadata } from "@/app/(site)/a-propos/page";
import { metadata as contactMetadata } from "@/app/(site)/rendez-vous/page";

export const dynamic = "force-static";

const SITE_URL = "https://www.satisa-formation.fr";

function link(title: string, path: string, description?: string | null) {
  return `- [${title}](${SITE_URL}${path})${description ? `: ${description}` : ""}`;
}

export async function GET() {
  const posts = await getAllPosts();

  const body = [
    "# Satisa Formation",
    "",
    "> Ingénierie de certification RNCP/RS et ingénierie pédagogique et digitale pour les organismes de formation.",
    "",
    "Satisa Formation est fondée en 2024 par Chris Blassiaux, ingénieur pédagogique et ingénieur de certification en freelance. Elle accompagne les organismes de formation sur la digitalisation de formation (création e-learning sur mesure, blended learning, scénarisation pédagogique, intégration LMS), la conception pédagogique et le dépôt de certifications RNCP/RS. Les tarifs de digitalisation sont publics : à partir de 2 000 € HT pour 20 heures d'e-learning, et un simulateur de prix gratuit donne une estimation en 1 minute. Contact : chris@satisa.fr.",
    "",
    "## Offres",
    "",
    link("Déposer une certification RNCP/RS", ROUTES.certification, certificationMetadata.description),
    link("Accompagnement au dépôt RNCP", ROUTES.certificationRncp, rncpMetadata.description),
    link("Accompagnement au dépôt RS", ROUTES.certificationRs, rsMetadata.description),
    link("Concevoir et digitaliser vos formations", ROUTES.formations, formationsMetadata.description),
    link("Conception pédagogique", ROUTES.formationsConception, conceptionMetadata.description),
    link("Digitalisation de formation (e-learning, blended learning, intégration LMS)", ROUTES.formationsDigitalisation, digitalisationMetadata.description),
    link("Simulateur de prix de formation e-learning", ROUTES.formationsSimulateur, simulateurMetadata.description),
    "",
    "## Blog",
    "",
    ...posts.map((post) => link(post.title, `${ROUTES.blog}/${post.slug}`, post.excerpt)),
    "",
    "## À propos et contact",
    "",
    link("À propos", ROUTES.about, aboutMetadata.description),
    link("Prendre rendez-vous", ROUTES.contact, contactMetadata.description),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
