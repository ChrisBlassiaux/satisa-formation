@AGENTS.md

# Workflow Git (Satisa Formation)

Deux branches :

- `main` : production. Chaque push met à jour le site en ligne (satisa-formation.fr) en environ une minute.
- `develop` : validation. Chaque push crée un aperçu Vercel que les développeurs relisent avant la mise en production. Aperçu : https://satisa-formation-git-develop-satisa1.vercel.app

Les articles du blog sont publiés via l'admin Keystatic, qui écrit directement sur `main`. Ne jamais modifier `content/posts/` dans le code, toujours passer par Keystatic.

## Règles pour Claude Code

1. **Toujours se positionner sur `develop`, ne jamais travailler directement sur `main`.** Au tout début de chaque session, et avant toute modification de fichier ou tout commit, vérifier la branche courante avec `git branch --show-current`. Si ce n'est pas `develop`, faire `git switch develop` avant de continuer (si des modifications non commitées empêchent le changement de branche, l'expliquer au développeur et demander). `main` ne sert que pendant la mise en production (règle 3), et on revient sur `develop` aussitôt après. Au début de chaque session : `git pull`. Seulement si le travail touche au blog (liste, page article, bloc "derniers articles" de l'accueil), faire aussi `git merge origin/main` pour que l'aperçu affiche les articles actuellement publiés via Keystatic.

2. **Push sur `develop` : le proposer.** Dès que le développeur a terminé une étape (une modification cohérente, vérifiée en local), lui proposer de la commit et de la push sur `develop`. Attendre sa réponse, ne pas pousser sans accord. Après le push, lui rappeler l'URL d'aperçu ci-dessus.

3. **Mise en production : seulement sur demande du développeur.** Ne jamais pousser sur `main` de sa propre initiative, même si tout semble prêt. Quand le développeur demande la mise en production :
   - Rappeler que l'aperçu de `develop` doit avoir été validé par l'équipe.
   - Demander une confirmation explicite avant d'exécuter.
   - Une fois confirmé, synchroniser d'abord `develop` : `git fetch`, `git switch develop`, `git pull`, `git merge --no-edit origin/main`, `git push`. En cas de conflit, s'arrêter et l'expliquer au développeur. Si la synchronisation a apporté autre chose que des articles (`content/posts/`, `public/images/blog/`), laisser l'aperçu se reconstruire et demander au développeur de le revérifier avant de continuer.
   - Puis publier : `git switch main`, `git pull`, `git merge --ff-only develop`, `git push`, et enfin `git switch develop`. Si `--ff-only` refuse (`main` a bougé entre-temps, par exemple un article publié), reprendre la synchronisation depuis le début, ne jamais contourner.

4. **Jamais de `--force`** ni de réécriture de l'historique sur `main` ou `develop`. En cas de conflit de merge, expliquer la situation au développeur et demander avant de trancher.
