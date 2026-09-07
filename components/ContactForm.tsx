"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const REQUEST_OPTIONS: Record<string, { value: string; label: string }[]> = {
  certification: [
    { value: "depot_rncp", label: "Dépôt RNCP" },
    { value: "depot_rs", label: "Dépôt RS" },
    { value: "autre", label: "Autres" },
  ],
  formations: [
    { value: "conception", label: "Conception de formation" },
    { value: "digitalisation", label: "Digitalisation de formation" },
    { value: "autre", label: "Autres" },
  ],
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [projectType, setProjectType] = useState("certification");

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
          <label htmlFor="firstname">Prénom</label>
          <input type="text" id="firstname" name="prenom" required />
        </div>
        <div className="form-field">
          <label htmlFor="lastname">Nom</label>
          <input type="text" id="lastname" name="nom" required />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="structure">Nom de structure</label>
        <input type="text" id="structure" name="structure" />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-field">
        <label htmlFor="project-type">Type de projet</label>
        <select
          id="project-type"
          name="type_projet"
          value={projectType}
          onChange={(event) => setProjectType(event.target.value)}
        >
          <option value="certification">Ingénierie RNCP/RS</option>
          <option value="formations">Ingénierie pédagogique et digitale</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="request">Votre demande</label>
        <select id="request" name="demande">
          {REQUEST_OPTIONS[projectType].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} required></textarea>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
      {status === "error" && <p className="form-error">{errorMessage}</p>}
      <button type="submit" className="btn btn--dark btn--block" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
