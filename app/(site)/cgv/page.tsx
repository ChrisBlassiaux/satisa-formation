import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente de Satisa Formation : prestations, devis, prix, paiement, responsabilité, propriété intellectuelle et protection des données.",
  openGraph: {
    title: "Conditions générales de vente - Satisa Formation",
    description:
      "Conditions générales de vente de Satisa Formation : prestations, devis, prix, paiement, responsabilité, propriété intellectuelle et protection des données.",
    url: "https://www.satisa-formation.fr/cgv",
    siteName: "Satisa Formation",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.satisa-formation.fr/cgv",
  },
};

export default function CgvPage() {
  return (
    <section>
      <div className="container legal-content">
        <h1>Conditions générales de vente</h1>

        <p>Dernière mise à jour : octobre 2026</p>

        <p>
          Les présentes Conditions Générales de Vente (ci-après les « CGV ») régissent l&apos;ensemble des prestations de
          services réalisées par Christopher Blassiaux, entrepreneur individuel (micro-entrepreneur) immatriculé
          sous le numéro SIRET 901 028 613 00056, domicilié au 41 rue Jacquemars Giélée, 59800 Lille, exerçant sous
          le nom commercial Satisa Formation (ci-après le « Prestataire »).
        </p>
        <p>
          Email de contact : chris@satisa.fr
          <br />
          Téléphone : +33 7 83 45 67 53
          <br />
          Site internet : www.satisa-formation.fr
        </p>
        <p>
          Toute commande ou signature de devis implique l&apos;acceptation entière et sans réserve des présentes CGV.
        </p>

        <h2>1. Définitions</h2>
        <ul>
          <li>
            <strong>Client</strong> : toute personne physique ou morale agissant à des fins professionnelles
            (organisme de formation, organisme certificateur, entreprise, association) qui commande une prestation au
            Prestataire.
          </li>
          <li>
            <strong>Prestation</strong> : toute prestation de services proposée par le Prestataire.
          </li>
          <li>
            <strong>Devis</strong> : document établi par le Prestataire précisant la prestation, son prix, ses
            modalités de paiement et sa durée estimée.
          </li>
          <li>
            <strong>Livrable</strong> : tout document, support, contenu ou module remis au Client dans le cadre
            d&apos;une prestation.
          </li>
          <li>
            <strong>France Compétences</strong> : l&apos;autorité chargée de l&apos;enregistrement des certifications au
            Répertoire national des certifications professionnelles (RNCP) et au Répertoire spécifique (RS).
          </li>
          <li>
            <strong>Référent métier</strong> : la personne désignée par le Client (responsable pédagogique,
            ingénieur pédagogique, formateur ou expert du métier visé) qui apporte l&apos;expertise du métier ou de la
            compétence certifiée.
          </li>
          <li>
            <strong>Promotion de titulaires</strong> : le groupe d&apos;apprenants formés et évalués par le Client, dont
            les résultats et le devenir professionnel sont présentés dans un dossier de certification.
          </li>
        </ul>

        <h2>2. Objet et champ d&apos;application</h2>
        <p>
          Les présentes CGV définissent les droits et obligations des parties dans le cadre de prestations de
          services en ingénierie de certification RNCP/RS et en ingénierie pédagogique et digitale, réalisées au
          bénéfice exclusif de professionnels.
        </p>
        <p>
          Le Client déclare agir à des fins strictement professionnelles. Les prestations n&apos;étant pas proposées
          aux consommateurs, aucun droit de rétractation ne s&apos;applique.
        </p>
        <p>
          Les présentes CGV prévalent sur toute condition générale d&apos;achat du Client, sauf acceptation écrite et
          expresse du Prestataire. En cas de contradiction entre le devis et les CGV, le devis prévaut pour les
          points qu&apos;il traite expressément.
        </p>

        <h2>3. Description des prestations</h2>
        <p>Le Prestataire propose les formules suivantes. Leur contenu détaillé et leur prix figurent sur le site et dans le devis.</p>
        <ul>
          <li>
            <strong>Formule 1 - Diagnostic de faisabilité</strong> : analyse de la faisabilité du projet de
            certification, remise d&apos;un verdict argumenté avec recommandations, et entretien de restitution.
          </li>
          <li>
            <strong>Formule 2 - Certification guidée</strong> : le Client produit, le Prestataire le guide
            (rétroplanning partagé, trames et modèles, assistance à la rédaction des livrables, relectures et
            corrections, coordination avec le référent métier, assistance au dépôt du dossier sur le site de France
            Compétences, suivi jusqu&apos;à la décision finale).
          </li>
          <li>
            <strong>Formule 3 - Certification pilotée</strong> : le Prestataire produit, le Client valide
            (rétroplanning, analyse du métier et mapping des compétences, rédaction intégrale du référentiel et des
            documents du dossier, pilotage opérationnel de la promotion de titulaires et de la collecte des courriers de
            témoignages et de soutien, assistance au dépôt, suivi jusqu&apos;à la décision finale).
          </li>
          <li>
            <strong>Formule 4 - Ingénieur de certification intégré</strong> : intégration d&apos;un ingénieur de
            certification freelance dans l&apos;équipe du Client, à la journée, en distanciel.
          </li>
          <li>
            <strong>Formule 5 - Responsable de certification externalisé</strong> : suivi mensuel d&apos;une
            certification déjà enregistrée (réunion mensuelle, veille réglementaire ciblée, mise à jour des documents
            opérationnels, service questions-réponses, audit de conformité annuel).
          </li>
          <li>
            <strong>Formule 6 - Conception de formation</strong> : analyse de la demande, du référentiel et du
            public cible, progression pédagogique, programme de formation conforme aux exigences du référentiel
            Qualiopi, scénario pédagogique, séquencement et volumétrie horaire, alignement avec le référentiel de la
            certification visée.
          </li>
          <li>
            <strong>Formule 7 - Création de contenus de formation</strong> : supports de présentation, activités
            d&apos;apprentissage, évaluations formatives, sommatives et certificatives.
          </li>
          <li>
            <strong>Formule 8 - Digitalisation</strong> : diagnostic et cadrage, scénarisation et conception
            digitale, production des modules (e-learning, blended learning), déploiement technique sur le LMS, tests
            et accompagnement des équipes.
          </li>
          <li>
            <strong>Formule 9 - Maintenance pédagogique mensuelle</strong> : mise à jour des contenus, maintenance
            et paramétrage du LMS.
          </li>
        </ul>
        <p>
          Le périmètre exact de chaque prestation est celui défini au devis. Toute demande qui n&apos;y figure pas fait
          l&apos;objet d&apos;un avenant ou d&apos;un nouveau devis.
        </p>

        <h2>4. Devis et commande</h2>
        <p>
          Toute prestation fait l&apos;objet d&apos;un devis préalable établi par le Prestataire, précisant la nature de la
          prestation, le prix, les modalités de paiement et la durée estimée. Le devis est valable 30 jours à
          compter de sa date d&apos;émission.
        </p>
        <p>
          La commande est réputée acceptée à réception du devis signé, accompagné le cas échéant du versement de
          l&apos;acompte prévu. À défaut de réception du devis signé et de l&apos;acompte dans ce délai, le devis est
          considéré comme caduc.
        </p>
        <p>
          La signature du devis peut être effectuée par voie électronique, y compris par simple retour du devis par
          email avec la mention « bon pour accord ». Le Prestataire se réserve le droit de refuser une commande, par
          exemple lorsque la prestation n&apos;est pas réalisable dans les conditions demandées.
        </p>

        <h2>5. Prix, TVA et frais</h2>
        <p>
          Les prix sont exprimés en euros hors taxes (HT). Le Prestataire exerçant sous le régime de la
          micro-entreprise, la TVA n&apos;est pas applicable en vertu de l&apos;article 293 B du Code général des impôts, sauf
          dépassement des seuils de franchise : dans ce cas, la TVA au taux en vigueur s&apos;ajoutera aux prix, à
          compter de la date de dépassement.
        </p>
        <p>
          Les prix peuvent être révisés à tout moment, sans effet rétroactif sur les devis déjà acceptés. Les
          tarifs affichés sur le site sont ceux en vigueur à la date d&apos;émission du devis.
        </p>
        <p>Sauf mention contraire au devis, les prix ne comprennent pas :</p>
        <ul>
          <li>
            les licences, abonnements et frais d&apos;hébergement des outils et plateformes utilisés par le Client (LMS,
            outils auteurs, plateformes de visioconférence, etc.) ;
          </li>
          <li>
            les frais liés à des tiers (évaluateurs, jurés, traducteurs, impression, droits d&apos;utilisation de
            contenus ou d&apos;images soumis à licence) ;
          </li>
          <li>les éventuels frais de déplacement, qui doivent être validés préalablement par le Client et sont refacturés au coût réel.</li>
        </ul>
        <p>Le dépôt d&apos;un dossier auprès de France Compétences est gratuit : il n&apos;est pas facturé par le Prestataire en tant que tel.</p>

        <h2>6. Facturation et paiement</h2>
        <p>Les modalités de paiement sont définies dans le devis. À défaut de mention contraire, les conditions suivantes s&apos;appliquent :</p>
        <ul>
          <li>Formule 1 (diagnostic de faisabilité) : paiement intégral à la commande, avant la réalisation de la prestation.</li>
          <li>
            Formules 2 et 3 : au choix du Client indiqué au devis, soit un paiement unique à la signature, soit un
            paiement échelonné (acompte à la signature puis mensualités de montant fixe). Le paiement échelonné ne
            donne lieu à aucun surcoût : la somme de l&apos;acompte et des mensualités est égale au prix du paiement
            unique.
          </li>
          <li>Autres prestations forfaitaires (notamment Formules 6, 7 et 8) : 50 % à la signature du devis, 50 % à la livraison finale.</li>
          <li>Formule 4 : facturation mensuelle sur la base des journées effectivement réalisées.</li>
          <li>
            Formules 5 et 9 : facturation mensuelle récurrente à terme à échoir, selon les conditions précisées à
            l&apos;article 12.
          </li>
        </ul>
        <p>
          Lorsque le devis prévoit des conditions de paiement spécifiques (échéancier, acompte différent), celles-ci
          prévalent sur les conditions générales ci-dessus.
        </p>
        <p>
          Les factures sont payables par virement bancaire dans un délai de 30 jours à compter de leur date
          d&apos;émission, sauf échéance différente indiquée au devis (acompte payable à la signature, notamment).
        </p>
        <p>
          Tout retard de paiement entraîne de plein droit : l&apos;application de pénalités de retard au taux de trois
          fois le taux d&apos;intérêt légal, exigibles dès le lendemain de la date d&apos;échéance sans qu&apos;aucun rappel ne soit
          nécessaire ; une indemnité forfaitaire de recouvrement de 40 € conformément aux articles L441-10 et D441-5
          du Code de commerce, le Prestataire se réservant le droit de demander une indemnisation complémentaire sur
          justificatifs si les frais de recouvrement dépassent ce montant ; la suspension des prestations en cours
          après mise en demeure restée sans effet pendant 8 jours ; l&apos;exigibilité immédiate de toutes les sommes
          dues, y compris les mensualités restant à échoir en cas de paiement échelonné.
        </p>

        <h2>7. Diagnostic de faisabilité</h2>
        <p>
          Le diagnostic de faisabilité (Formule 1) est une prestation à part entière donnant lieu à la remise d&apos;un
          verdict argumenté, accompagné de recommandations (répertoire recommandé, estimation de la durée de
          préparation, éléments manquants, risques identifiés et formule d&apos;accompagnement adaptée), et à un
          entretien de restitution. Sa durée est d&apos;environ un mois à compter de la réception des documents
          demandés au Client. Cette prestation est due dans son intégralité dès lors qu&apos;elle a été réalisée, quelle
          que soit la conclusion du diagnostic, y compris lorsqu&apos;il conclut que le projet n&apos;est pas recevable en
          l&apos;état ou qu&apos;il est préférable de différer le dépôt.
        </p>
        <p>
          Le montant du diagnostic est déduit du tarif de la mission signée (Formule 2 ou Formule 3) si
          le Client signe le devis de cette mission dans les 60 jours suivant la date de remise du verdict. Passé ce
          délai, aucune déduction ne sera appliquée. La déduction ne s&apos;applique qu&apos;une seule fois et n&apos;est pas
          remboursable en espèces.
        </p>
        <p>
          Le verdict est remis à l&apos;usage exclusif du Client. Il constitue un avis fondé sur les informations
          communiquées par le Client et sur la réglementation en vigueur à la date de sa remise. Le diagnostic
          évalue la faisabilité du projet ; il ne garantit pas son enregistrement, la décision d&apos;enregistrement
          appartenant à France Compétences.
        </p>

        <h2>8. Exécution des prestations, délais et collaboration</h2>
        <p>
          Le Prestataire s&apos;engage à réaliser les prestations définies dans le devis avec soin et professionnalisme.
          Il est tenu à une obligation de moyens. La durée estimée de chaque prestation est précisée dans le devis ;
          les calendriers et rétroplannings sont donnés à titre indicatif et sont ajustés d&apos;un commun accord.
        </p>
        <p>
          Pour les Formules 2 (Certification guidée) et 3 (Certification pilotée), la durée maximale de la
          prestation est fixée à 18 mois à compter de la date de signature du devis. Passé ce délai, si la
          prestation n&apos;est pas achevée du fait du Client (retards de validation, informations non fournies,
          indisponibilité, promotion de titulaires non constituée), le Prestataire se réserve le droit de proposer un avenant
          ou de facturer le solde restant dû.
        </p>
        <p>Le Client s&apos;engage à :</p>
        <ul>
          <li>désigner un référent métier et un interlocuteur disponibles tout au long de la mission ;</li>
          <li>fournir en temps utile les informations, documents, accès et validations nécessaires ;</li>
          <li>répondre aux demandes de validation du Prestataire dans un délai de 15 jours ouvrés ;</li>
          <li>l&apos;informer sans délai de tout élément susceptible d&apos;affecter la réalisation de la prestation.</li>
        </ul>
        <p>
          Tout retard imputable au Client peut entraîner un report des délais de livraison, sans engagement de
          responsabilité du Prestataire. Si le Client reste sans réponse pendant plus de 60 jours, le Prestataire
          peut suspendre la prestation ; sa reprise est alors soumise à la disponibilité du Prestataire et peut
          donner lieu à un nouveau calendrier.
        </p>

        <h2>9. Missions de certification RNCP/RS (Formules 1 à 5)</h2>
        <p>
          <strong>Absence de garantie de résultat.</strong> La décision d&apos;enregistrer ou non une certification
          relève exclusivement de France Compétences, de manière indépendante. Le Prestataire ne garantit ni
          l&apos;enregistrement de la certification, ni sa durée d&apos;enregistrement, ni son éligibilité au financement par
          le compte personnel de formation (CPF), ni le niveau de qualification obtenu, ni les résultats
          d&apos;insertion de la promotion de titulaires. Les honoraires restent dus quelle que soit la décision rendue.
        </p>
        <p>
          <strong>Rôle des parties.</strong> Le compte du Client sur le site de France Compétences demeure sous son
          contrôle exclusif. Le Prestataire n&apos;a pas accès à ses identifiants et ne procède pas lui-même au dépôt :
          il accompagne le Client dans la préparation et la vérification des éléments à soumettre, le Client restant
          seul à effectuer les actions sur la plateforme.
        </p>
        <p>
          <strong>Exactitude des informations.</strong> Le Prestataire apporte son expertise dans l&apos;examen des
          éléments transmis : il signale les incohérences ou lacunes qu&apos;il relève et conseille le Client sur les
          données qui lui paraissent inexactes ou incomplètes afin de renforcer la solidité du dossier. Cet examen ne
          constitue pas un contrôle d&apos;authenticité. Le Client s&apos;engage à lui communiquer tous les éléments destinés
          au dossier avant son dépôt ; le Prestataire n&apos;est pas responsable de ceux qui y seraient ajoutés sans
          qu&apos;il en ait été informé.
        </p>
        <p>
          <strong>Promotion de titulaires.</strong> La formation et l&apos;évaluation des apprenants relèvent de la
          seule responsabilité du Client. Lorsque la formule prévoit le pilotage opérationnel de la promotion de
          titulaires, celui-ci s&apos;entend comme un appui à son organisation et au recueil des données, sans transfert de la
          responsabilité pédagogique ni des obligations de l&apos;organisme de formation.
        </p>
        <p>
          <strong>Évolution de la réglementation.</strong> Les critères et la procédure d&apos;enregistrement (textes,
          vademecum, grilles d&apos;analyse de France Compétences) peuvent évoluer en cours de mission. Le Prestataire
          adapte le dossier dans le cadre du périmètre prévu ; si une évolution impose un travail supplémentaire
          substantiel, il peut faire l&apos;objet d&apos;un avenant.
        </p>
        <p>
          <strong>Décision de France Compétences et fin de mission.</strong> Les Formules 2 et 3 incluent le suivi
          du dossier jusqu&apos;à la notification de la décision de France Compétences, y compris l&apos;accompagnement du
          Client dans la réponse à l&apos;ensemble des demandes de compléments formulées par l&apos;instructeur. La
          production des données, preuves et pièces sollicitées par l&apos;instructeur demeure à la charge du Client. La
          mission prend fin à la notification de la décision, qu&apos;elle soit favorable, y compris lorsque la durée
          d&apos;enregistrement, l&apos;intitulé ou le niveau de qualification retenus diffèrent de ceux demandés, ou
          défavorable.
        </p>
        <p>
          <strong>En cas de refus.</strong> Le Prestataire remet au Client une analyse écrite de la décision et
          l&apos;accompagne dans la préparation de l&apos;échange que le Client peut solliciter auprès de l&apos;instructeur. Il
          formule ensuite des recommandations écrites, précisant notamment si un nouveau dépôt lui paraît opportun
          et dans quel délai. La reprise du dossier, la préparation d&apos;un nouveau dépôt et le suivi de sa nouvelle
          instruction font l&apos;objet d&apos;un accompagnement distinct, sur devis.
        </p>
        <p>
          <strong>Après l&apos;enregistrement.</strong> Les obligations liées à la vie de la certification (renouvellement,
          suivi des promotions, mise à jour des documents) incombent au Client, sauf souscription de la Formule 5.
        </p>

        <h2>10. Prestations d&apos;ingénierie pédagogique et digitale (Formules 6 à 9)</h2>
        <p>
          <strong>Contenus et expertise du Client.</strong> Le Client fournit les contenus, l&apos;expertise métier, les
          références et les accès nécessaires. Il garantit qu&apos;il dispose des droits sur les éléments qu&apos;il remet et
          que leur utilisation ne porte atteinte à aucun droit de tiers. Le Prestataire ne peut être tenu
          responsable d&apos;une atteinte aux droits d&apos;un tiers résultant de ces éléments.
        </p>
        <p>
          <strong>Outils et plateformes.</strong> Les outils (LMS, outils auteurs, plateformes de diffusion) sont
          choisis ou fournis par le Client, le cas échéant avec le conseil du Prestataire. Leurs licences, hébergement, accès et mises à jour sont à la charge du
          Client. Les livrables sont conçus pour les environnements et formats convenus au devis. Le
          Prestataire ne garantit pas leur compatibilité avec un environnement qui diffère de celui
          convenu, ni la disponibilité ou les évolutions de plateformes tierces.
        </p>
        <p>
          <strong>Conformité Qualiopi.</strong> Le programme et les livrables sont conçus pour répondre aux
          exigences du référentiel national qualité. Le Prestataire ne garantit ni l&apos;obtention ni le maintien de la
          certification Qualiopi du Client, qui dépend de l&apos;audit de l&apos;organisme et de ses propres pratiques.
        </p>
        <p>
          <strong>Résultats pédagogiques.</strong> Le Prestataire ne garantit ni la réussite des apprenants, ni
          leurs résultats aux évaluations, ni le taux de satisfaction ou d&apos;insertion qui résulterait de l&apos;utilisation
          des livrables.
        </p>
        <p>
          <strong>Mise en production.</strong> Le déploiement sur le LMS et la mise en ligne auprès des apprenants
          restent sous la responsabilité du Client, qui valide les livrables et les tests avant diffusion.
        </p>

        <h2>11. Ingénieur de certification intégré (Formule 4)</h2>
        <p>
          La Formule 4 est facturée en régie à la journée, selon le rythme convenu entre les
          parties. Une journée correspond à 7 heures de travail effectif ; les fractions de journée sont facturées par
          demi-journée. Elle est réalisée à distance et sous réserve de la disponibilité du Prestataire, confirmée
          par écrit.
        </p>
        <p>
          Le Prestataire intervient en qualité de prestataire indépendant : il organise librement son travail et ses
          horaires dans le cadre des objectifs et des journées convenus, utilise ses propres moyens et n&apos;est placé
          sous aucun lien de subordination à l&apos;égard du Client. Le Client lui fournit les accès nécessaires à sa
          mission. Il n&apos;existe aucune exclusivité entre les parties.
        </p>
        <p>
          Sur demande, un compte rendu d&apos;activité mensuel est établi par le Prestataire. Les corrections et
          ajustements s&apos;entendent dans la limite des journées commandées.
        </p>

        <h2>12. Abonnements et prestations récurrentes</h2>
        <p>
          <strong>Formule 5 - Responsable de certification externalisé.</strong> Cette formule s&apos;adresse aux
          certifications déjà enregistrées. Elle est facturée mensuellement à terme à échoir, sans durée minimale
          d&apos;engagement, et comprend une réunion mensuelle de suivi, une veille réglementaire ciblée, la mise à jour
          des documents opérationnels, un service questions-réponses avec réponse
          sous 48 heures ouvrées et un audit de conformité annuel. La veille réglementaire est une information et
          ne constitue pas un conseil juridique. Chaque partie peut mettre fin à la prestation à tout moment, sans
          préavis, la résiliation prenant effet à la fin du mois en cours.
        </p>
        <p>
          <strong>Formule 9 - Maintenance pédagogique mensuelle.</strong> Cette formule comprend la mise à jour des
          contenus et la maintenance et le paramétrage du LMS, dans la limite d&apos;un volume raisonnable correspondant
          à l&apos;abonnement. Elle est facturée mensuellement à terme à échoir. Elle est conclue pour un engagement
          initial de 3 mois, puis reconduite tacitement par périodes d&apos;un mois. Passé l&apos;engagement initial, chaque
          partie peut y mettre fin par email avec un préavis de 15 jours avant la fin du mois en cours, la
          résiliation prenant effet à la fin de ce mois. Les mois déjà entamés restent dus. Les demandes qui
          dépassent le périmètre de l&apos;abonnement font l&apos;objet d&apos;un devis
          distinct. L&apos;accès au LMS est nécessaire à la réalisation de la prestation.
        </p>
        <p>
          Le Prestataire peut modifier le tarif de ces abonnements moyennant un préavis de 30 jours ; le Client peut
          alors résilier avant l&apos;entrée en vigueur du nouveau tarif.
        </p>

        <h2>13. Livraison, corrections et recette</h2>
        <p>Les livrables sont remis par voie électronique (email ou espace de partage), dans des formats modifiables lorsque cela est pertinent.</p>
        <p>
          Pour les prestations de certification (Formules 2 et 3) : les corrections et allers-retours sont inclus
          jusqu&apos;au dépôt du dossier auprès de France Compétences, dans le périmètre du
          projet. Sont exclues les demandes de reformulation stylistique sans lien avec les exigences de France
          Compétences, ainsi que les modifications induites par un changement de stratégie du Client. Un changement du métier ou de la compétence visés, de la certification ou de sa cible constitue une
          modification du périmètre (article 14).
        </p>
        <p>
          Pour les prestations pédagogiques et digitales (Formules 6, 7 et 8) : deux rounds de corrections sont
          inclus après la première livraison du livrable. Est considéré comme correction tout ajustement de contenu,
          reformulation ou modification mineure de structure. Toute modification substantielle (ajout de modules,
          changement de cible, refonte complète d&apos;un livrable déjà validé) fera l&apos;objet d&apos;un avenant tarifaire.
        </p>
        <p>
          À défaut de remarques formulées par le Client dans les 15 jours suivant la livraison d&apos;un livrable, la
          prestation est réputée acceptée. Les réserves doivent être formulées par écrit et motivées.
        </p>

        <h2>14. Modification, suspension, annulation et résiliation</h2>
        <p>
          Toute modification du périmètre de la prestation en cours d&apos;exécution fera l&apos;objet d&apos;un avenant au devis
          initial.
        </p>
        <p>
          En cas de rupture unilatérale du contrat par le Client après signature du devis, l&apos;acompte versé reste
          acquis au Prestataire à titre d&apos;indemnité. Les sommes correspondant aux travaux déjà réalisés à la date de
          la rupture restent
          également dues, dans la limite du prix de la prestation.
        </p>
        <p>
          En cas de manquement grave d&apos;une partie à ses obligations, non réparé dans un délai de 15 jours après mise
          en demeure par écrit, l&apos;autre partie peut résilier la prestation de plein droit, sans préjudice de tous
          dommages et intérêts. Les travaux réalisés jusqu&apos;à la date de résiliation restent dus.
        </p>

        <h2>15. Propriété intellectuelle</h2>
        <p>
          Les livrables spécifiquement conçus pour le Client dans le cadre des prestations lui sont cédés à
          titre exclusif, à compter du paiement intégral du prix. Cette cession porte sur les droits de
          reproduction, de représentation, d&apos;adaptation, de modification, de traduction et de diffusion, pour tous
          supports et pour toutes destinations liées à l&apos;activité du Client, sur tout territoire et pour la durée
          légale de protection des droits. Ces livrables sont conçus comme des documents neutres que le Client peut
          s&apos;approprier et adapter librement.
        </p>
        <p>
          Pendant la durée d&apos;un paiement échelonné, le Client dispose d&apos;un droit d&apos;usage des livrables nécessaire au
          dépôt du dossier et à la poursuite du projet ; la cession définitive intervient au paiement intégral.
        </p>
        <p>
          Le Prestataire conserve la propriété de ses trames, méthodes, modèles de documents, outils et savoir-faire
          préexistants ou génériques, qu&apos;il peut réutiliser pour d&apos;autres clients. Les éléments de tiers (images,
          polices, outils auteurs, modèles sous licence) restent soumis aux conditions de leurs licences. Les
          données spécifiques au Client (nom, informations confidentielles, contenus métier) ne seront en aucun cas
          réutilisées ou transmises à des tiers.
        </p>
        <p>
          Le Client demeure propriétaire des contenus et éléments qu&apos;il fournit au Prestataire, qui ne peut les
          utiliser que pour l&apos;exécution de la prestation. Une fois la certification enregistrée, elle appartient au
          Client en sa qualité de titulaire.
        </p>
        <p>
          Le Prestataire conserve le droit de mentionner la collaboration à des fins de référencement commercial
          (nom du Client et nature de la prestation), sauf opposition expresse du Client notifiée par écrit.
        </p>

        <h2>16. Confidentialité</h2>
        <p>
          Chaque partie s&apos;engage à traiter avec confidentialité toutes les informations et documents échangés dans
          le cadre de la prestation et à ne les utiliser que pour son exécution. Cette obligation s&apos;applique pendant
          toute la durée de la prestation et au-delà, sans limitation de durée. Elle ne s&apos;applique pas aux
          informations déjà publiques ou dont la divulgation est exigée par la loi ou par une autorité.
        </p>
        <p>
          À la fin de la prestation, le Prestataire restitue ou supprime, à la demande du Client, les documents
          confidentiels transmis. Un
          accord de confidentialité spécifique peut être signé à la demande du Client.
        </p>

        <h2>17. Protection des données personnelles</h2>
        <p>
          Pour les données de ses clients et prospects (contact, facturation), le Prestataire agit en qualité de
          responsable de traitement et les utilise exclusivement pour la réalisation et le suivi des missions. Elles
          ne sont ni cédées, ni louées, ni échangées avec des tiers à des fins commerciales. Les informations
          complémentaires figurent dans la <Link href={ROUTES.privacy}>politique de confidentialité</Link> du site.
        </p>
        <p>
          Lorsque le Client confie au Prestataire des données personnelles de tiers (apprenants, titulaires,
          témoins, données d&apos;insertion professionnelle), le Client est responsable de traitement et le Prestataire
          agit en qualité de sous-traitant au sens du RGPD. Le Prestataire s&apos;engage alors à :
        </p>
        <ul>
          <li>traiter ces données uniquement pour la mission et sur instruction documentée du Client ;</li>
          <li>garantir la confidentialité des données et mettre en œuvre des mesures de sécurité appropriées ;</li>
          <li>ne recourir à un sous-traitant ultérieur qu&apos;avec l&apos;information préalable du Client, et dans le respect du RGPD ;</li>
          <li>aider le Client à répondre aux demandes d&apos;exercice des droits des personnes concernées ;</li>
          <li>notifier au Client, dans les meilleurs délais, toute violation de données dont il a connaissance ;</li>
          <li>restituer ou supprimer les données à la fin de la mission, au choix du Client.</li>
        </ul>
        <p>
          Le Client garantit qu&apos;il a une base légale pour confier ces données, qu&apos;il a informé les personnes
          concernées et qu&apos;il ne transmet que les données nécessaires, de préférence agrégées ou anonymisées lorsque
          cela suffit au dossier. Conformément au RGPD, toute personne dispose d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, d&apos;opposition et de portabilité de ses données en contactant chris@satisa.fr.
        </p>

        <h2>18. Responsabilité</h2>
        <p>
          Le Prestataire est tenu à une obligation de moyens. Sa responsabilité ne saurait être engagée en cas de
          retard ou d&apos;impossibilité d&apos;exécution liés à des causes extérieures à son contrôle, notamment les
          décisions de France Compétences dans le cadre des dossiers de certification, ou tout retard imputable au
          Client.
        </p>
        <p>
          Le Prestataire intervient en qualité de conseil et d&apos;accompagnateur. Le Client reste seul responsable du
          dépôt du dossier auprès de France Compétences et de l&apos;exactitude des informations transmises.
        </p>
        <p>
          La responsabilité du Prestataire ne pourra pas être engagée pour une erreur engendrée par un manque
          d&apos;information ou des informations erronées transmises par le Client, ni pour un retard occasionné par le
          Client.
        </p>
        <p>
          Il appartient au Client de vérifier le contenu des livrables remis et d&apos;émettre toutes réserves dans le
          délai prévu à l&apos;article 13.
        </p>
        <p>
          Dans les limites permises par la loi, la responsabilité totale du Prestataire au titre d&apos;une prestation est
          limitée au montant hors taxes effectivement perçu pour cette prestation (pour les abonnements, aux sommes
          perçues au cours des 12 mois précédant le fait générateur). Le Prestataire n&apos;est pas tenu des dommages
          indirects, tels que la perte de chiffre d&apos;affaires, de clientèle ou de chance, le refus
          d&apos;enregistrement ou de financement d&apos;une certification, l&apos;atteinte à l&apos;image ou la perte de données. Ces
          limitations ne s&apos;appliquent pas en cas de faute lourde ou dolosive.
        </p>
        <p>Toute action en responsabilité doit être engagée dans un délai d&apos;un an à compter du jour où le Client a connu ou aurait dû connaître le fait générateur.</p>

        <h2>19. Force majeure</h2>
        <p>
          Aucune partie ne pourra être tenue responsable de l&apos;inexécution de ses obligations lorsqu&apos;elle résulte
          d&apos;un événement de force majeure au sens de l&apos;article 1218 du Code civil, c&apos;est-à-dire un événement
          imprévisible et indépendant de sa volonté (catastrophe naturelle, pandémie, défaillance technique majeure,
          etc.).
        </p>
        <p>
          Dans ce cas, la partie concernée informe l&apos;autre dans les 5 jours ouvrés suivant la survenance de
          l&apos;événement. Si la situation persiste au-delà de 15 jours ouvrés, chaque partie pourra mettre fin à la
          prestation sans indemnité. Les sommes correspondant aux travaux déjà réalisés restent dues.
        </p>

        <h2>20. Sous-traitance et cession</h2>
        <p>
          Le Prestataire peut confier tout ou partie de la prestation à un sous-traitant ou à un collaborateur
          indépendant, tout en restant responsable de son exécution à l&apos;égard du Client et en s&apos;assurant du respect
          des obligations de confidentialité et de protection des données. Le Client ne peut céder ni transférer le
          devis ou les droits en découlant sans l&apos;accord écrit du Prestataire.
        </p>

        <h2>21. Dispositions générales</h2>
        <ul>
          <li>
            <strong>Communications :</strong> les échanges par email sont valables entre les parties, et les
            enregistrements informatiques du Prestataire font foi entre elles, sauf preuve contraire.
          </li>
          <li>
            <strong>Évolution des CGV :</strong> la version applicable est celle en vigueur à la date d&apos;émission du
            devis accepté, telle qu&apos;annexée au devis et portée à la connaissance du Client au moment de la signature.
          </li>
          <li>
            <strong>Intégralité :</strong> le devis accepté et les présentes CGV forment l&apos;intégralité de l&apos;accord
            entre les parties et remplacent tout échange ou document antérieur sur le même objet.
          </li>
          <li>
            <strong>Nullité partielle :</strong> si une clause est jugée nulle ou inapplicable, les autres clauses
            restent en vigueur.
          </li>
          <li>
            <strong>Non-renonciation :</strong> le fait de ne pas exercer un droit ne vaut pas renonciation à
            celui-ci.
          </li>
          <li>
            <strong>Survie :</strong> les clauses relatives au paiement, à la propriété intellectuelle, à la
            confidentialité, à la protection des données, à la responsabilité et au droit applicable survivent à la
            fin de la prestation.
          </li>
        </ul>

        <h2>22. Droit applicable et litiges</h2>
        <p>
          Les présentes CGV sont régies par le droit français. Les prestations sont destinées exclusivement à des
          professionnels. En cas de litige, les parties s&apos;efforcent de le résoudre à l&apos;amiable dans un délai de 30
          jours à compter de la notification du différend. À défaut de résolution amiable, le Tribunal de commerce
          de Lille sera seul compétent ou, si le Client n&apos;a pas la qualité de commerçant, le Tribunal judiciaire de
          Lille.
        </p>

        <h2>Acceptation des CGV</h2>
        <p>
          Le Client reconnaît avoir pris connaissance des présentes CGV et les accepter sans réserve lors de la
          signature du devis.
        </p>
        <p>Contact : chris@satisa.fr</p>
      </div>
    </section>
  );
}
