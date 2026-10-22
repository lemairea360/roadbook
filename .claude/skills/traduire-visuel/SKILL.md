---
name: traduire-visuel
description: Traduit en français une photo de document japonais (menu, panneau, affiche, horaires, notice, télécommande, écran de machine) et la restitue en image avec la même organisation visuelle. À utiliser dès qu'Antoine ou Emilie envoient une photo et demandent une traduction, un schéma ou une image traduite.
---

# Traduire une photo en réplique visuelle

But : que la famille puisse poser le téléphone à côté de l'original et retrouver chaque élément au même endroit. Le livrable est un PNG envoyé avec `SendUserFile` (display `render`), plus 2 ou 3 lignes de conseil dans la réponse.

## 1. Lire la photo et choisir le mode

Deux modes, à choisir selon l'objet :

- **réplique** (menus, affiches, horaires, tarifs, règlements) : on reconstruit la page en HTML avec la même disposition (zones, colonnes, encadrés), texte français en principal, étiquette japonaise en petit gris à côté de chaque ligne pour pointer du doigt. Les photos de plats ou d'illustrations sont recadrées depuis le cliché original (`background-image` + `background-position` en pixels sur la photo à taille réelle).
- **calque** (télécommande, borne, panneau de commande, écran, machine) : la photo originale sert de fond, et on pose dessus des étiquettes numérotées ou des bulles de traduction au-dessus de chaque bouton ou zone. On ne redessine rien, on annote. Si les étiquettes gênent la lecture, les numéroter sur la photo et mettre la légende numérotée dans une bande à droite ou en bas.

Un document mixte (panneau avec pictogrammes + texte) : calque.

## 2. Traduire

- Français simple, du point de vue de la famille (2 adultes, 2 filles de 6 et 8 ans). Signaler ce qui compte pour eux : le plat le plus doux pour les enfants, un interdit, un horaire limite, une étape à ne pas rater.
- Chiffres, prix, horaires, noms propres : copiés tels quels, jamais arrondis ni inventés. Un élément illisible est marqué « ? », pas deviné.
- Garder la hiérarchie de l'original : ce qui est gros reste gros, ce qui est en rouge reste en rouge, les pastilles « お得 / おすすめ » deviennent ★.
- Conserver les termes japonais utiles tels quels en romaji quand ils servent à commander ou à demander (chashu, menma, shōyu, onsen, etc.).

## 3. Construire le HTML

- Page de la taille exacte de la photo (`body{width:Wpx;height:Hpx;position:relative;overflow:hidden}`), tout en `position:absolute` par zone. Obtenir W×H avec `node render.js --size photo.jpg`.
- Polices disponibles dans la session cloud : `"DejaVu Sans"` pour le français, `"Unifont-JP"` pour le japonais (seule police CJK installée, pixelisée mais lisible en petit). Déclarer `font-family:"DejaVu Sans","Unifont-JP",sans-serif`.
- Lignes prix : `display:flex; justify-content:space-between`, prix en gras à droite, pointillés en `border-bottom:1px dotted`. Titre + prix sur une même ligne (flex, jamais `float`).
- Partir de `exemples/menu-kimori.html` pour une réplique, de `exemples/calque.html` pour un calque.

## 4. Rendre, vérifier, corriger

```bash
S=.claude/skills/traduire-visuel
node $S/render.js page.html sortie.png            # taille lue dans le body
node $S/render.js page.html sortie.png 2016 1512  # taille forcée
```

Toujours relire le PNG rendu (outil Read) avant de l'envoyer : chevauchements, texte qui déborde, prix passé à la ligne, photo recadrée qui masque une colonne. Corriger et re-rendre. Un seul envoi, propre.

Travailler dans le scratchpad de session, jamais dans le dépôt : la skill ne crée aucun fichier à committer.

## 5. Livrer

`SendUserFile` avec le PNG, `display:"render"`, légende d'une ligne. Dans la réponse : 2 ou 3 phrases maximum (le conseil pour les filles, le point important, la phrase à dire au staff si utile). Pas de retranscription complète en texte, l'image suffit, sauf demande.
