// Typographie française à l'affichage : une espace insécable évite qu'un « ? », « ! », « : », « ; », « % », « € » ou « » »
// passe seul à la ligne (ex. « Besoin d'un accompagnement / ? »), et que « 2 000 » se coupe en deux.
// Le contenu écrit dans Keystatic n'est pas modifié : seul l'affichage l'est. Fonction pure, sans dépendance :
// elle s'utilise aussi bien dans les composants serveur que dans les composants client.
const NBSP = " ";

export function frenchText(text: string): string {
  return text
    .replace(/[  ]+(?=[?!;:»€%])/g, NBSP)
    .replace(/(«)[  ]+/g, `$1${NBSP}`)
    .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${NBSP}`);
}
