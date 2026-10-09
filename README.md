# Compagnon de voyage — Japon 2026 📱

PWA statique (zéro framework, zéro build — UI dans `index.html`, données dans `data.js`) : itinéraire jour par jour, codes de réservation, numéros utiles — **100 % hors-ligne** une fois installée.

4 onglets : **Aujourd'hui** (fiche du jour : alertes, chips pratiques, logement + lien résa, programme, menu du jour interactif), **Voyage** (liste des 24 jours), **Achats** (convertisseur ¥→€, fiches d'achat dépliables liseuse/montre issues de `recherches/achats/`, liste cochable), **Infos** (codes de résa, téléphones, rappels). États persistants en localStorage : `roadbook-done-v1` (menu « fait »), `roadbook-achats-v1` (achats cochés), `roadbook-achats-check-v1` (checklists magasin + taux ¥/€).

⚠️ **Sécurité** : ce dossier est destiné à un hébergement public — ne jamais y mettre de token/bypass (type `bypass_token` tripla), d'email perso, de numéro de passeport ou d'adresse du domicile.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'app (HTML + CSS + JS applicatif — **sans** données) |
| `data.js` | **Toutes les données du voyage** (SLEEPS, DAYS, MENUS, ACHATS, CODES, INFOS…) — seul fichier à éditer en voyage, voir `GUIDE.md` |
| `verifie-data.js` | Vérifie `data.js` avant un push : `node verifie-data.js` |
| `GUIDE.md` | Mode d'emploi d'édition pour une session Claude Code sans contexte |
| `valises.html` | Checklist valises (page séparée, données incluses, état en localStorage `valises-v1`) |
| `manifest.webmanifest` | Manifeste PWA (nom, icônes, mode standalone) |
| `sw.js` | Service worker **stale-while-revalidate** (hors-ligne garanti + mises à jour auto au lancement suivant). `VERSION` à incrémenter seulement en cas de refonte (liste de fichiers) |
| `icon-512.png` / `apple-touch-icon.png` | Icônes (vermillon, glyphe 日) |
| `gen_icons.py` | Régénère les icônes : `python3 gen_icons.py` (stdlib uniquement) |

## Tester en local

```bash
cd compagnon
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000. Le service worker exige HTTP(S) — ouvrir le fichier directement (`file://`) affiche l'app mais ne teste pas le hors-ligne. Pour vérifier le hors-ligne : charger la page une fois, couper le serveur (Ctrl-C), recharger → l'app doit toujours s'afficher.

## Installer sur iPhone

1. Héberger les fichiers quelque part en **HTTPS** (voir ci-dessous) — obligatoire pour le service worker hors localhost.
2. Ouvrir l'URL dans **Safari** (pas Chrome iOS).
3. Bouton **Partager** → **« Sur l'écran d'accueil »**.
4. Lancer l'app depuis la nouvelle icône, une fois, avec du réseau (le service worker précharge tout).

**Pourquoi installer plutôt que garder un onglet Safari ?** iOS évince agressivement le cache des sites visités en onglet (après ~7 jours sans visite, ou sous pression mémoire). Une web-app **ajoutée à l'écran d'accueil** a son propre conteneur de stockage, traité comme une app : le cache du service worker n'est pas purgé tant que l'app est installée. C'est ce qui garantit l'accès aux codes dans un train sans réseau.

À faire sur les **deux téléphones** (Antoine + Emilie) avant le départ.

## Hébergement — à choisir (rien n'est déployé)

Deux options gratuites, HTTPS, zéro maintenance. **Décision Antoine requise :**

### Option A — GitHub Pages depuis un repo privé
- Repo **privé** (compte GitHub existant), dossier `compagnon/` poussé, Pages activé.
- ✅ Mise à jour = `git push` ; historique des versions ; outil déjà maîtrisé.
- ⚠️ **La page publiée est publique** même si le repo est privé (Pages privé = plan Enterprise). L'URL `antoine.github.io/<repo>/` est non listée mais devinable — les codes de résa y seraient exposés à qui a l'URL. Mitigation possible : nom de repo aléatoire (`kzt-2026-x7q`).

### Option B — Netlify Drop (ou Cloudflare Pages)
- https://app.netlify.com/drop : glisser-déposer le dossier `compagnon/` → URL HTTPS immédiate (sous-domaine aléatoire type `random-name-123.netlify.app`, non devinable).
- ✅ Pas de git, URL obscure par défaut ; Netlify permet en plus une **protection par mot de passe basique** (plan gratuit : via « visitor access » limité, sinon payant — à vérifier au moment du choix).
- ⚠️ Mise à jour = re-glisser le dossier à la main ; compte Netlify à créer (ou utiliser Cloudflare Pages si un compte existe déjà).

**Dans les deux cas** : la page reste techniquement accessible publiquement — elle contient codes de résa, adresses et wifi, mais ni carte bancaire ni passeport. Alternative zéro exposition : AirDrop du dossier + ouverture locale… mais sans HTTPS, pas de vraie PWA hors-ligne. À arbitrer.

## Modifier pendant le voyage

Mode d'emploi complet : **`GUIDE.md`**. Le flow : ouvrir une session Claude Code (mobile) sur ce repo → modifier **`data.js` uniquement** (programme, alertes, codes, menus…) → valider (`node --check data.js` + `node verifie-data.js`) → `git push` sur `main`. GitHub Pages redéploie (~1 min) et, grâce au service worker stale-while-revalidate, les téléphones récupèrent la mise à jour à leur prochain lancement avec réseau (visible au lancement suivant) — sans toucher `VERSION`.

## Sources des données

Tout vient du vault : `itineraire/reservations.md` (source de vérité), `itineraire/carnet-voyage.md`, `etapes/01-kansai.md`, `etapes/02-road-trip.md`, `etapes/03-tokyo.md`. En cas de divergence, le vault a raison → corriger `data.js` (voir `GUIDE.md`).
