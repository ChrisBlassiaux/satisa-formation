import Image from "next/image";
import Link from "next/link";
import { ROUTES, LINKEDIN_URL } from "@/lib/routes";
import LinkedInIcon from "@/components/LinkedInIcon";
import { CookieSettingsButton } from "@/components/CookieConsent";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Image src="/images/logo/logo-satisa-blanc.svg" alt="Satisa Formation" width={330} height={152} />
            <p>Ingénierie de certification RNCP/RS et ingénierie pédagogique et digitale pour les organismes de formation.</p>
          </div>

          <div className="site-footer__col">
            <h3>Offres</h3>
            <ul>
              <li className="site-footer__group">
                <Link href={ROUTES.certification} className="site-footer__parent">Certification RNCP/RS</Link>
                <ul className="site-footer__sub">
                  <li><Link href={ROUTES.certificationRncp}>Dépôt RNCP</Link></li>
                  <li><Link href={ROUTES.certificationRs}>Dépôt RS</Link></li>
                </ul>
              </li>
              <li className="site-footer__group">
                <Link href={ROUTES.formations} className="site-footer__parent">Formations et digital</Link>
                <ul className="site-footer__sub">
                  <li><Link href={ROUTES.formationsConception}>Conception pédagogique</Link></li>
                  <li><Link href={ROUTES.formationsDigitalisation}>Digitalisation</Link></li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>Boîte à outils</h3>
            <ul>
              <li><Link href={ROUTES.formationsSimulateur}>Simulateur de prix e-learning</Link></li>
              <li><Link href={ROUTES.certificationRsOuRncp}>Test RS ou RNCP</Link></li>
              <li><Link href={ROUTES.tools} className="site-footer__more">Voir tous nos outils</Link></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>Satisa</h3>
            <ul>
              <li><Link href={ROUTES.about}>À propos</Link></li>
              <li><Link href={ROUTES.blog}>Blog</Link></li>
            </ul>
          </div>

          <div className="site-footer__col site-footer__contact">
            <h3>Contact</h3>
            <ul>
              <li><Link href={ROUTES.contact}>Prendre un rendez-vous</Link></li>
              <li><a href="mailto:chris@satisa.fr">chris@satisa.fr</a></li>
            </ul>
            <a href="https://wa.me/33783456753" className="btn btn--primary" target="_blank" rel="noopener">
              Discuter sur WhatsApp
            </a>
            <a
              href={LINKEDIN_URL}
              className="social-link social-link--footer"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Chris Blassiaux sur LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© 2026 Satisa Formation</p>
          <div className="site-footer__legal">
            <Link href={ROUTES.legalMentions}>Mentions légales</Link>
            <Link href={ROUTES.cgv}>CGV</Link>
            <Link href={ROUTES.privacy}>Politique de confidentialité</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
