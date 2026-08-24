import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Image src="/images/logo/logo-satisa-light.svg" alt="Satisa Formation" width={140} height={39} />
            <p>Ingénierie de certification RNCP/RS et ingénierie pédagogique et digitale pour les organismes de formation.</p>
          </div>
          <div className="site-footer__col">
            <h3>Offres</h3>
            <ul>
              <li><Link href={ROUTES.certification}>Certification RNCP/RS</Link></li>
              <li><Link href={ROUTES.formations}>Formations et digital</Link></li>
            </ul>
          </div>
          <div className="site-footer__col">
            <h3>Ressources</h3>
            <ul>
              <li><Link href={ROUTES.blog}>Blog</Link></li>
              <li><Link href={ROUTES.about}>À propos</Link></li>
              <li><Link href={ROUTES.contact}>Prendre un rendez-vous</Link></li>
            </ul>
          </div>
          <div className="site-footer__col site-footer__contact">
            <h3>Contact</h3>
            <p>chris@satisa.fr</p>
            <a href="https://wa.me/33783456753" className="btn btn--primary" target="_blank" rel="noopener">
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© 2026 Satisa Formation</p>
          <div className="site-footer__legal">
            <Link href={ROUTES.legalMentions}>Mentions légales</Link>
            <Link href={ROUTES.cgv}>CGV</Link>
            <Link href={ROUTES.privacy}>Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
