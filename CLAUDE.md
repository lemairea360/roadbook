# Roadbook Japon 2026 — instructions pour Claude Code

**Langue : français** (réponses, commits, contenu).

Ce dépôt est une PWA statique de voyage (famille, 13/10 → 05/11/2026), publiée sur GitHub Pages depuis la branche `main` : https://lemairea360.github.io/roadbook/

**Avant toute modification, lis `GUIDE.md` en entier.** Résumé des règles :

1. **Seul `data.js` se modifie** (programme des jours, alertes, chips, menus, achats, codes, infos). Ne touche pas à `index.html`, `sw.js`, `valises.html`, `manifest.webmanifest` sans demande explicite.
2. Ne modifie que sur instruction d'Antoine ou d'Emilie ; n'invente aucune donnée (code de résa, horaire, prix, téléphone).
3. Ne renomme jamais un `id` existant (états cochés en localStorage sur les téléphones).
4. Aucun secret en clair (site public) : pas de token, d'email perso, de n° de passeport, d'adresse du domicile.
5. Avant de committer, depuis la racine :
   ```bash
   node --check data.js
   node verifie-data.js
   ```
   Les deux doivent passer.
6. **Commit puis push directement sur `main`** (pas de branche, pas de PR) : GitHub Pages redéploie en ~1 min et les téléphones récupèrent la mise à jour au lancement suivant de l'app avec réseau. Message de commit court, en français.
7. Vérifier ensuite : `curl -s https://lemairea360.github.io/roadbook/data.js | grep "<un bout du texte ajouté>"`.

Le dépôt a aussi une copie locale sur le Mac d'Antoine (dossier iCloud du vault Obsidian) : après un push depuis le mobile, la prochaine session sur Mac doit faire `git pull` avant d'éditer.
