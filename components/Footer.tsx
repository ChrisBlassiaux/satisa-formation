import Image from "next/image";
import Link from "next/link";
import { ROUTES, LINKEDIN_URL } from "@/lib/routes";
import LinkedInIcon from "@/components/LinkedInIcon";
import { CookieSettingsButton } from "@/components/CookieConsent";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Une colonne par rubrique du site, avec le lien de la rubrique en titre. */}
        <div className="site-footer__grid">
          <div className="site-footer__col">
            <h3>
              <Link href={ROUTES.certification}>Certification RNCP/RS</Link>
            </h3>
            <ul>
              <li><Link href={ROUTES.certificationRncp}>Dépôt RNCP</Link></li>
              <li><Link href={ROUTES.certificationRs}>Dépôt RS</Link></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>
              <Link href={ROUTES.formations}>Formations et digital</Link>
            </h3>
            <ul>
              <li><Link href={ROUTES.formationsConception}>Conception pédagogique</Link></li>
              <li><Link href={ROUTES.formationsDigitalisation}>Digitalisation</Link></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>
              <Link href={ROUTES.tools}>Boîte à outils</Link>
            </h3>
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
        </div>

        {/* Bandeau sous les colonnes : la marque à gauche, les moyens de nous joindre à droite. */}
        <div className="site-footer__panel">
          <div className="site-footer__brand">
            <Image src="/images/logo/logo-satisa-blanc.svg" alt="Satisa Formation" width={330} height={152} />
            <p>Ingénierie de certification RNCP/RS et ingénierie pédagogique et digitale pour les organismes de formation.</p>
          </div>
          <div className="site-footer__actions">
            <Link href={ROUTES.contact} className="btn btn--primary">
              Prendre un rendez-vous
            </Link>
            <a href="https://wa.me/33783456753" className="btn site-footer__ghost" target="_blank" rel="noopener">
              Discuter sur WhatsApp
            </a>
            <a href="mailto:chris@satisa.fr" className="site-footer__mail">
              chris@satisa.fr
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
