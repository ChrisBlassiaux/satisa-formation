"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CV_MAX_BYTES, CV_MAX_LABEL, MESSAGE_MAX_LENGTH } from "@/lib/application";
import { ROUTES } from "@/lib/routes";

type Status = "idle" | "sending" | "sent" | "error";

// Astérisque des champs obligatoires (masqué pour les lecteurs d'écran : l'attribut « required » suffit).
function Required() {
  return <span className="form-required" aria-hidden="true">*</span>;
}

export default function ApplicationForm({ offerId, durations, email }: { offerId: string; durations: string[]; email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const shownAt = useRef(0);
  const id = (name: string) => `${offerId}-${name}`;

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const cv = data.get("cv");

    if (cv instanceof File && cv.size > CV_MAX_BYTES) {
      setStatus("error");
      setErrorMessage(`Votre CV dépasse ${CV_MAX_LABEL}.`);
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    data.set("offerId", offerId);
    data.set("elapsedMs", String(Date.now() - shownAt.current));
    const fallback = `L'envoi a échoué. Réessayez ou écrivez à ${email}.`;

    try {
      const response = await fetch("/api/candidature", { method: "POST", body: data });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || fallback);
      }
      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      // Une coupure réseau remonte en TypeError avec un message technique en anglais : on affiche le nôtre.
      setErrorMessage(error instanceof Error && !(error instanceof TypeError) ? error.message : fallback);
    }
  }

  if (status === "sent") {
    return (
      <p className="form-success" role="status">
        Candidature envoyée, merci ! Nous revenons vers vous par e-mail.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor={id("firstname")}>Prénom <Required /></label>
          <input type="text" id={id("firstname")} name="firstName" autoComplete="given-name" required />
        </div>
        <div className="form-field">
          <label htmlFor={id("lastname")}>Nom <Required /></label>
          <input type="text" id={id("lastname")} name="lastName" autoComplete="family-name" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor={id("email")}>E-mail <Required /></label>
          <input type="email" id={id("email")} name="email" autoComplete="email" required />
        </div>
        <div className="form-field">
          <label htmlFor={id("phone")}>Téléphone <Required /></label>
          <input type="tel" id={id("phone")} name="phone" autoComplete="tel" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor={id("start")}>Date de début souhaitée <Required /></label>
          <input type="date" id={id("start")} name="startDate" required />
        </div>
        <div className="form-field">
          <label htmlFor={id("duration")}>Durée souhaitée <Required /></label>
          <select id={id("duration")} name="duration" defaultValue="" required>
            <option value="">Choisir une durée</option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor={id("link")}>Lien LinkedIn ou portfolio</label>
        <input type="text" id={id("link")} name="link" inputMode="url" />
      </div>
      <div className="form-field">
        <label htmlFor={id("cv")}>CV (PDF, {CV_MAX_LABEL} maximum) <Required /></label>
        <input type="file" id={id("cv")} name="cv" accept="application/pdf,.pdf" required />
      </div>
      <div className="form-field">
        <label htmlFor={id("message")}>Message court <Required /></label>
        <textarea id={id("message")} name="message" rows={3} maxLength={MESSAGE_MAX_LENGTH} required></textarea>
      </div>
      <p className="form-note">* Champs obligatoires</p>
      <p className="form-note">
        Les informations et le CV envoyés servent uniquement à étudier votre candidature.{" "}
        <Link href={ROUTES.privacy}>Politique de confidentialité</Link>
      </p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
      {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
      <button type="submit" className="btn btn--dark" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours..." : "Envoyer ma candidature"}
      </button>
    </form>
  );
}
