# GUIDE — modifier le roadbook pendant le voyage

**Langue : tout est en français — réponses, commits, contenu.**

Mode d'emploi pour une session Claude Code (mobile) qui doit modifier le roadbook **sans connaître le contexte du projet**. Lis ce fichier en entier avant de toucher quoi que ce soit.

## Ce qu'est ce repo

PWA « compagnon de voyage » pour un voyage famille au Japon (13/10 → 05/11/2026, 2 adultes + 2 filles de 6 et 8 ans), installée sur les 2 iPhones (Antoine + Emilie) et utilisée **hors-ligne** sur place.

- Publiée via GitHub Pages : **https://lemairea360.github.io/roadbook/** (repo `lemairea360/roadbook`, branche `main`).
- Zéro framework, zéro build : des fichiers statiques servis tels quels.
- `index.html` = l'UI (HTML + CSS + JS applicatif). `data.js` = **toutes** les données du voyage. `sw.js` = service worker hors-ligne. `valises.html` = checklist valises autonome (ses données sont dedans, hors périmètre de ce guide).

## Ce que tu peux éditer : `data.js` uniquement

Toute demande du type « change le programme de jeudi », « ajoute une alerte », « nouveau resto dans le menu Tokyo », « corrige le code de résa » = une modification de `data.js`, rien d'autre.

Les collections (toutes des `const` globales, chargées avant le script applicatif) :

| Constante | Rôle |
|---|---|
| `SLEEPS` | Les logements (1 entrée par lieu de nuit, clé courte stable : `kyoto`, `izu`…) |
| `WIFI_TOKYO`, `PNR_A/PNR_R/CONF_A/CONF_R` | Constantes réutilisées dans `DAYS`/`CODES` (PNR encodés base64, voir « Ne jamais faire ») |
| `DAYS` | Les 24 jours, dans l'ordre, dates continues |
| `MENUS` | Options d'activités par phase (`"Kyoto"`, `"Tokyo"`) pour les jours `menu:true` |
| `ACHATS` | Liste d'achats cochable (+ `FICHES` = fiches détaillées liseuse/montre) |
| `CODES` | Onglet Infos : codes de résa copiables |
| `INFOS` | Onglet Infos : téléphones (`rows`) et rappels (`list`) |
| `TAUX_DEFAUT`, `DETAXE_NOTE`, `PREDEP` | Taux ¥/€ par défaut, note détaxe, rappels avant départ |

### Structures, par l'exemple (extraits réels de `data.js`)

**Un jour avec programme (`plan`)** — `w` = quand (texte libre court), `x` = quoi, `maps` (optionnel) = requête Google Maps ajoutée en lien 📍 :

```js
{d:"2026-10-22", t:"Château de Matsumoto → glamping", ph:"Road trip", sleep:"varie",
 plan:[{w:"10:30",x:"Château de Matsumoto 🏯 (~1h30) + déjeuner rue Nakamachi", maps:"Matsumoto Castle"},
       {w:"17:00",x:"Check-in dôme · BBQ si commandé · ciel étoilé ✨"}]},
```

**Un jour avec menu** — pas de `plan` : l'app affiche les options `MENUS[ph]` non encore cochées (`menu:true`) :

```js
{d:"2026-10-15", t:"Kyoto — jour 1", ph:"Kyoto", sleep:"kyoto", menu:true},
```

Une option de menu (dans `MENUS`) — `id` **stable et unique** (clé de l'état « fait » en localStorage : ne jamais renommer un `id` existant), `e` = emoji, `x` = titre, `d` = détail déplié :

```js
{id:"nara", e:"🦌", x:"Nara : daims + Grand Bouddha + mochi pilés (journée, idéal en semaine)",
  d:"Train direct ~45 min depuis Kyoto. …", maps:"Nara Park"},
```

**Une alerte** — simple chaîne dans `alerts` (affichée en carte ⚠️ du jour) :

```js
alerts:["ARRIVER AU TSURUYA AVANT 18H (dîner kaiseki)","Taxe onsen ¥600 en espèces"],
```

**Une chip pratique (`prat`)** — exactement une action : `copy` (copie au tap) OU `tel` (appel) OU `href` :

```js
prat:[{t:"🚗 RC52461258775729685", copy:"RC52461258775729685"},{t:"☎ Agence Nagoya", tel:"0524520100"}],
```

**Un logement (`SLEEPS`)** — `code` = code de résa affiché/copiable, `resa` = lien **exigeant un login**, `color` = couleur de la bande dans la liste des jours, `tel` optionnel :

```js
ena:{ name:"« Slow down » chez Aya & Fabrizzio", area:"Nakanohō, Ena", code:"HMCNFT5PBD",
  resa:"https://www.airbnb.fr/trips/v1/…/HMCNFT5PBD",
  addr:"3960 Nakanohōchō, Ena, Gifu 509-8231", color:"#7d9a4f",
  meta:"Arrivée après 15h, accueil en personne (prévenir !) · chat Tora 🐈" },
```

Chaque `sleep:` d'un jour doit référencer une clé existante de `SLEEPS`.

## Avant de pousser

Depuis la racine du repo :

```bash
node --check data.js      # syntaxe
node verifie-data.js      # day.sleep ∈ SLEEPS, dates continues, ids uniques
```

Les deux doivent passer. `verifie-data.js` refuse le push en cas d'erreur — corrige d'abord. Ne modifie les données que sur instruction explicite d'Antoine ou d'Emilie : n'« améliore » rien de ta propre initiative, n'invente aucune donnée (code, horaire, prix, téléphone).

## Ne jamais faire

- **Aucun secret en clair** : pas de token/bypass (type `bypass_token` tripla), pas de clé d'API, pas de numéro de passeport, pas d'email perso, pas d'adresse du domicile. Le site est **public**. Les PNR de vol restent encodés base64 (`atob("…")`) — garde ce mécanisme tel quel si tu modifies les vols.
- **Ne pas toucher `index.html`** (ni `sw.js`, `valises.html`, `manifest.webmanifest`) sauf demande **explicite** de modification de l'UI.
- **Ne jamais renommer les clés localStorage** ni les `id` existants qui les alimentent : `roadbook-done-v1`, `roadbook-achats-v1`, `roadbook-achats-check-v1`, `valises-v1` — sinon les coches déjà faites sur les téléphones sont perdues.

## Déploiement

`git push` sur `main` suffit : GitHub Pages redéploie (~1 min). Grâce au service worker (stale-while-revalidate), chaque téléphone récupère la mise à jour en arrière-plan à son prochain lancement avec réseau, et l'affiche au lancement **suivant**. Pas besoin de toucher `VERSION` dans `sw.js` pour un changement de données (réservé aux refontes de la liste de fichiers).
