"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent, type RefObject } from "react";
import Link from "next/link";
import CalBookingButton from "@/components/CalBookingButton";
import { ROUTES } from "@/lib/routes";
import { CONFIG, decoder, encoder, evaluer, type Answers, type QuestionId, type Resultat } from "@/lib/rsRncp";
import { lienFormule } from "@/lib/rsRncp/liens";

// Outil gratuit « RS ou RNCP ? » : 10 questions, un verdict calculé immédiatement par des règles (lib/rsRncp),
// aucune donnée personnelle demandée avant le résultat. Le formulaire facultatif n'apparaît qu'APRÈS le résultat.

type Vue = "intro" | "question" | "resultat";
type StatutEnvoi = "inactif" | "envoi" | "envoye" | "erreur";

const PARAM_RESULTAT = "#r=";

// ---------- Statistiques anonymes (aucun cookie, aucune donnée personnelle) ----------
function envoyerEvenement(evenement: Record<string, string>) {
  try {
    const corps = JSON.stringify(evenement);
    const url = "/api/rs-ou-rncp/evenement";
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      if (navigator.sendBeacon(url, new Blob([corps], { type: "text/plain" }))) return;
    }
    void fetch(url, { method: "POST", body: corps, keepalive: true }).catch(() => undefined);
  } catch {
    // Une statistique perdue ne doit jamais gêner le visiteur.
  }
}

// Identifiant aléatoire d'un parcours de test : en mémoire seulement, jamais stocké, jamais relié à une personne.
function nouvelIdentifiant(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

// ---------- Lien de partage : les réponses sont dans le « # » de l'adresse, jamais envoyées au serveur ----------
function abonnerHash(rappel: () => void) {
  window.addEventListener("hashchange", rappel);
  return () => window.removeEventListener("hashchange", rappel);
}

function changerHash(hash: string) {
  const adresse = `${window.location.pathname}${window.location.search}${hash}`;
  window.history.replaceState(null, "", adresse);
  // replaceState ne déclenche pas « hashchange » : on le signale à la main.
  window.dispatchEvent(new Event("hashchange"));
}

function lienDuResultat(reponses: Answers): string {
  const code = encoder(reponses);
  return `${window.location.origin}${window.location.pathname}${code ? `${PARAM_RESULTAT}${code}` : ""}`;
}

function pageDeLaFormule(resultat: Resultat): string {
  return lienFormule(resultat, { rncp: ROUTES.certificationRncp, rs: ROUTES.certificationRs });
}

export default function RsOuRncpTool() {
  const [vue, setVue] = useState<Vue>("intro");
  const [index, setIndex] = useState(0);
  const [reponses, setReponses] = useState<Answers>({});
  const [erreur, setErreur] = useState("");
  const [parcours, setParcours] = useState("");
  const titreRef = useRef<HTMLHeadingElement>(null);
  const ecranPrecedent = useRef<string | null>(null);

  const hash = useSyncExternalStore(
    abonnerHash,
    () => window.location.hash,
    () => "",
  );
  const reponsesDuLien = useMemo(() => (hash.startsWith(PARAM_RESULTAT) ? decoder(hash.slice(PARAM_RESULTAT.length)) : null), [hash]);

  // Un lien de résultat partagé s'ouvre directement sur le résultat (sans compter un nouveau test dans les statistiques).
  const vueAffichee: Vue = vue === "intro" && reponsesDuLien ? "resultat" : vue;
  const reponsesAffichees = vue === "intro" && reponsesDuLien ? reponsesDuLien : reponses;
  const resultat = useMemo(() => (vueAffichee === "resultat" ? evaluer(reponsesAffichees) : null), [vueAffichee, reponsesAffichees]);

  const questions = CONFIG.questions;
  const question = questions[index];
  const total = questions.length;

  // Au changement d'écran, le focus se place sur le titre : les lecteurs d'écran annoncent la nouvelle question.
  // On compare avec l'écran précédent (et non un simple « premier affichage ») : en développement, React exécute
  // chaque effet deux fois au chargement, ce qui donnait le focus au titre de l'accueil.
  useEffect(() => {
    const ecran = `${vueAffichee}-${index}`;
    if (ecranPrecedent.current === null) {
      ecranPrecedent.current = ecran;
      return;
    }
    if (ecranPrecedent.current === ecran) return;
    ecranPrecedent.current = ecran;
    titreRef.current?.focus();
  }, [vueAffichee, index]);

  function commencer() {
    const identifiant = nouvelIdentifiant();
    setParcours(identifiant);
    setReponses({});
    setIndex(0);
    setErreur("");
    setVue("question");
    envoyerEvenement({ evt: "demarrage", run: identifiant });
    envoyerEvenement({ evt: "question", run: identifiant, q: questions[0].id });
  }

  function choisir(id: QuestionId, valeur: string) {
    setReponses((courantes) => ({ ...courantes, [id]: valeur }));
    setErreur("");
  }

  function suivant() {
    if (!reponses[question.id]) {
      setErreur("Choisissez une réponse pour continuer.");
      return;
    }
    if (index < total - 1) {
      const prochaine = questions[index + 1];
      setIndex(index + 1);
      envoyerEvenement({ evt: "question", run: parcours, q: prochaine.id });
      return;
    }
    const calcul = evaluer(reponses);
    if (!calcul) {
      setErreur("Certaines réponses sont manquantes. Revenez en arrière pour les compléter.");
      return;
    }
    const code = encoder(reponses);
    if (code) changerHash(`${PARAM_RESULTAT}${code}`);
    setVue("resultat");
    envoyerEvenement({ evt: "termine", run: parcours, verdict: calcul.verdict, preparation: calcul.preparation });
  }

  function retour() {
    setErreur("");
    if (index > 0) setIndex(index - 1);
    else setVue("intro");
  }

  function recommencer() {
    changerHash("");
    setReponses({});
    setIndex(0);
    setErreur("");
    setVue("intro");
  }

  return (
    <div className="sim rsr" id="test">
      <div className="sim__head">
        <p className="sim__title">RS ou RNCP ? Le test gratuit</p>
        <p>10 questions, 2 minutes, sans inscription.</p>
      </div>

      <div className="sim__body">
        {vueAffichee === "intro" && (
          <div className="rsr-intro">
            <h2 className="sim__step-title" ref={titreRef} tabIndex={-1}>
              Votre certification doit-elle viser le RS ou le RNCP ?
            </h2>
            <p className="sim__sub">
              Répondez à 10 questions simples. Vous obtenez tout de suite un verdict clair et les points de vigilance.
              Aucune donnée personnelle n&apos;est demandée pour voir le résultat.
            </p>
            <ul className="rsr-promesses">
              <li>Réponse en 2 minutes</li>
              <li>Gratuite</li>
              <li>Sans inscription</li>
            </ul>
            <button type="button" className="btn btn--dark" onClick={commencer}>
              Commencer le test
            </button>
          </div>
        )}

        {vueAffichee === "question" && (
          <div>
            <p className="visually-hidden" role="status" aria-live="polite">
              Question {index + 1} sur {total}
            </p>
            <div
              className="sim__steps rsr-progression"
              role="progressbar"
              aria-label="Progression du test"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={index + 1}
              aria-valuetext={`Question ${index + 1} sur ${total}`}
            >
              {questions.map((q, i) => (
                <span key={q.id} className={i <= index ? "is-on" : undefined} />
              ))}
            </div>
            <p className="rsr-compteur" aria-hidden="true">
              Question {index + 1} sur {total}
            </p>

            <fieldset className="sim-question rsr-question">
              <legend>
                <h2 className="rsr-question__titre" ref={titreRef} tabIndex={-1}>
                  {question.titre}
                </h2>
              </legend>
              <div className="rsr-options">
                {question.options.map((option) => (
                  <label key={option.value} className="sim-choice rsr-option">
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={reponses[question.id] === option.value}
                      onChange={() => choisir(question.id, option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* « key » : l'encadré se referme à chaque nouvelle question. */}
            <details className="rsr-pourquoi" key={question.id}>
              <summary>Pourquoi cette question ?</summary>
              <p>{question.pourquoi}</p>
            </details>

            {erreur && (
              <p className="form-error sim__error" role="alert">
                {erreur}
              </p>
            )}

            <div className="sim__nav">
              <button type="button" className="btn btn--outline" onClick={retour}>
                Retour
              </button>
              <button type="button" className="btn btn--dark" onClick={suivant}>
                {index < total - 1 ? "Suivant" : "Voir mon résultat"}
              </button>
            </div>
          </div>
        )}

        {vueAffichee === "resultat" && (
          <VueResultat
            resultat={resultat}
            reponses={reponsesAffichees}
            parcours={parcours}
            titreRef={titreRef}
            onRecommencer={recommencer}
          />
        )}
      </div>
    </div>
  );
}

function VueResultat({
  resultat,
  reponses,
  parcours,
  titreRef,
  onRecommencer,
}: {
  resultat: Resultat | null;
  reponses: Answers;
  parcours: string;
  titreRef: RefObject<HTMLHeadingElement | null>;
  onRecommencer: () => void;
}) {
  const [copie, setCopie] = useState(false);
  const [contact, setContact] = useState({ prenom: "", nom: "", structure: "", email: "", tel: "", website: "" });
  const [consentement, setConsentement] = useState(false);
  const [statut, setStatut] = useState<StatutEnvoi>("inactif");
  const [messageErreur, setMessageErreur] = useState("");
  const affichageDepuis = useRef(0);

  useEffect(() => {
    // Instant d'affichage du résultat : sert au délai minimal anti-spam du formulaire.
    affichageDepuis.current = Date.now();
  }, []);

  if (!resultat) {
    return (
      <div>
        <h2 className="sim__step-title" ref={titreRef} tabIndex={-1}>
          Ce résultat n&apos;a pas pu être affiché
        </h2>
        <p className="sim__sub">Le lien est incomplet ou périmé. Refaites le test : cela prend deux minutes.</p>
        <button type="button" className="btn btn--dark" onClick={onRecommencer}>
          Refaire le test
        </button>
      </div>
    );
  }

  async function copierLien() {
    try {
      await navigator.clipboard.writeText(lienDuResultat(reponses));
      setCopie(true);
      window.setTimeout(() => setCopie(false), 2500);
    } catch {
      setCopie(false);
    }
  }

  async function envoyer(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    if (!resultat) return;
    setMessageErreur("");
    if (!contact.prenom.trim() || !contact.nom.trim() || !contact.structure.trim()) {
      setMessageErreur("Indiquez vos prénom, nom et structure.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email.trim())) {
      setMessageErreur("Indiquez une adresse e-mail valide.");
      return;
    }
    if (!consentement) {
      setMessageErreur("Merci de cocher la case de consentement.");
      return;
    }
    setStatut("envoi");
    try {
      const reponse = await fetch("/api/rs-ou-rncp/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: contact.prenom,
          nom: contact.nom,
          structure: contact.structure,
          email: contact.email,
          telephone: contact.tel,
          consentement: true,
          reponses,
          website: contact.website,
          delaiMs: Date.now() - affichageDepuis.current,
        }),
      });
      const donnees = await reponse.json().catch(() => ({}));
      if (!reponse.ok) throw new Error(donnees.error || "L'envoi a échoué.");
      setStatut("envoye");
      if (parcours) envoyerEvenement({ evt: "demande", run: parcours, verdict: resultat.verdict, preparation: resultat.preparation });
    } catch (e) {
      setStatut("erreur");
      setMessageErreur(e instanceof Error ? e.message : "L'envoi a échoué.");
    }
  }

  const formule = resultat.formule;

  return (
    <div className="rsr-resultat">
      <p className={`rsr-niveau rsr-niveau--${resultat.preparation}`}>
        Niveau de préparation : <strong>{resultat.preparationLabel}</strong>
      </p>
      <h2 className="rsr-resultat__titre" ref={titreRef} tabIndex={-1}>
        {resultat.titre}
      </h2>
      <p className="rsr-resultat__resume">{resultat.resume}</p>
      <p className="sim__note">{resultat.preparationTexte}</p>
      {resultat.critere && <p className="sim-help rsr-critere">{resultat.critere}</p>}

      <h3 className="sim__h4">{resultat.verdict === "pas_pret" ? "Ce qu'il manque, par ordre de priorité" : "Pourquoi ce résultat"}</h3>
      <ol className="rsr-liste rsr-liste--numerotee">
        {resultat.raisons.map((raison) => (
          <li key={raison}>{raison}</li>
        ))}
      </ol>

      {resultat.vigilances.length > 0 && (
        <>
          <h3 className="sim__h4">Points de vigilance</h3>
          <ul className="rsr-liste rsr-liste--vigilance">
            {resultat.vigilances.map((vigilance) => (
              <li key={vigilance}>{vigilance}</li>
            ))}
          </ul>
        </>
      )}

      <div className="rsr-formule">
        <p className="rsr-formule__label">Formule adaptée</p>
        <h3 className="rsr-formule__titre">{formule.nom}</h3>
        <p className="rsr-formule__sous-titre">{formule.sousTitre}</p>
        <p>{formule.description}</p>
        <div className="rsr-chiffres">
          <div className="rsr-chiffre">
            <p className="rsr-chiffre__label">Durée indicative</p>
            <p className="rsr-chiffre__valeur">{resultat.dureeIndicative}</p>
            <p className="rsr-chiffre__note">De la préparation du dossier à la décision de France Compétences.</p>
          </div>
          <div className="rsr-chiffre">
            <p className="rsr-chiffre__label">Coût indicatif d&apos;accompagnement</p>
            <p className="rsr-chiffre__valeur">{formule.prixTexte}</p>
            <p className="rsr-chiffre__note">{resultat.fraisDepot}</p>
          </div>
        </div>
        <div className="rsr-formule__actions">
          <Link href={pageDeLaFormule(resultat)} className="btn btn--primary">
            Voir cette formule
          </Link>
        </div>
      </div>

      <div className="rsr-avertissement">
        <p className="rsr-avertissement__texte" role="note">
          {resultat.avertissement}
        </p>
        <div className="rsr-partage">
          <button type="button" className="btn btn--outline" onClick={copierLien}>
            Copier le lien de ce résultat
          </button>
          <span role="status" aria-live="polite" className="rsr-partage__etat">
            {copie ? "Lien copié." : ""}
          </span>
        </div>
      </div>

      <div className="sim-contact rsr-contact">
        {statut === "envoye" ? (
          <div className="form-success form-success--action" role="status">
            <p>
              Résultat envoyé, merci ! Nous revenons vers vous sous 48h.
              <br />
              Ou prenez rendez-vous dès à présent via notre calendrier.
            </p>
            <CalBookingButton className="btn btn--outline" />
          </div>
        ) : (
          <form onSubmit={envoyer} noValidate>
            <h3 className="sim__h4 sim-contact__title">Joindre votre résultat à votre demande</h3>
            <p className="sim-contact__intro">
              Vous souhaitez être recontacté ? Envoyez-nous votre résultat : nous pourrons vous répondre plus précisément,
              sans vous reposer les mêmes questions.
            </p>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="rsr-prenom">Prénom *</label>
                <input id="rsr-prenom" type="text" autoComplete="given-name" value={contact.prenom} onChange={(e) => setContact({ ...contact, prenom: e.target.value })} />
              </div>
              <div className="form-field">
                <label htmlFor="rsr-nom">Nom *</label>
                <input id="rsr-nom" type="text" autoComplete="family-name" value={contact.nom} onChange={(e) => setContact({ ...contact, nom: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="rsr-structure">Structure *</label>
                <input id="rsr-structure" type="text" autoComplete="organization" value={contact.structure} onChange={(e) => setContact({ ...contact, structure: e.target.value })} />
              </div>
              <div className="form-field">
                <label htmlFor="rsr-email">Email *</label>
                <input id="rsr-email" type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="rsr-tel">Téléphone (facultatif)</label>
              <input id="rsr-tel" type="tel" autoComplete="tel" value={contact.tel} onChange={(e) => setContact({ ...contact, tel: e.target.value })} />
            </div>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="form-honeypot"
              value={contact.website}
              onChange={(e) => setContact({ ...contact, website: e.target.value })}
            />
            <label className="sim-consent">
              <input type="checkbox" checked={consentement} onChange={(e) => setConsentement(e.target.checked)} />
              <span>
                * J&apos;accepte que Satisa Formation utilise ces informations pour me recontacter au sujet de ma demande.{" "}
                <Link href={ROUTES.privacy}>Politique de confidentialité</Link>
              </span>
            </label>
            {messageErreur && (
              <p className="form-error" role="alert">
                {messageErreur}
              </p>
            )}
            <button type="submit" className="btn btn--dark" disabled={statut === "envoi"}>
              {statut === "envoi" ? "Envoi en cours..." : "Envoyer mon résultat"}
            </button>
            <p className="sim__note sim-required">* Champs obligatoires</p>
          </form>
        )}
      </div>

      <div className="sim__nav">
        <button type="button" className="btn btn--outline" onClick={onRecommencer}>
          Refaire le test
        </button>
      </div>
    </div>
  );
}
