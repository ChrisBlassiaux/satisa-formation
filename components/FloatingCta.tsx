"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";

const HIDDEN_ON = [ROUTES.legalMentions, ROUTES.cgv, ROUTES.privacy];

export default function FloatingCta() {
  const pathname = usePathname();
  const isContactPage = pathname === ROUTES.contact;

  if (pathname && HIDDEN_ON.includes(pathname as (typeof HIDDEN_ON)[number])) {
    return null;
  }

  if (isContactPage) {
    return (
      <a href="#main" className="btn btn--dark floating-cta floating-cta--back-to-top">
        Retour en haut
      </a>
    );
  }

  return (
    <Link href={ROUTES.contact} className="btn btn--dark floating-cta">
      Prendre contact
    </Link>
  );
}
