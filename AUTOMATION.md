# Automatiser l'outil « RS ou RNCP ? » (sans intervention humaine)

Ce document explique, en langage simple, comment brancher l'outil à un outil d'automatisation
(**Make**, **n8n** ou **Zapier**) pour que, sans que personne n'ait rien à faire :

1. la demande soit **ajoutée à la base de prospects Notion** ;
2. un **e-mail de résultat** soit envoyé à la personne, avec le **lien de prise de rendez-vous** ;
3. une **relance automatique** soit envoyée quelques jours plus tard.

> Rien de tout cela n'est actif tant que la variable `SATISA_WEBHOOK_URL` n'est pas renseignée sur l'hébergement.
> En local, les demandes sont simplement « simulées » : elles s'affichent dans la console et dans le fichier
> `.data/rs-ou-rncp-demandes.jsonl` (ignoré par git). Aucun e-mail n'est envoyé.

---

## 1. Comment ça marche

```
Visiteur  →  fait le test  →  voit son résultat (aucune donnée demandée)
                    │
                    └─ (facultatif) saisit ses coordonnées (prénom, nom, structure, e-mail) + coche la case de consentement
                                   │
                                   ▼
                    /api/rs-ou-rncp/demande   (le site recalcule le verdict, vérifie, filtre le spam)
                                   │  envoie le « payload » (voir §3)
                                   ▼
                    Votre webhook (Make / n8n / Zapier)
                                   ├─ 1. ajoute une ligne dans Notion
                                   ├─ 2. envoie l'e-mail de résultat (avec le lien de rendez-vous)
                                   └─ 3. programme une relance à J+3 (ou J+5)
```

Le site ne stocke **rien** : les données vont directement à votre outil d'automatisation.

## 2. Mise en place (une seule fois)

1. Dans Make, n8n ou Zapier, créez un scénario qui démarre par un **webhook** (« Custom webhook » dans Make,
   « Webhook » dans n8n, « Catch Hook » dans Zapier). Copiez l'adresse (URL) fournie.
2. Sur l'hébergement du site (Vercel), ajoutez la variable d'environnement :
   - `SATISA_WEBHOOK_URL` = l'adresse du webhook copiée à l'étape 1.
3. **Recommandé** : ajoutez aussi `SATISA_WEBHOOK_SECRET` = un mot de passe long choisi par vous. Le site l'envoie dans
   l'en-tête `X-Satisa-Secret` ; dans votre scénario, ajoutez un filtre « si l'en-tête `X-Satisa-Secret` est différent de
   mon mot de passe, arrêter ». Cela empêche n'importe qui d'envoyer de fausses demandes à votre webhook.
4. Redéployez le site (Vercel le fait en général tout seul après un changement de variable).
5. Testez avec une vraie adresse à vous (voir §5).

> Sans `SATISA_WEBHOOK_URL`, en **production**, le formulaire répond « L'envoi a échoué » (le site refuse plutôt que de
> perdre une demande en silence). En développement, il reste simulé.

## 3. Ce que reçoit votre webhook (le « payload »)

Une requête `POST`, au format JSON (`Content-Type: application/json`).

| Champ | Contenu |
|---|---|
| `type` | toujours `"demande_rs_ou_rncp"` |
| `versionPayload` | `1` (changera si le format évolue) |
| `versionRegles` | version des règles qui ont produit le résultat (ex. `"2026-11-19"`) |
| `date` | date et heure d'envoi, format ISO (ex. `"2026-11-19T10:00:00.000Z"`) |
| `pageOrigine` | adresse de la page de l'outil |
| `contact.prenom` | prénom (obligatoire) |
| `contact.nom` | nom (obligatoire) |
| `contact.structure` | structure / organisme (obligatoire) |
| `contact.email` | e-mail (obligatoire) |
| `contact.telephone` | téléphone (facultatif, peut être vide) |
| `consentement` | `accepte: true`, `date`, et `texte` exact de la case cochée (preuve RGPD) |
| `reponses` | les 10 réponses (voir la liste ci-dessous) |
| `resultat.verdict` | `rncp`, `rs`, `deux` ou `pas_pret` |
| `resultat.verdictTitre` | le titre affiché (ex. « Votre certification relève plutôt du RNCP ») |
| `resultat.preparation` / `preparationLabel` | `pret`, `presque_pret` ou `a_construire` + libellé |
| `resultat.dureeIndicative` | durée indicative affichée |
| `resultat.formule` | `cle` (`diagnostic`, `guidee`, `pilotee`), `nom`, `prixTexte`, `prixMin`, `prixMax` (en € HT) |
| `resultat.raisons` | liste des raisons (3 au maximum) |
| `resultat.vigilances` | liste des points de vigilance |
| `lienResultat` | lien qui rouvre exactement le résultat de la personne |

**Réponses (`reponses`)** : `objectif` (`marche`, `metier`, `interne`, `autre`), `nature` (`metier`, `competences`,
`habilitation`, `sensibilisation`), `duree` (`courte`, `moyenne`, `longue`), `public` (`salaries`, `demandeurs`, `tous`),
`referentiel` (`complet`, `partiel`, `non`), `promotion` (`oui`, `encours`, `non`), `insertion` (`oui`, `possible`, `non`),
`jury` (`oui`, `prevu`, `non`), `temps` (`peu`, `modere`, `important`), `delai` (`court`, `moyen`, `long`).

**Exemple complet**

```json
{
  "type": "demande_rs_ou_rncp",
  "versionPayload": 1,
  "versionRegles": "2026-11-19",
  "date": "2026-11-19T10:00:00.000Z",
  "pageOrigine": "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/rs-ou-rncp",
  "contact": { "prenom": "Marie", "nom": "Dupont", "structure": "Organisme Test", "email": "marie@organisme.fr", "telephone": "" },
  "consentement": {
    "accepte": true,
    "date": "2026-11-19T10:00:00.000Z",
    "texte": "J'accepte que Satisa Formation utilise ces informations pour me recontacter au sujet de ma demande."
  },
  "reponses": {
    "objectif": "marche", "nature": "metier", "duree": "longue", "public": "demandeurs",
    "referentiel": "complet", "promotion": "oui", "insertion": "oui", "jury": "oui",
    "temps": "modere", "delai": "long"
  },
  "resultat": {
    "verdict": "rncp",
    "verdictTitre": "Votre certification relève plutôt du RNCP",
    "preparation": "pret",
    "preparationLabel": "Prêt",
    "dureeIndicative": "À partir de 10 mois",
    "formule": { "cle": "guidee", "nom": "Certification guidée", "prixTexte": "5 000 € HT", "prixMin": 5000, "prixMax": 5000 },
    "raisons": ["Votre certification prépare à un métier complet…", "Vous avez déjà formé et évalué au moins une promotion…"],
    "vigilances": []
  },
  "lienResultat": "https://www.satisa-formation.fr/deposer-une-certification-rncp-rs/rs-ou-rncp#r=v1-0.0.2.0.0.0.0.0.1.2"
}
```

## 4. Le scénario à construire, étape par étape

### Étape 1 : ajouter la demande dans la base de prospects Notion
- Module « Notion → Créer une page dans une base » (Make/n8n/Zapier).
- Correspondance suggérée des champs : **Nom** ← `contact.structure` ;
  **E-mail** ← `contact.email` ; **Prénom** ← `contact.prenom` ; **Nom de famille** ← `contact.nom` ; **Téléphone** ← `contact.telephone` ; **Verdict** ← `resultat.verdictTitre` ;
  **Préparation** ← `resultat.preparationLabel` ; **Formule recommandée** ← `resultat.formule.nom` ;
  **Montant** ← `resultat.formule.prixMin` ; **Lien du résultat** ← `lienResultat` ; **Source** ← « Test RS ou RNCP » ;
  **Date** ← `date` ; **Statut** ← « À contacter ».
- Gardez aussi `consentement.date` : c'est votre preuve de consentement.

### Étape 2 : envoyer l'e-mail de résultat (avec le lien de rendez-vous)
- Destinataire : `contact.email`. Objet suggéré : « Votre résultat : RS ou RNCP ? ».
- Contenu suggéré (à adapter à votre ton) :
  1. « Bonjour {prenom}, voici votre résultat : **{verdictTitre}**. »
  2. Les raisons (`resultat.raisons`) et les points de vigilance (`resultat.vigilances`).
  3. « La formule adaptée : **{formule.nom}**, {formule.prixTexte}. Durée indicative : {dureeIndicative}. »
  4. Le lien pour retrouver le résultat : `lienResultat`.
  5. **Le lien de prise de rendez-vous** : `https://www.satisa-formation.fr/rendez-vous`.
  6. La mention : « Ce test est une orientation générale, pas un avis juridique. L'enregistrement dépend de la décision
     de France compétences. »
  7. Un lien de désinscription / « répondre à ce message pour ne plus être contacté ».
- Envoyez depuis une adresse du domaine `satisa-formation.fr` (meilleure délivrabilité).

### Étape 3 : relance automatique quelques jours plus tard
- Module « Attendre » (3 à 5 jours), puis **vérifiez avant d'envoyer** que la personne n'a pas déjà pris rendez-vous
  (statut Notion différent de « À contacter », ou un événement existant dans votre agenda). Sinon, ne pas relancer.
- E-mail suggéré : un rappel court, personnalisé selon `resultat.verdict` :
  - `pas_pret` : proposer le **diagnostic de faisabilité** (700 € HT) ;
  - `rncp` ou `rs` : proposer un échange de 30 minutes sur la formule recommandée ;
  - `deux` : proposer un échange pour trancher entre les deux répertoires.
- Limitez-vous à **une seule relance**. Mettez à jour le statut Notion à la fin (« Relancé »).

## 5. Tester avant de mettre en ligne

1. Dans votre scénario, activez le mode « écoute » du webhook.
2. En local, copiez l'adresse du webhook dans un fichier `.env.local` à la racine du site :
   `SATISA_WEBHOOK_URL=https://…` (et `SATISA_WEBHOOK_SECRET=…` si vous l'utilisez). Redémarrez `npm run dev`.
3. Passez le test avec une adresse e-mail à vous et envoyez la demande.
4. Vérifiez que votre scénario a bien reçu les champs du §3, puis que la ligne Notion et l'e-mail partent comme prévu.
5. Supprimez la ligne de test dans Notion.

## 6. Statistiques anonymes

Le test envoie de petits événements **sans donnée personnelle et sans cookie** : démarrage, question atteinte, test
terminé (avec le verdict), demande de contact. Ils servent à savoir quelles questions font abandonner et combien de tests
deviennent des demandes.

- **En local** : `npm run stats:rs-rncp` résume le fichier `.data/rs-ou-rncp-evenements.jsonl`.
- **En production**, deux options :
  - par défaut, une ligne `[rs-ou-rncp-stat] {…}` est écrite dans les **journaux du serveur** (tableau de bord de l'hébergeur) ;
    copiez-les dans un fichier `.jsonl` puis `node scripts/stats-rs-ou-rncp.mjs fichier.jsonl` ;
  - ou définissez `SATISA_STATS_WEBHOOK_URL` : chaque événement est envoyé à cette adresse (par exemple un second
    webhook Make/n8n qui les range dans un tableur ou une base Notion).

## 7. Limites à connaître

- La **limitation de débit** (5 demandes par adresse et par 10 minutes) est en mémoire : sur Vercel, chaque instance du
  site a sa propre mémoire. Elle complète le champ piège et le délai minimal d'envoi (3 secondes après l'affichage du
  résultat), elle ne remplace pas un pare-feu. Pour une protection plus forte, ajoutez le **filtre sur le secret** (§2) et
  une règle « une seule demande par e-mail et par jour » dans votre scénario.
- Aucune relance ne doit partir **sans consentement** : le payload n'est envoyé que si la case a été cochée.
- La **politique de confidentialité** du site doit mentionner ce traitement (voir le rapport final).
