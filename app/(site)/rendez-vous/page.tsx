import type { Metadata } from "next";
import CalBookingButton from "@/components/CalBookingButton";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrivez-nous, réservez un créneau ou contactez-nous sur WhatsApp. Un échange sans engagement pour parler de votre projet de certification ou de formation.",
  alternates: {
    canonical: "https://www.satisa-formation.fr/rendez-vous",
  },
  openGraph: {
    title: "Contact - Satisa Formation",
    description:
      "Écrivez-nous, réservez un créneau ou contactez-nous sur WhatsApp. Un échange sans engagement pour parler de votre projet de certification ou de formation.",
    url: "https://www.satisa-formation.fr/rendez-vous",
    siteName: "Satisa Formation",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Satisa Formation",
    description:
      "Écrivez-nous, réservez un créneau ou contactez-nous sur WhatsApp. Un échange sans engagement pour parler de votre projet de certification ou de formation.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section>
        <div className="container section-head section-head--center">
          <p className="eyebrow">Contact</p>
          <h1>Parlons de votre projet</h1>
          <p className="hero-page__subtitle" style={{ marginInline: "auto" }}>
            Pas d&apos;engagement, juste un échange pour comprendre votre besoin et voir si Satisa est la bonne
            réponse. Choisissez le canal qui vous convient.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid--2" style={{ alignItems: "stretch" }}>
            <div className="contact-channel">
              <h3>Nous écrire</h3>
              <p>Décrivez votre projet, nous revenons vers vous sous 48h.</p>
              <ContactForm />
            </div>

            <div className="contact-stack">
              <div className="contact-channel">
                <h3>Prendre rendez-vous</h3>
                <p>Réservez directement un créneau de 30 minutes dans l&apos;agenda.</p>
                <CalBookingButton />
              </div>

              <div className="contact-channel contact-channel--whatsapp">
                <h3>Réponse rapide</h3>
                <p>Une question simple ? Écrivez directement sur WhatsApp, réponse rapide garantie.</p>
                <a href="https://wa.me/33783456753" className="btn btn--primary btn--block" target="_blank" rel="noopener">
                  Discuter sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
