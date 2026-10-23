---
name: vaut-le-coup
description: Vérifie vite si une marque ou un article vu dans un magasin ou un outlet au Japon vaut le coup par rapport à la France, avec un ordre de grandeur du gain en % (prix Japon + détaxe + change). À utiliser quand Antoine ou Emilie demandent « est-ce que X vaut le coup ? » devant une boutique.
---

# Vaut le coup ? (Japon vs France)

Ils sont debout devant la boutique : répondre en moins de 2 minutes, 6 lignes maximum, un verdict net. Pas de dissertation, pas de dizaine de modèles.

## 1. Recherches (toutes en parallèle, une seule salve)

1. Prix Japon TTC de 2 ou 3 modèles emblématiques de la marque (site officiel `.jp`, Rakuten, Yodobashi, Amazon.co.jp). Requête type : `<marque> <modèle> 価格 税込`.
2. Prix France des mêmes modèles (site officiel `.fr`, Decathlon, Alltricks, Amazon.fr, idealo). Noter le prix catalogue ET le prix promo courant.
3. Si outlet : remise typique de la marque en outlet au Japon (`<marque> アウトレット 割引`), sinon sauter.
4. Taux EUR/JPY : une recherche `EUR JPY` seulement si le taux noté ci-dessous date de plus d'une semaine.

Ne jamais inventer un prix. Si rien de fiable, le dire et donner seulement la règle de pouce.

## 2. Calcul

```
€ payé = ¥ étiquette × 0,9 (détaxe) ÷ taux
gain   = 1 − € payé ÷ € France
```

- Détaxe : −10 % à la caisse jusqu'au 31/10/2026, ≥ ¥5 000 HT par boutique et par jour. À partir du 1/11 : paiement TTC et remboursement après la borne douane à l'aéroport (même gain, moins immédiat). Avec un opérateur type Pie VAT, retirer encore ~1,5 à 3 % de frais.
- Outlet : l'étiquette est déjà remise. Ne pas additionner une remise théorique si l'étiquette est sous les yeux. Sans étiquette : prendre −30 % sur le prix Japon TTC comme hypothèse moyenne, en le disant.
- Comparer au prix France **catalogue** pour le verdict, et mentionner le prix promo France si l'écart change la conclusion.
- Taux de référence : **178 ¥/€** (12/10/2026). Mettre à jour cette ligne quand une recherche donne un taux plus récent.

Seuil utile à donner : « vaut le coup si l'étiquette est ≤ ¥X », avec X = € France catalogue × taux ÷ 0,9 × 0,85 (soit ≥ 15 % de gain réel).

## 3. Grille de lecture par type de marque

- 🟢 Marques japonaises (Montbell, Snow Peak, Uniqlo, GU, Onitsuka Tiger, Asics, Mizuno, Seiko, Casio, Shimano, Muji, Kinto) : prix Japon nettement sous la France, souvent 25 à 45 % de gain avant même l'outlet.
- 🟡 Marques américaines (Oakley, Nike, Coach, Levi's, Columbia, The North Face JP) : prix Japon ≈ prix France ; le gain vient uniquement de l'outlet + détaxe, 10 à 35 %.
- 🔴 Luxe et marques européennes (Gucci, Prada, Longchamp, Le Creuset, adidas) : prix Japon souvent ≥ France, gain nul ou négatif hors grosse remise outlet.
- Attention aux pièges : collections outlet spécifiques (qualité moindre), tailles japonaises plus petites, garantie et SAV en France parfois refusés sur un achat Japon, modèles « Low Bridge Fit » chez Oakley et Ray-Ban (ajustement asiatique).

## 4. Format de réponse

```
<Marque> : 🟢/🟡/🔴 verdict en une phrase.
Gain estimé : ~X % vs prix France catalogue (~Y % vs promo France).
Repères : <modèle> ¥… → … € payé vs … € en France ; <modèle 2> …
Seuil : vaut le coup si l'étiquette ≤ ¥… pour <modèle>.
Piège : <un seul, le plus utile>.
Sources : liens.
```

## 5. Mémoire

Après chaque réponse, ajouter une ligne dans `verdicts.md` (marque, date, verdict, gain, repère) et committer avec le prochain push. Lire ce fichier en premier : une marque déjà vérifiée se répond sans recherche.
