"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_LINKS, ROUTES } from "@/lib/routes";

export default function Header() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href={ROUTES.home} className="site-header__logo" aria-label="Satisa Formation, accueil">
          <Image src="/images/logo/logo-satisa-noir.svg" alt="Satisa Formation" width={330} height={152} priority />
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          <ul className="nav__list">
            {MAIN_NAV_LINKS.map((link) => (
              <li key={link.href} className={"children" in link ? "nav__item--has-submenu" : undefined}>
                <Link
                  className="nav__link"
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
                {"children" in link && (
                  <ul className="nav__submenu">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          className="nav__submenu-link"
                          href={child.href}
                          aria-current={isActive(child.href) ? "page" : undefined}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <Link href={ROUTES.contact} className="btn btn--dark site-header__cta">
          Prendre contact
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isMobileNavOpen}
          aria-controls="mobileNav"
          aria-label={isMobileNavOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsMobileNavOpen((open) => !open)}
        >
          <span className="nav-toggle__bar"></span>
        </button>
      </div>
      <nav
        id="mobileNav"
        className={`mobile-nav${isMobileNavOpen ? " is-open" : ""}`}
        aria-label="Navigation mobile"
      >
        {MAIN_NAV_LINKS.map((link) => (
          <div key={link.href}>
            <Link className="mobile-nav__link" href={link.href}>
              {link.label}
            </Link>
            {"children" in link &&
              link.children.map((child) => (
                <Link key={child.href} className="mobile-nav__link mobile-nav__link--child" href={child.href}>
                  {child.label}
                </Link>
              ))}
          </div>
        ))}
        <Link className="mobile-nav__link" href={ROUTES.blog}>
          Blog
        </Link>
        <Link href={ROUTES.contact} className="btn btn--dark btn--block mobile-nav__cta">
          Prendre contact
        </Link>
      </nav>
    </header>
  );
}
