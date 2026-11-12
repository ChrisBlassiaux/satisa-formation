"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  FORMATS,
  PLATEFORMES,
  SOCLE,
  SPECIFIQUE,
  calculer,
  determinerFormule,
  erreurEtape,
  euros,
  type Answers,
  type YesNo,
} from "@/lib/simulateur";

type Step = 1 | 2 | 3 | 4;
type SendStatus = "idle" | "sending" | "sent" | "error";

type Draft = {
  format: string;
  heures: string;
  pret: "" | YesNo;
  referent: "" | YesNo;
  sequencee: "" | YesNo;
  duree: string;
  plateforme: "" | YesNo;
  plateformeNom: string;
  configuree: "" | YesNo;
};

const EMPTY: Draft = {
  format: "",
  heures: "",
  pret: "",
  referent: "",
  sequencee: "",
  duree: "",
  plateforme: "",
  plateformeNom: "",
  configuree: "",
};

// Ne garde que les réponses encore pertinentes (une question masquée ne doit pas peser dans le calcul).
function toAnswers(d: Draft): Answers {
  return {
    format: d.format || undefined,
    heures: d.heures ? Number(d.heures) : undefined,
    pret: d.pret || undefined,
    referent: d.pret === "non" ? d.referent || undefined : undefined,
    sequencee: d.sequencee || undefined,
    duree: d.sequencee === "non" && d.duree ? Number(d.duree) : undefined,
    plateforme: d.plateforme || undefined,
    plateformeNom: d.plateforme === "oui" ? d.plateformeNom || undefined : undefined,
    configuree: d.plateforme === "oui" ? d.configuree || undefined : undefined,
  };
}

function YesNoChoice({
  name,
  value,
  onChange,
}: {
  name: string;
  value: "" | YesNo;
  onChange: (value: YesNo) => void;
}) {
  return (
    <div className="sim-choices">
      {(["oui", "non"] as const).map((option) => (
        <label key={option} className="sim-choice">
          <input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} />
          <span>{option === "oui" ? "Oui" : "Non"}</span>
        </label>
      ))}
    </div>
  );
}

function Question({ label, help, children }: { label: ReactNode; help?: ReactNode; children: ReactNode }) {
  return (
    <fieldset className="sim-question">
      <legend>{label}</legend>
      {help && <div className="sim-help">{help}</div>}
      {children}
    </fieldset>
  );
}

export default function DigitalisationSimulator() {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState("");

  const [contact, setContact] = useState({ prenom: "", nom: "", structure: "", email: "", tel: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [sendError, setSendError] = useState("");

  const answers = toAnswers(draft);
  const isComplete = determinerFormule(answers) === "complete";
  const result = step === 4 ? calculer(answers) : null;

  function update(patch: Partial<Draft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setError("");
  }

  function next() {
    if (step === 4) return;
    const message = erreurEtape(step, answers);
    setError(message);
    if (message) return;
    setStep(step === 2 && isComplete ? 4 : ((step + 1) as Step));
  }

  function back() {
    setError("");
    setStep(step === 4 && isComplete ? 2 : ((step - 1) as Step));
  }

  function restart() {
    setDraft(EMPTY);
    setError("");
    setSendStatus("idle");
    setSendError("");
    setConsent(false);
    setStep(1);
  }

  async function send() {
    const prenom = contact.prenom.trim();
    const nom = contact.nom.trim();
    const structure = contact.structure.trim();
    if (!prenom || !nom || !structure) return setSendError("Indiquez vos prénom, nom et structure.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email.trim())) return setSendError("Indiquez une adresse email valide.");
    if (!consent) return setSendError("Merci de cocher la case de consentement.");

    setSendStatus("sending");
    setSendError("");
    try {
      const response = await fetch("/api/simulateur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, contact, website: contact.website }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "L'envoi a échoué.");
      setSendStatus("sent");
    } catch (e) {
      setSendStatus("error");
      setSendError(e instanceof Error ? e.message : "L'envoi a échoué.");
    }
  }

  const nextLabel = step === 3 || (step === 2 && isComplete) ? "Voir mon estimation" : "Suivant";

  return (
    <div className="sim" id="simulateur">
      <div className="sim__head">
        <h3>Estimez le prix de votre projet de digitalisation</h3>
        <p>Quelques questions, et vous obtenez la formule adaptée à votre projet avec une estimation.</p>
      </div>

      <div className="sim__body">
        <div className="sim__steps" aria-hidden="true">
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={n <= step ? "is-on" : undefined} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <h4 className="sim__step-title">Votre projet</h4>
            <p className="sim__sub">Une estimation rapide pour vous faire une idée.</p>
            <Question label="Format de la formation">
              <div className="sim-choices">
                {FORMATS.map((format) => (
                  <label key={format} className="sim-choice">
                    <input
                      type="radio"
                      name="format"
                      value={format}
                      checked={draft.format === format}
                      onChange={() => update({ format })}
                    />
                    <span>{format === "Blended" ? "Blended (en ligne + présentiel)" : format}</span>
                  </label>
                ))}
              </div>
            </Question>
            <div className="form-field sim-field">
              <label htmlFor="sim-heures">Combien d&apos;heures d&apos;e-learning souhaitez-vous ?</label>
              <input
                id="sim-heures"
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                placeholder="Ex. : 30"
                value={draft.heures}
                onChange={(e) => update({ heures: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="sim__step-title">Vos contenus</h4>
            <p className="sim__sub">C&apos;est ce qui détermine la formule.</p>
            <Question
              label="Vos contenus sont-ils prêts à être mis en ligne tels quels, pour la quasi-totalité de la formation ?"
              help={
                <>
                  <strong>Prêt :</strong> utilisable sans réécriture par un apprenant seul, comme des vidéos finies, un cours
                  rédigé pour l&apos;apprenant ou un module e-learning existant.
                  <br />
                  <strong>Pas prêt :</strong> diaporamas de formateur, notes, guides d&apos;animation, exercices sans corrigé.
                </>
              }
            >
              <YesNoChoice name="pret" value={draft.pret} onChange={(pret) => update({ pret })} />
            </Question>
            {draft.pret === "non" && (
              <Question
                label="Une personne de votre équipe qui maîtrise le sujet peut-elle répondre à nos questions sur le contenu ?"
                help="Un formateur, un professionnel du métier ou un responsable pédagogique, avec un peu de temps à y consacrer. Il répond à nos questions, nous rédigeons."
              >
                <YesNoChoice name="referent" value={draft.referent} onChange={(referent) => update({ referent })} />
              </Question>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="sim__step-title">Votre organisation</h4>
            <p className="sim__sub">Pour savoir ce dont votre projet a besoin en plus.</p>
            <Question label="Votre formation est-elle déjà découpée en séquences (durées, activités) ?">
              <YesNoChoice name="sequencee" value={draft.sequencee} onChange={(sequencee) => update({ sequencee })} />
            </Question>
            {draft.sequencee === "non" && (
              <div className="form-field sim-field">
                <label htmlFor="sim-duree">Quelle est la durée totale de la formation (en heures) ?</label>
                <input
                  id="sim-duree"
                  type="number"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  placeholder="Ex. : 120"
                  value={draft.duree}
                  onChange={(e) => update({ duree: e.target.value })}
                />
              </div>
            )}
            <Question label="Avez-vous déjà une plateforme e-learning ?">
              <YesNoChoice name="plateforme" value={draft.plateforme} onChange={(plateforme) => update({ plateforme })} />
            </Question>
            {draft.plateforme === "oui" && (
              <>
                <div className="form-field sim-field">
                  <label htmlFor="sim-plateforme">Laquelle ?</label>
                  <select
                    id="sim-plateforme"
                    value={draft.plateformeNom}
                    onChange={(e) => update({ plateformeNom: e.target.value })}
                  >
                    <option value="">Choisir</option>
                    {PLATEFORMES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <Question label="Est-elle déjà configurée pour vos formations ?">
                  <YesNoChoice name="configuree" value={draft.configuree} onChange={(configuree) => update({ configuree })} />
                </Question>
              </>
            )}
          </div>
        )}

        {step === 4 && result && (
          <div aria-live="polite">
            <div className="sim-result">
              <p className="sim-result__label">Formule recommandée</p>
              <p className="sim-result__formule">{result.formule}</p>
              <p className="sim-result__label">Estimation</p>
              <p className="sim-result__prix">{euros(result.total)}</p>
              <p>{SPECIFIQUE[result.cle].pourquoi}</p>
            </div>

            <h4 className="sim__h4">Le détail</h4>
            <table className="sim-detail">
              <tbody>
                {result.lignes.map((ligne) => (
                  <tr key={ligne.libelle}>
                    <td>{ligne.libelle}</td>
                    <td>{euros(ligne.montant)}</td>
                  </tr>
                ))}
                <tr className="sim-detail__total">
                  <td>Total estimé</td>
                  <td>{euros(result.total)}</td>
                </tr>
              </tbody>
            </table>
            <p className="sim__note">
              Estimation indicative, confirmée après un échange et le séquençage de votre formation. Tarif dégressif
              au-delà de 20 h appliqué.
            </p>

            <h4 className="sim__h4">Ce qui est inclus</h4>
            <ul className="pricing-card__deliverables">
              {[...SOCLE, ...SPECIFIQUE[result.cle].inclus, ...result.supplementsInclus.map((s) => `${s} (inclus pour tous vos blocs)`)].map(
                (item) => (
                  <li key={item}>{item}</li>
                ),
              )}
            </ul>

            <div className="sim-contact">
              {sendStatus === "sent" ? (
                <p className="form-success">Résultat envoyé, merci ! Nous revenons vers vous sous 48h.</p>
              ) : (
                <>
                  <h4 className="sim__h4 sim-contact__title">Joindre votre résultat à votre demande</h4>
                  <p>
                    Vous souhaitez être recontacté ? Envoyez-nous votre résultat : nous pourrons vous répondre plus
                    précisément, sans vous reposer les mêmes questions.
                  </p>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="sim-prenom">Prénom</label>
                      <input id="sim-prenom" type="text" autoComplete="given-name" value={contact.prenom} onChange={(e) => setContact({ ...contact, prenom: e.target.value })} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="sim-nom">Nom</label>
                      <input id="sim-nom" type="text" autoComplete="family-name" value={contact.nom} onChange={(e) => setContact({ ...contact, nom: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="sim-structure">Structure</label>
                      <input id="sim-structure" type="text" autoComplete="organization" value={contact.structure} onChange={(e) => setContact({ ...contact, structure: e.target.value })} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="sim-email">Email</label>
                      <input id="sim-email" type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="sim-tel">Téléphone (facultatif)</label>
                    <input id="sim-tel" type="tel" autoComplete="tel" value={contact.tel} onChange={(e) => setContact({ ...contact, tel: e.target.value })} />
                  </div>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="form-honeypot"
                    value={contact.website}
                    onChange={(e) => setContact({ ...contact, website: e.target.value })}
                  />
                  <label className="sim-consent">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    <span>
                      J&apos;accepte que Satisa Formation utilise ces informations pour me recontacter au sujet de ma
                      demande. <Link href={ROUTES.privacy}>Politique de confidentialité</Link>
                    </span>
                  </label>
                  {sendError && <p className="form-error">{sendError}</p>}
                  <button type="button" className="btn btn--dark" onClick={send} disabled={sendStatus === "sending"}>
                    {sendStatus === "sending" ? "Envoi en cours..." : "Envoyer mon résultat"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {error && <p className="form-error sim__error">{error}</p>}

        <div className="sim__nav">
          {step > 1 ? (
            <button type="button" className="btn btn--outline" onClick={back}>
              Retour
            </button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <button type="button" className="btn btn--dark" onClick={next}>
              {nextLabel}
            </button>
          ) : (
            <button type="button" className="btn btn--outline" onClick={restart}>
              Refaire une simulation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
