"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";

const HIDDEN_ON = [ROUTES.legalMentions, ROUTES.cgv, ROUTES.privacy];

// The button hides while an in-page call to action or the footer is on screen, so it never covers them.
const COVERED_SELECTOR = ".cta-banner, .site-footer";

export default function FloatingCta() {
  const pathname = usePathname();
  const isContactPage = pathname === ROUTES.contact;
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(COVERED_SELECTOR));
    if (targets.length === 0 || !("IntersectionObserver" in window)) {
      setCovered(false);
      return;
    }

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCovered(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [pathname]);

  if (pathname && HIDDEN_ON.includes(pathname as (typeof HIDDEN_ON)[number])) {
    return null;
  }

  const hiddenClass = covered ? " floating-cta--hidden" : "";

  if (isContactPage) {
    return (
      <a
        href="#main"
        className={`btn btn--dark floating-cta floating-cta--back-to-top${hiddenClass}`}
        tabIndex={covered ? -1 : undefined}
        aria-hidden={covered || undefined}
      >
        Retour en haut
      </a>
    );
  }

  return (
    <Link
      href={ROUTES.contact}
      className={`btn btn--dark floating-cta${hiddenClass}`}
      tabIndex={covered ? -1 : undefined}
      aria-hidden={covered || undefined}
    >
      Prendre contact
    </Link>
  );
}
