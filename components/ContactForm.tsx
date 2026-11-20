"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { FORMULA_OPTIONS, IDEA_BOX_TYPE, PROJECT_TYPES, hasFormulas } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

// Astérisque des champs obligatoires (masqué pour les lecteurs d'écran : l'attribut « required » suffit).
function Required() {
  return <span className="form-required" aria-hidden="true">*</span>;
}

// Type de projet demandé par l'adresse (ex. /rendez-vous?projet=idees depuis la boîte à outils).
// Lu sans effet : côté serveur la valeur est vide, le navigateur la lit à l'affichage.
function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function typeFromUrl(): string {
  const requested = new URLSearchParams(window.location.search).get("projet") ?? "";
  return PROJECT_TYPES.some((type) => type.value === requested) ? requested : "";
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const urlProjectType = useSyncExternalStore(subscribeToLocation, typeFromUrl, () => "");
  const [chosenProjectType, setChosenProjectType] = useState<string | null>(null);
  const projectType = chosenProjectType ?? urlProjectType;
  const isIdeaBox = projectType === IDEA_BOX_TYPE;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("prenom"),
          lastName: data.get("nom"),
          structureName: data.get("structure"),
          email: data.get("email"),
          projectType: data.get("type_projet"),
          request: data.get("demande"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "L'envoi a échoué.");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "L'envoi a échoué.");
    }
  }

  if (status === "sent") {
    return <p className="form-success">Message envoyé, merci ! Nous revenons vers vous sous 48h.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="firstname">Prénom <Required /></label>
          <input type="text" id="firstname" name="prenom" required />
        </div>
        <div className="form-field">
          <label htmlFor="lastname">Nom <Required /></label>
          <input type="text" id="lastname" name="nom" required />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="structure">Nom de structure <Required /></label>
        <input type="text" id="structure" name="structure" required />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email <Required /></label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-field">
        <label htmlFor="project-type">Type de projet <Required /></label>
        <select
          id="project-type"
          name="type_projet"
          required
          value={projectType}
          onChange={(event) => setChosenProjectType(event.target.value)}
        >
          <option value="">Choisir un type de projet</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      {hasFormulas(projectType) || !projectType ? (
        <div className="form-field">
          <label htmlFor="request">La formule souhaitée</label>
          <select id="request" name="demande" key={projectType} defaultValue="" disabled={!projectType}>
            <option value="">{projectType ? "Choisir une formule" : "Choisissez d'abord un type de projet"}</option>
            {(FORMULA_OPTIONS[projectType] ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={isIdeaBox ? "Quel outil ou quelle idée vous aiderait dans votre projet de formation ?" : undefined}
        ></textarea>
      </div>
      <p className="form-note">* Champs obligatoires</p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
      {status === "error" && <p className="form-error">{errorMessage}</p>}
      <button type="submit" className="btn btn--dark btn--block" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
