import type { Metadata } from "next";
import CalBookingButton from "@/components/CalBookingButton";

export const metadata: Metadata = {
  title: "Prendre un rendez-vous",
  description:
    "Écrivez-nous, réservez un créneau ou contactez-nous sur WhatsApp. Un échange sans engagement pour parler de votre projet de certification ou de formation.",
  alternates: {
    canonical: "https://www.satisa-formation.fr/rendez-vous",
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
              {/* TODO: brancher ce formulaire sur l'API route SMTP (étape "formulaire de contact" à venir) */}
              <form action="mailto:chris@satisa.fr" method="post" encType="text/plain">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" name="prenom" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" id="lastname" name="nom" required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-field">
                  <label htmlFor="project-type">Type de projet</label>
                  <select id="project-type" name="type_projet">
                    <option value="certification">Certification RNCP/RS</option>
                    <option value="formations">Formations et digital</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4} required></textarea>
                </div>
                <button type="submit" className="btn btn--dark btn--block">Envoyer le message</button>
              </form>
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
