// ———————————————————————— DONNÉES DU ROADBOOK (générées depuis le vault Obsidian) ————————————————————————
// Ce fichier est LE fichier à éditer pendant le voyage — mode d'emploi : GUIDE.md.
// Il est chargé par index.html AVANT le script applicatif (<script src="./data.js">) :
// toutes les constantes ci-dessous sont globales et utilisées telles quelles par l'UI.
// ⚠️ Sécurité : ne JAMAIS mettre de token/bypass (bypass_token, code=, clé d'API…) dans ce fichier :
// il sera hébergé publiquement. Les liens de résa doivent exiger un login (Airbnb/Booking) ou être omis.
const SLEEPS = {
  kyoto:{ name:"Airbnb RESI STAY « GION room »", area:"Gion / Higashiyama, Kyoto", code:"HMFWCZNFCN",
    resa:"https://www.airbnb.fr/trips/v1/1726258674668074037/ro/RESERVATION2_CHECKIN/HMFWCZNFCN",
    addr:"246 Yakushi-cho, Matsubara sagaru Nichome, Yamato-Oji Street, Higashiyama-ku, Kyoto 605-0814", color:"#c43d2f",
    meta:"Check-in 15h (instructions la veille) · check-out 11h" },
  ena:{ name:"« Slow down » chez Aya & Fabrizzio", area:"Nakanohō, Ena", code:"HMCNFT5PBD",
    resa:"https://www.airbnb.fr/trips/v1/1741534927088063733/ro/RESERVATION2_CHECKIN/HMCNFT5PBD",
    addr:"3960 Nakanohōchō, Ena, Gifu 509-8231", color:"#7d9a4f",
    meta:"Arrivée après 15h, accueil en personne (prévenir !) · chat Tora 🐈" },
  tsuruya:{ name:"Ryokan Tsuruya ♨️", area:"Shirahone Onsen", code:"T9570D4453533", tel:"0263932331",
    // pas de lien resa : l'URL tripla contenait un bypass_token (accès direct sans login) → le tél suffit
    addr:"Tsuruya, 4202-6 Azumi, Matsumoto, Nagano", color:"#8a5fa0",
    meta:"Check-in 15h — AVANT 18H (dîner) · demi-pension · taxe ¥150/pers cash" },
  varie:{ name:"Glamping Resort Varie ⛺", area:"Fujikawaguchiko", code:"6646658732", tel:"05053695536",
    resa:"https://secure.booking.com/mytrips.html",
    addr:"Glamping Resort Varie, 5527-1 Funatsu, Fujikawaguchiko, Yamanashi 401-0301", color:"#3f8fa8",
    meta:"Dôme vue Fuji · sanitaires dehors → pyjamas chauds + frontale" },
  hakone:{ name:"Villa GranGiorno ♨️ onsen privé", area:"Kowakudani, Hakone", code:"HMZ88PZJ33",
    resa:"https://www.airbnb.fr/trips/v1/1744301552045964594/ro/RESERVATION2_CHECKIN/HMZ88PZJ33",
    addr:"443-155 Kowakudani, Hakone, Kanagawa 250-0406", color:"#b3560e",
    meta:"Check-in 16h (boîte à clé, code la veille) · bagages dès 12h si prévenus" },
  izu:{ name:"« Kiraboshi no sato » 🏠", area:"Izu-kōgen, Itō", code:"HM2P3BHZ4Y", tel:"05017203760",
    resa:"https://www.airbnb.fr/trips/v1/1744324830313001327/ro/RESERVATION2_CHECKIN/HM2P3BHZ4Y",
    addr:"Kiraboshi no sato, 2-339 Ito, Shizuoka 413-0231", color:"#2e7d4f",
    meta:"Self check-in 16h (instructions 2 j avant) · BBQ + cheminée" },
  tokyo:{ name:"THS House (Toshiko)", area:"Ikenohata, Ueno/Nezu", code:"HMB8ADK8TP",
    resa:"https://www.airbnb.fr/trips/v1/1724443097169362231/ro/RESERVATION2_CHECKIN/HMB8ADK8TP",
    addr:"3-chōme-2-12 Ikenohata, Taito City, Tokyo 110-0008", color:"#30557d",
    meta:"Boîte à clé (PIN la veille) · check-in 15h · wifi THS5911 / 12ry4in6" },
  avion:{ name:"Nuit dans l'avion ✈️", area:"", code:"", addr:"", color:"#777",
    meta:"" }
};
// Chips « pratique aujourd'hui » (champ prat des jours) : copy = copie au tap, tel = appel.
const WIFI_TOKYO = {t:"📶 Wifi 12ry4in6", copy:"12ry4in6"};
// PNR avion encodés (base64) : un PNR + nom de famille suffit à gérer un vol → on évite le texte en clair dans un repo public.
const PNR_A=atob("RU9HSkNK"), PNR_R=atob("RU9TOEtO"), CONF_A=atob("UFhXOEhC"), CONF_R=atob("TkoxSFhF");
const DAYS = [
 {d:"2026-10-13", t:"Décollage de Genève", ph:"Vol", sleep:"avion",
  prat:[{t:"✈️ "+PNR_A, copy:PNR_A}],
  alerts:["Aéroport GVA à 10h30 (vol 13:20) — QR Visit Japan Web hors-ligne ×4"],
  plan:[{w:"13:20",x:"CA862 GVA → Pékin (10h05 de vol)"},{w:"nuit",x:"Arrivée PEK 05:25, correspondance 3h15"}]},
 {d:"2026-10-14", t:"Arrivée au Japon → Kyoto", ph:"Kyoto", sleep:"kyoto",
  prat:[{t:"✈️ "+PNR_A, copy:PNR_A}],
  plan:[{w:"08:40",x:"CA927 Pékin → Osaka KIX (arrivée 12:40)"},
        {w:"aprèm",x:"Immigration (QR) + train Haruka → Kyoto (~80 min)", maps:"Kyoto Station"},
        {w:"soir",x:"Check-in, repas simple dans Gion, coucher tôt (décalage)"}],
  alerts:["Instructions self check-in reçues la veille sur Airbnb (plan B : comptoir RESI STAY près de la gare)"]},
 {d:"2026-10-15", t:"Kyoto à vélo — temples de l'est 🚲", ph:"Kyoto", sleep:"kyoto", menu:true,
  plan:[{w:"matin",x:"Récupérer les vélos (+ sièges enfants) puis Nanzen-ji (le « gros temple »)", maps:"Nanzen-ji Kyoto"},
        {w:"midi",x:"Chemin de la philosophie à vélo, pique-nique au bord du canal", maps:"Philosopher's Path Kyoto"},
        {w:"aprèm",x:"Okazaki shrine — le sanctuaire aux lapins 🐇", maps:"Okazaki Shrine Kyoto"}]},
 {d:"2026-10-16", t:"Kyoto à vélo — jardin botanique & Gion 🚲", ph:"Kyoto", sleep:"kyoto", menu:true,
  plan:[{w:"matin",x:"Remonter la rivière Kamo à vélo → jardin botanique", maps:"Kyoto Botanical Gardens"},
        {w:"aprèm",x:"Boutiques + quartier de Gion à pied"},
        {w:"option",x:"Spectacle geiko/maiko au musée d'art Gion Kagai (représentations 13:30 / 14:20 / 15:00 / 16:00 / 16:30)", maps:"Gion Kagai Art Museum"}]},
 {d:"2026-10-17", t:"Kyoto à vélo — Fushimi Inari 🚲⛩️", ph:"Kyoto", sleep:"kyoto", menu:true,
  alerts:["Samedi = foule à Fushimi → partir TÔT (sur place avant 9h)"],
  plan:[{w:"matin",x:"Fushimi Inari à vélo (~30 min par la rivière), torii rouges jusqu'au belvédère Yotsutsuji", maps:"Fushimi Inari Taisha"},
        {w:"aprèm",x:"Retour tranquille, repos ou Nishiki Market"}]},
 {d:"2026-10-18", t:"Nara en train 🦌", ph:"Kyoto", sleep:"kyoto", menu:true,
  alerts:["Dimanche chargé → partir tôt (train direct ~45 min)"],
  plan:[{w:"matin",x:"Daims + crackers, Tōdai-ji (Grand Bouddha)", maps:"Nara Park"},
        {w:"aprèm",x:"Mochi pilés en spectacle chez Nakatanidou, retour Kyoto", maps:"Nakatanidou Nara"}]},
 {d:"2026-10-19", t:"Arashiyama + préparatifs 🎋", ph:"Kyoto", sleep:"kyoto", menu:true,
  alerts:["Ce soir : cash ¥, onigiri pour le trek de mercredi, valises réorganisées pour la voiture"],
  plan:[{w:"matin",x:"Bambous d'Arashiyama tôt (avant 9h) + pont Togetsukyō", maps:"Arashiyama Bamboo Grove"},
        {w:"option",x:"Singes d'Iwatayama (montée 20 min)", maps:"Iwatayama Monkey Park"},
        {w:"aprèm",x:"Retour, préparatifs road trip"}]},
 {d:"2026-10-20", t:"Nagoya → Ena · la voiture !", ph:"Road trip", sleep:"ena",
  prat:[{t:"🚗 RC52461258775729685", copy:"RC52461258775729685"},{t:"☎ Agence Nagoya", tel:"0524520100"}],
  alerts:["Résa Toyota = 9h00 : si arrivée ~10h45, PRÉVENIR l'agence (052-452-0100) — retard non prévenu = résa annulable",
          "Agence Toyota : payer ¥152 130 au comptoir — Revolut + permis + traduction JAF + passeport",
          "Prévenir Aya & Fabrizzio de l'heure d'arrivée (message Airbnb)"],
  plan:[{w:"matin",x:"Shinkansen Kyoto → Nagoya (35 min) · 10h45 agence Toyota, sortie Taiko-dori", maps:"Toyota Rent a Car Nagoya Shinkansen Exit"},
        {w:"aprèm",x:"Au choix : Science Museum (planétarium géant) OU Magome au couchant", maps:"Nagoya City Science Museum"},
        {w:"17:00",x:"Check-in Ena (sortie Ena IC puis rte 68, 25 min)", maps:"3960 Nakanohōchō Ena"}]},
 {d:"2026-10-21", t:"Trek Nakasendo → ryokan", ph:"Road trip", sleep:"tsuruya",
  alerts:["ARRIVER AU TSURUYA AVANT 18H (dîner kaiseki)","Taxe onsen ¥600 en espèces","Sacs anti-nausée (derniers km sinueux) 🤢"],
  plan:[{w:"08:15",x:"Route → parking Tsumago (~¥500), bus ~9h vers Magome", maps:"Tsumago parking"},
        {w:"09:40",x:"Marche Magome → Tsumago · 8 km · ~3h 🥾", maps:"Magome-juku"},
        {w:"13:00",x:"Soba à Tsumago, flânerie"},
        {w:"14:30",x:"Route → Shirahone Onsen (1h52)", maps:"Tsuruya Shirahone Onsen"},
        {w:"16:30",x:"Onsen laiteux 🤍 puis dîner kaiseki bœuf Shinshu × Hida"}]},
 {d:"2026-10-22", t:"Château de Matsumoto → glamping", ph:"Road trip", sleep:"varie",
  plan:[{w:"matin",x:"Onsen + petit-déj ryokan · 9h15 route (59 min)"},
        {w:"10:30",x:"Château de Matsumoto 🏯 (~1h30) + déjeuner rue Nakamachi", maps:"Matsumoto Castle"},
        {w:"13:00",x:"Route 1h55 · pause possible Oshino Hakkai", maps:"Oshino Hakkai"},
        {w:"15:30",x:"Lac Kawaguchi + télésiège Kachi-Kachi 🗻", maps:"Kachi Kachi Ropeway"},
        {w:"17:00",x:"Check-in dôme · BBQ si commandé · ciel étoilé ✨"}]},
 {d:"2026-10-23", t:"(Chureito) → Gotemba → Hakone", ph:"Road trip", sleep:"hakone",
  alerts:["COURSES À GOTEMBA pour 2 jours (quasi rien à Hakone)","Docs de la villa à télécharger AVANT (réseau faible)"],
  plan:[{w:"07:30",x:"Si ciel dégagé : pagode Chureito (400 marches, LA photo)", maps:"Chureito Pagoda"},
        {w:"11:00",x:"Courses + déjeuner à Gotemba", maps:"Gotemba supermarket"},
        {w:"14:00",x:"Téléphérique Owakudani (œufs noirs 🥚)", maps:"Owakudani"},
        {w:"16:00",x:"Check-in villa → onsen privé 24h/24 🎉", maps:"443-155 Kowakudani Hakone"}]},
 {d:"2026-10-24", t:"Hakone : art & barbotage", ph:"Road trip", sleep:"hakone",
  plan:[{w:"09:00",x:"Open-Air Museum à l'ouverture (Woods of Net, bain de pieds)", maps:"Hakone Open-Air Museum"},
        {w:"14:00",x:"Yunessun : onsen en maillot (bains café, thé, vin)", maps:"Hakone Kowakien Yunessun"},
        {w:"soir",x:"BBQ à la villa (si demandé) + onsen privé"}]},
 {d:"2026-10-25", t:"Skywalk → péninsule d'Izu", ph:"Road trip", sleep:"izu",
  alerts:["Décision météo du matin : Izu Skyline si ciel clair, sinon côte R135"],
  plan:[{w:"09:00",x:"Mishima Skywalk : pont suspendu + tyrolienne 🌉", maps:"Mishima Skywalk"},
        {w:"12:30",x:"Déjeuner unagi à Mishima"},
        {w:"14:00",x:"Izu Skyline (si beau) ou côte est", maps:"Izu Skyline"},
        {w:"16:00",x:"Check-in Kiraboshi no sato · plage si timing OK", maps:"Kiraboshi no sato Ito"}]},
 {d:"2026-10-26", t:"Izu : falaises, volcan, capybaras", ph:"Road trip", sleep:"izu",
  plan:[{w:"09:00",x:"Jōgasaki Coast : falaises + pont suspendu", maps:"Jogasaki Coast"},
        {w:"11:00",x:"Mont Ōmuro : télésiège + tour du cratère", maps:"Mount Omuro"},
        {w:"14:00",x:"Shaboten Zoo : nourrir les capybaras 🦫", maps:"Izu Shaboten Zoo"},
        {w:"16:30",x:"Plage ou cheminée à la maison"}]},
 {d:"2026-10-27", t:"Izu : cascades & plage", ph:"Road trip", sleep:"izu",
  plan:[{w:"09:00",x:"Kawazu Nanadaru : 7 cascades + glace au wasabi 💦", maps:"Kawazu Nanadaru"},
        {w:"14:00",x:"Plage (Usami ou Izu-kōgen) — châteaux de sable", maps:"Usami beach"},
        {w:"soir",x:"Dernière nuit du road trip, onsen"}]},
 {d:"2026-10-28", t:"Izu → Tokyo · fin du road trip", ph:"Road trip", sleep:"tokyo",
  prat:[{t:"🚗 Map Code 647594*83", copy:"647594*83"},{t:"☎ Agence Nihonbashi", tel:"0352202220"}, WIFI_TOKYO],
  alerts:["Dépose famille + valises ~13h à l'Airbnb (à confirmer avec Toshiko, sinon casiers Ueno)",
          "Voiture rendue AVANT 15H — Map Code 647594*83, entrée parking « SHANGRILAHOTEL »"],
  plan:[{w:"10:00",x:"Check-out → route ~3h (R135 → Tōmei → Shuto)"},
        {w:"13:00",x:"Dépose Ikenohata, puis Antoine : essence + restitution Nihonbashi", maps:"Marunouchi Trust Tower parking"},
        {w:"14:30",x:"Retour Ginza Line Nihombashi → Ueno (~10 min)"},
        {w:"aprèm",x:"Parc d'Ueno en douceur, repérage Nezu"}]},
 {d:"2026-10-29", t:"Harry Potter Studio Tour 🪄", ph:"Tokyo", sleep:"tokyo",
  prat:[{t:"🎟️ Order 20261005-788667403", copy:"20261005-788667403"}, WIFI_TOKYO],
  alerts:["RÉSERVÉ : créneau 9h00 — partir ~8h (Toshimaen, ligne Ōedo depuis Ueno-okachimachi ~35 min)"],
  plan:[{w:"09:00",x:"The Making of Harry Potter (3-5h sur place, boutique géante)", maps:"Warner Bros Studio Tour Tokyo"},
        {w:"aprèm",x:"Retour tranquille — détaxe possible dans le quartier (fenêtre −10 % jusqu'au 31 !)"}]},
 {d:"2026-10-30", t:"TeamLab Borderless 💧", ph:"Tokyo", sleep:"tokyo", menu:true, prat:[WIFI_TOKYO],
  alerts:["Créneau 8h30-9h (billets : à confirmer ❓) — Azabudai Hills, Garden Plaza B B1"],
  plan:[{w:"08:30",x:"TeamLab Borderless (~2-3h)", maps:"teamLab Borderless Azabudai Hills"},
        {w:"aprèm",x:"Libre — piocher dans le menu ci-dessous"}]},
 {d:"2026-10-31", t:"Harajuku & Asakusa — Halloween 🎃", ph:"Tokyo", sleep:"tokyo", menu:true, prat:[WIFI_TOKYO],
  alerts:["Éviter Shibuya le soir (foule Halloween)","Dernier jour de détaxe −10 % immédiate en caisse !"],
  plan:[{w:"matin",x:"Disney store + Takeshita-dōri à Harajuku", maps:"Disney Store Harajuku"},
        {w:"aprèm",x:"Asakusa : Senso-ji + Nakamise", maps:"Senso-ji"}]},
 {d:"2026-11-01", t:"Mont Takao ? 🍁", ph:"Tokyo", sleep:"tokyo", menu:true, prat:[WIFI_TOKYO],
  alerts:["Programme à confirmer (sheet : « Mont Takao ? ») — alternative : Kamakura (délogé du 3/11)"],
  plan:[{w:"journée",x:"Mont Takao : train Keiō ~50 min, téléphérique + rando douce, momiji probables", maps:"Mount Takao"}]},
 {d:"2026-11-02", t:"Disneyland si beau 🎢 (sinon le 4)", ph:"Tokyo", sleep:"tokyo", menu:true, prat:[WIFI_TOKYO],
  alerts:["Décision météo la veille au soir : Disneyland aujourd'hui OU mercredi 4 → billets datés sur l'app Tokyo Disney Resort","Lundi « sandwich » entre week-end et férié = parc plus chargé que le mercredi"],
  plan:[{w:"si Disney",x:"Disneyland — journée entière (ouverture ~9h, Keiyō Line depuis Tokyo Station → Maihama ~15 min)", maps:"Tokyo Disneyland"},
        {w:"sinon",x:"Journée légère — piocher dans le menu, derniers achats"}]},
 {d:"2026-11-03", t:"Kichijōji → musée Ghibli 16h 🎬", ph:"Tokyo", sleep:"tokyo", prat:[WIFI_TOKYO],
  alerts:["MUSÉE GHIBLI : entrer entre 16h00 et 16h59 (fermeture 18h) — billets au nom du cousin, on entre ENSEMBLE","Férié (Culture Day) : trains et parc chargés — partir ~10h30","Dîner chez le cousin après le musée"],
  plan:[{w:"~10:30",x:"JR Ueno → Kanda → Chūō Line rapide → Kichijōji (~45 min), sortie Sud « Park Exit »", maps:"Kichijoji Station"},
        {w:"~11:30",x:"Déjeuner côté Nord : Yamamoto no Hamburg (assiette enfant) ou Village Vanguard Diner (menu enfant) ou Cafe Bloomoon (omurice, cash)", maps:"Yamamoto no Hamburg Kichijoji"},
        {w:"~13:00",x:"Parc Inokashira : pédalos cygnes (~¥700/30 min, 2 adultes + 1 enfant par bateau) + aire de jeux", maps:"Inokashira Park boat"},
        {w:"~13:45",x:"Inokashira Park Zoo 🐿️ : Squirrel Trail (écureuils en liberté), cochons d'Inde, manèges rétro ¥100, aire de jeux — ~¥400/adulte, enfants gratuits (vérifier ouverture férié)", maps:"Inokashira Park Zoo"},
        {w:"~15:30",x:"Traversée du parc vers le sud (10-15 min) → musée Ghibli", maps:"Ghibli Museum Mitaka"},
        {w:"16:00",x:"Musée Ghibli 🎬 : catbus (≤12 ans), robot soldat sur le toit, court-métrage Saturn Theater, boutique Mamma Aiuto"},
        {w:"~18:00",x:"→ dîner chez le cousin (lieu à préciser)"}]},
 {d:"2026-11-04", t:"Disneyland si pas fait le 2 🎢 · valises", ph:"Tokyo", sleep:"tokyo", menu:true, prat:[WIFI_TOKYO],
  alerts:["Si Disneyland aujourd'hui : billets datés achetés la veille sur l'app ; valises le soir en rentrant","Pré-pliage des valises, derniers achats (détaxe = remboursement à Haneda désormais : garder les tickets)"],
  plan:[{w:"si Disney",x:"Disneyland — journée entière (ouverture ~9h, Keiyō Line depuis Tokyo Station → Maihama ~15 min)", maps:"Tokyo Disneyland"},
        {w:"sinon",x:"Journée légère — menu, derniers achats, valises"}]},
 {d:"2026-11-05", t:"Dernier jour → vol retour", ph:"Vol", sleep:"avion",
  prat:[{t:"✈️ "+PNR_R, copy:PNR_R}, WIFI_TOKYO],
  alerts:["Check-out 10h — bagages chez Toshiko si OK, sinon consigne Ueno","Départ vers Haneda T3 à 17h max"],
  plan:[{w:"matin",x:"Ueno / Ameyoko en douceur, derniers souvenirs", maps:"Ameyoko"},
        {w:"17:00",x:"→ Haneda T3 (taxi van ou Keisei+monorail, ~40 min)", maps:"Haneda Airport Terminal 3"},
        {w:"21:00",x:"CA422 → Pékin puis CA861 → Genève (arrivée ven 07:05)"}]}
];
// id = clé stable pour l'état « fait » (roadbook-done-v1) ; d = logistique (source : etapes/01-kansai.md & 03-tokyo.md).
const MENUS = {
  "Kyoto":[
    {id:"nara", e:"🦌", x:"Nara : daims + Grand Bouddha + mochi pilés (journée, idéal en semaine)",
      d:"Train direct ~45 min depuis Kyoto. Daims + crackers (gros hit), Tōdai-ji, mochi pilés en spectacle chez Nakatanidou. Idéal en semaine (jeu/ven).", maps:"Nara Park"},
    {id:"arashiyama", e:"🎋", x:"Arashiyama : bambous avant 9h + singes d'Iwatayama + rivière (journée)",
      d:"Bambous AVANT 9h, puis singes d'Iwatayama (montée 20 min, singes en liberté — notre « plan singes »), pont Togetsukyō, barques, glaces.", maps:"Arashiyama Bamboo Grove"},
    {id:"fushimi", e:"⛩️", x:"Fushimi Inari TÔT (7h30) jusqu'au belvédère Yotsutsuji (½ j)",
      d:"Partir TÔT : sur place 7h30-8h. Monter jusqu'au belvédère Yotsutsuji suffit. Combinable avec Tōfuku-ji ou retour par Nishiki.", maps:"Fushimi Inari Taisha"},
    {id:"maison", e:"🏮", x:"Quartier maison : Kiyomizu-dera tôt + Sannenzaka + Gion (½ j, à pied)",
      d:"Tout à pied depuis l'Airbnb. Kiyomizu-dera à l'ouverture + ruelles Sannenzaka/Ninenzaka + Gion. Option yukata pour les filles.", maps:"Kiyomizu-dera"},
    {id:"kinkakuji", e:"✨", x:"Kinkaku-ji (pavillon d'or) + Ryōan-ji (jardin zen) — beau mais foule (½ j)",
      d:"Bus (¥230/trajet, IC card). Beau mais foule ; combinable Ryōan-ji (jardin zen).", maps:"Kinkaku-ji"},
    {id:"nishiki", e:"🍡", x:"Nishiki Market + Teramachi — goûter en marchant (pluie OK)",
      d:"Goûter en marchant, pluie-compatible.", maps:"Nishiki Market"},
    {id:"pluie", e:"🚂", x:"Plan B pluie : Railway Museum ou aquarium",
      d:"Plans B pluie parfaits, à côté de la gare de Kyoto.", maps:"Kyoto Railway Museum"} ],
  "Tokyo":[
    {id:"ghibli", e:"🎬", x:"Musée Ghibli — ✅ fixé mar 3/11 à 16h (voir ce jour)",
      d:"Mitaka. Billets via le cousin (nominatifs → il entre avec nous). Programme complet dans la fiche du 3/11 : Kichijōji, parc Inokashira, zoo aux écureuils, musée 16h, dîner chez le cousin.", maps:"Ghibli Museum Mitaka"},
    {id:"disneysea", e:"🎢", x:"Disneyland — lun 2 ou mer 4/11 selon météo (billets datés)",
      d:"Journée entière. Décision la veille au soir selon la météo ; billets datés sur l'app Tokyo Disney Resort. Lundi 2 = jour sandwich (plus chargé), mercredi 4 = plus calme mais valises le soir.", maps:"Tokyo Disneyland"},
    {id:"teamlab", e:"💧", x:"TeamLab Planets (réserver créneau) (½ j)",
      d:"Pieds dans l'eau, immersif — réserver un créneau en ligne dès que les jours sont fixés. ½ journée.", maps:"teamLab Planets Tokyo"},
    {id:"asakusa", e:"🏮", x:"Asakusa tôt + croisière Sumida (½ j)",
      d:"Senso-ji + Nakamise tôt le matin ; combinable croisière Sumida → Odaiba.", maps:"Senso-ji"},
    {id:"ueno", e:"🐼", x:"Ueno : zoo + musée des sciences (à 10 min à pied !)",
      d:"À 10 min à pied de la maison — zoo (pandas) + musée national des sciences. Parfait jour de récup.", maps:"Ueno Zoo"},
    {id:"shibuya", e:"🗼", x:"Shibuya + Harajuku (crêpes Takeshita) + Meiji-jingū (journée)",
      d:"Scramble & Hachikō, Takeshita-dōri (crêpes = hit filles), Meiji-jingū pour souffler. Journée.", maps:"Shibuya Scramble Crossing"},
    {id:"pokemon", e:"⚡", x:"Pokémon Center + café à thème (résa)",
      d:"Shibuya ou Ikebukuro. Pokémon Café = résa en ligne tôt.", maps:"Pokemon Center Shibuya"},
    {id:"kamakura", e:"🚃", x:"Day trip Kamakura : Grand Bouddha + Enoden + plage (journée)",
      d:"~1h de train. Grand Bouddha, petit train Enoden, plage. Bon dimanche 01/11.", maps:"Kamakura Great Buddha"},
    {id:"yokohama", e:"🍜", x:"Yokohama Cup Noodles Museum — fabriquer son ramen (½ j)",
      d:"~40 min. Fabriquer son propre cup ramen — réserver l'atelier.", maps:"Cup Noodles Museum Yokohama"},
    {id:"shinjuku", e:"🌆", x:"Shinjuku le soir : vue gratuite du Metropolitan Government Building",
      d:"Le soir — vue gratuite depuis le Metropolitan Government Building.", maps:"Tokyo Metropolitan Government Building"} ]
};
const ACHATS = [
  {id:"liseuse", t:"Liseuse", who:"pour notre fille (9 ans)"},   // fiche détaillée → FICHES.liseuse
  {id:"montre", t:"Montre sport", who:"pour Emilie"},            // fiche détaillée → FICHES.montre
  {id:"switch", t:"Switch 2 · accessoires · jeux", who:"famille"},     // fiche détaillée → FICHES.switch
  {id:"airpodsmax", t:"AirPods Max 2", who:"pour Antoine"},         // fiche détaillée → FICHES.airpodsmax
  {id:"souvenirs", t:"Souvenirs filles", who:"les filles", where:"Pokémon Center, Ghibli"},
  {id:"the", t:"Thé / papeterie", note:"à définir"},
];
// Fiches d'achat — source : recherches/achats/liseuse.md & montre.md (relevés du 9 oct. 2026, 1 € ≈ 185 ¥).
// jp = prix JP tax-free (affiché en gros), jpn = remplaçant quand pas de prix JP, fr = prix France.
const FICHES = {
 liseuse:{
  dec:"✅ Kobo Libra Colour — ~195 € tax-free",
  ou:"Bic Camera / Yodobashi, rayon liseuses (電子書籍リーダー) — réf. : 39 960 ¥ TTC sur Bic Camera.com (9 oct.)",
  cands:[
   {m:"Kobo Libra Colour", s:"7″ Kaleido 3 couleur · 32 Go · ~200 g · EPUB/MOBI/CBZ/CBR/PDF · IPX8 · boutons · interface plus simple que PocketBook (à tester en démo)", jp:"~36 300 ¥", eur:"≈ 195 € tax-free", fr:"FR : 269,99 €", v:"LE choix", k:"ok"},
   {m:"Option 0 — pas de liseuse, un bel étui", s:"Si les Paperwhite font le job : étui qu'elle choisit (+ un pour sa sœur). Coque « Paperwhite 2012-2017 » Amazon ~15-25 €, ou pochette tissu 6″ achetée au Japon (Loft, Tokyu Hands, Nippori)", jpn:"~15-30 €", fr:"", v:"Alternative", k:"mid"},
   {m:"PocketBook InkPad 4 / InkPad Color 3", s:"Essayées en magasin le 10/10 : couleur sympa sur la Color 3, mais interface PocketBook laborieuse (même logiciel sur les deux)", jpn:"non vendues au Japon", fr:"FR : 270 € / 329 €", v:"Éliminées", k:"no"} ],
  check:[
   {id:"liseuse-taxfree", t:"Tax-free (免税) avec passeport, prix ≤ 40 000 ¥ TTC — sinon comparer Bic / Yodobashi / Rakuten"},
   {id:"liseuse-coque", t:"Prendre une coque (SleepCover ou tierce) — la liseuse vivra dans un sac d'école"},
   {id:"liseuse-compte-fr", t:"Le soir au Wi-Fi : compte Kobo français (kobo.com/fr) → interface + boutique FR, vérifier avant de quitter le Japon"},
   {id:"liseuse-facture", t:"Garder la facture tax-free (contrôle douane possible à la sortie)"} ],
  risk:"Garantie valable au Japon uniquement — risque accepté (Kobo fiables, IPX8 + coque). Contenu couleur : BD couleur de la boutique Kobo FR + nos CBZ via KCC (profil Kobo Libra Colour). Plan B si pas achetée : Black Friday FR (~210-230 €) ou option 0. Étude complète : recherches/achats/liseuse.md."
 },
 montre:{
  dec:"🔸 Duel : Garmin FR265S (France, Black Friday) vs Coros Pace 4 Black Crystal (JP ~211 €) · plan B Apple Watch S12",
  arb:[
   "Profil Emilie : heure + sport, zéro fonction connectée, veut plus fiable que la Vivoactive 4S et discret → FR570 écartée (micro/HP, Pay, lunette métal inutiles).",
   "Discrétion + continuité Garmin Connect priment → FR265S en FRANCE au Black Friday (visée < 300 €). Ne PAS l'acheter au Japon : ~278 € tax-free seulement + risques langue/garantie.",
   "Le prix prime et le look sport passe → Coros Pace 4 au Japon : Black Crystal (lunette alu, moins « plastique ») ~211 € tax-free, standard ~178 €. Nouveau compte, historique Garmin perdu.",
   "Changement d'avis sur le look → Apple Watch Series 12 42 mm GPS (~353 € tax-free) — mais GPS monofréquence + recharge quotidienne." ],
  ou:"Coros : Step Sports / Art Sports / Bic / Yodobashi (tax-free à vérifier) · Apple : Apple Store / Bic / Yodobashi · Garmin : rayon スマートウォッチ (seulement pour relever le prix 265S)",
  cands:[
   {m:"Garmin Forerunner 265S", s:"41,7 mm · 39 g · multibande · 15 j / 24 h GPS · piscine + eau libre · notifs, Pay, musique · Garmin Connect conservé", jpn:"JP ~56 500 ¥ (≈ 278 € HT) → sans intérêt", fr:"FR : 399 € courant · Black Friday visé < 300 €", v:"Choix n°1 si France", k:"ok"},
   {m:"Coros Pace 4 Black Crystal", s:"43,4 mm · 32 g (nylon) · multibande · 19 j / 41 h GPS · lunette alu noir mat · notifs texte, pas de paiement", jp:"~39 000 ¥", eur:"≈ 211 € tax-free · standard ~33 000 ¥ ≈ 178 €", fr:"FR : 289 € (standard 269 €)", v:"Choix n°1 si Japon", k:"ok"},
   {m:"Apple Watch Series 12 — 42 mm alu GPS", s:"GPS monofréquence · ~24 h (recharge quotidienne) · piscine + eau libre · le plus connecté (iPhone obligatoire)", jp:"~65 300 ¥", eur:"≈ 353 € tax-free", fr:"FR : 449 €", v:"Plan B look", k:"mid"} ],
  check:[
   {id:"montre-taxfree-shop", t:"Coros : réf. Black Crystal 42 900 ¥ TTC (~39 000 ¥ HT) / standard 36 300 ¥ — vérifier que le magasin fait le tax-free (免税)"},
   {id:"montre-bracelet", t:"Coros : bracelet nylon (32 g) ou silicone (40 g, mieux en piscine) — 22 mm standard ; surveiller l'attache (peut se défaire en natation)"},
   {id:"montre-langue-fr", t:"Garmin : décision = achat en France. Si quand même tentée au Japon : test démo OBLIGATOIRE Système > Langue (言語) → « Français », sinon NE PAS acheter"},
   {id:"montre-apple-gps", t:"Apple Watch (plan B) : modèle GPS, pas cellulaire (garantie internationale OK sur GPS) ; 42 mm 71 800 ¥ TTC"},
   {id:"montre-facture", t:"Garder la facture tax-free (douane à la sortie)"} ],
  risk:"Coros : firmware mondial, français inclus, risques faibles. Garmin au Japon : garantie régionale + langue non garantie → achat France. Écartées : FR570 (fonctions inutiles), Venu 4, Apple Watch SE 3. Étude complète : recherches/achats/montre.md."
 },
 airpodsmax:{
  dec:"🔸 Oui/non : JP ~461 € hors taxe (taux 177) vs FR −15 % employé = 492 € → gain 30-50 € seulement",
  arb:[
   "Référence à battre : Apple FR 579 € − 15 % (rabais employé) = 492 €. Prix FR inchangé depuis avril.",
   "Japon : 89 800 ¥ TTC (hausse JP du 18/07 = AirPods 4 / Pro 3 seulement, Max 2 inchangés) → 81 636 ¥ hors taxe = 461 € à 177 ¥/€, 441 € à 185.",
   "RÈGLE : convertisseur ci-dessus, entrer 81636 + taux du jour. ≤ 455 € (taux ≥ ~180) → achat JP défendable. > 460 € (taux < 178) → acheter en France à −15 %.",
   "Ce qu'on perd au Japon : la garantie légale 2 ans (reste 1 an Apple mondial) ; + ~1 % de change si plafond Revolut dépassé (la voiture l'a déjà consommé)." ],
  ou:"Apple Store Ginza / Marunouchi / Omotesando (tax-free en caisse, passeport) ou Bic Camera / Yodobashi (même 89 800 ¥) — acheter entre le 28 et le 31/10 (détaxe immédiate)",
  cands:[
   {m:"AirPods Max 2", s:"Modèle mondial identique (USB-C, 5 couleurs, firmware mondial, français) · 1 an de garantie Apple internationale", jp:"~81 600 ¥", eur:"≈ 461 € hors taxe à 177 ¥/€ (441 € à 185)", fr:"FR : 579 € · −15 % employé = 492 € · Amazon/Rakuten 529 €", v:"Gain 30-50 €", k:"mid"} ],
  check:[
   {id:"airpods-taux", t:"Convertisseur : 81636 ¥ au taux du jour (app bancaire) → ≤ 455 € = oui, > 460 € = non"},
   {id:"airpods-prix", t:"Vérifier l'étiquette : 89 800 ¥ TTC (si plus → hausse récente, recalculer)"},
   {id:"airpods-taxfree", t:"Tax-free (免税) avec passeport original, avant le 31/10 ; après = remboursement à Haneda le 5/11"},
   {id:"airpods-carte", t:"Payer avec la carte la moins chère en change ce jour-là (Revolut : plafond mensuel + majoration week-end)"},
   {id:"airpods-facture", t:"Pas de gravure (délai) · garder la facture tax-free pour la douane"} ],
  risk:"Évènement Apple le 13/10 : re-vérifier les prix avant le 28/10 si annonce casque. Rabais employé 15 % à confirmer avec la connaissance (conditions, plafond). Étude : recherches/achats/airpods-max.md."
 },
 switch:{
  dec:"❌ Console : non (multilingue = en ligne JP seulement) · ✅ Manettes & cartouches Nintendo : ~51 € vs 90 € FR",
  arb:[
   "Console : la version japonaise (59 980 ¥) est VERROUILLÉE (japonais seul, comptes JP). La multilingue (69 980 ¥) n'est vendue qu'en ligne sur le My Nintendo Store JP (compte + adresse JP, 50 h de jeu exigées) → inaccessible, et sans tax-free. Console = en France (499,99 €, promos ~420 €).",
   "Accessoires : matériel mondial identique, Bluetooth, pas de zone. −40 % hors taxe. ⚠️ Sans Switch 2 à la maison, seul le Pro Controller 2 sert tout de suite (OK sur Switch 1). Joy-Con 2 / caméra = Switch 2 uniquement → pari sur un achat futur.",
   "Jeux : cartouches Switch 2 non zonées. Les jeux NINTENDO sont multilingues (Mario Kart World JP = 12 langues dont français, vérifié). Jeux tiers : souvent JP/EN seulement, et attention aux « Game-Key Card » (carte vide + téléchargement) → éviter." ],
  ou:"Nintendo KYOTO (Takashimaya, Shijō-Kawaramachi, 15 min de l'Airbnb — tax-free) · Nintendo TOKYO (Shibuya Parco) · Bic Camera / Yodobashi rayon ゲーム — grouper ≥ 5 000 ¥ dans le même magasin le même jour",
  cands:[
   {m:"Pro Controller 2", s:"Marche aussi sur la Switch 1 (Bluetooth, sans bouton C) → utile tout de suite", jp:"~9 070 ¥", eur:"≈ 51 € hors taxe (49 € à 185)", fr:"FR : 89,99 € (promos ~70 €)", v:"−39 €", k:"ok"},
   {m:"Mario Kart World (cartouche JP)", s:"12 langues dont français (fiche JP vérifiée) · Switch 2 uniquement", jp:"~9 070 ¥", eur:"≈ 51 € hors taxe", fr:"FR : 89,99 €", v:"−39 €", k:"ok"},
   {m:"Joy-Con 2 (paire)", s:"Switch 2 uniquement — ne marche PAS sur la Switch 1", jp:"~9 070 ¥", eur:"≈ 51 € hors taxe", fr:"FR : 89,99 €", v:"−39 € si Switch 2", k:"mid"},
   {m:"Caméra Switch 2", s:"Switch 2 uniquement (GameChat)", jp:"~5 440 ¥", eur:"≈ 31 € hors taxe", fr:"FR : 59,99 €", v:"−29 € si Switch 2", k:"mid"},
   {m:"Jeux Switch 1 Nintendo (cartouches JP)", s:"Marchent sur Switch 1 et 2 · jeux Nintendo multilingues (lire 対応言語 au dos : フランス語)", jp:"~5 500-5 900 ¥", eur:"≈ 31-33 € hors taxe", fr:"FR : 50-60 €", v:"−20 à −25 €", k:"ok"},
   {m:"Console Switch 2", s:"JP verrouillée 59 980 ¥ · multilingue 69 980 ¥ en ligne JP seulement", jpn:"inaccessible / verrouillée", fr:"FR : 499,99 € (promos ~420 €)", v:"Non", k:"no"} ],
  check:[
   {id:"switch-prix", t:"Étiquettes : Pro Controller / Joy-Con 2 / Mario Kart World = 9 980 ¥ TTC (si plus cher → hausse, recalculer)"},
   {id:"switch-langue", t:"Jeu : au dos de la boîte, 対応言語 contient フランス語 ; pas de mention ゲームキーカード (Game-Key Card)"},
   {id:"switch-grouper", t:"Tout dans le même magasin le même jour (seuil tax-free 5 000 ¥), passeport original, avant le 31/10"},
   {id:"switch-pas-console", t:"Pas de console japonaise, même en promo (verrouillée japonais / comptes JP)"},
   {id:"switch-facture", t:"Garder les factures tax-free pour la douane"} ],
  risk:"SAV Nintendo au Japon uniquement (risque faible sur manettes/jeux). Joy-Con 2 et caméra ne servent à rien sans Switch 2 : ne les prendre que si la console (achat FR) est décidée. Étude : recherches/achats/switch-2.md."
 }
};
const CODES = [
  {k:"✈️ Vol aller · mar 13/10 13:20 GVA→KIX", s:"Air China (conf. "+CONF_A+")", v:PNR_A},
  {k:"✈️ Vol retour · jeu 05/11 21:00 HND→GVA", s:"Air China (conf. "+CONF_R+")", v:PNR_R},
  {k:"🚗 Voiture Toyota 20→28/10", s:"clé eXJTMZ7U · ¥152 130 au comptoir", v:"RC52461258775729685"},
  {k:"🏠 Kyoto 14→20/10", s:"Airbnb RESI STAY", v:"HMFWCZNFCN"},
  {k:"🏠 Ena 20→21/10", s:"Airbnb Aya & Fabrizzio", v:"HMCNFT5PBD"},
  {k:"♨️ Tsuruya 21→22/10", s:"tripla · ☎ 0263-93-2331", v:"T9570D4453533"},
  {k:"⛺ Varie 22→23/10", s:"Booking · code PIN 5622 · ☎ 050-5369-5536", v:"6646658732"},
  {k:"🏠 Hakone 23→25/10", s:"Airbnb GranGiorno", v:"HMZ88PZJ33"},
  {k:"🏠 Izu 25→28/10", s:"Airbnb · ☎ 050-1720-3760", v:"HM2P3BHZ4Y"},
  {k:"🏠 Tokyo 28/10→05/11", s:"Airbnb Toshiko", v:"HMB8ADK8TP"},
  {k:"📶 Wifi Tokyo", s:"THS House", v:"THS5911 / 12ry4in6"},
  {k:"🅿️ Map Code restitution voiture", s:"Trust Tower B2 « SHANGRILAHOTEL »", v:"647594*83"},
];
const INFOS = [
  {h:"🚨 Urgences", rows:[["Police","110"],["Pompiers / SAMU","119"],["Ambassade de France (Tokyo)","+81357986000"]]},
  {h:"🚗 Voiture Toyota", rows:[["Agence Nagoya (prise 20/10 9h)","0524520100"],["Agence Nihonbashi (retour 28/10 <15h)","0352202220"],["Centre de résa Toyota","08007000111"]]},
  {h:"🏠 Hébergements", rows:[["Tsuruya (ryokan)","0263932331"],["Glamping Varie","05053695536"],["Kiraboshi (centre d'ops 8h-20h)","05017203760"]]},
  {h:"💴 À ne pas oublier", list:["Cash : taxe onsen (¥150/pers = ¥600), bus Tsumago→Magome (horaires à vérifier la veille), parking Tsumago ~¥500",
    "Péages = carte ETC, soldés à la restitution Nihonbashi",
    "Permis FR + traduction JAF + passeports → sur soi le 20/10",
    "Enfants : demi-tarif trains 6-11 ans"]},
];
// Taux ¥→€ par défaut de la calculette (l'utilisateur peut le changer dans l'app ; persisté en localStorage).
const TAUX_DEFAUT = 185;
// Note « détaxe » affichée en bas de l'onglet Achats (HTML simple autorisé : <b>, <br>).
const DETAXE_NOTE = "⚠️ Détaxe : −10 % immédiat en caisse <b>jusqu'au 31/10 inclus</b> (passeport, min ¥5 000 HT/magasin/jour).<br>Dès le 1/11 : on paie plein tarif, remboursement aux bornes douane de Haneda avant le check-in (garder les tickets, arriver en avance le 5/11).<br>→ Fenêtre en or : <b>28→31 octobre</b> (Akihabara/Yodobashi dès l'arrivée à Tokyo).";
// Rappels « Avant le départ » (carte affichée tant qu'on est avant DAYS[0].d) — une chaîne = une ligne.
const PREDEP = [
  "Check-in Air China en ligne — ~lun 12/10",
  "Billets musée Ghibli — verdict cousin dim 11/10",
  "Messages aux hôtes à envoyer (heures d'arrivée)",
  "Héberger + installer le roadbook sur les 2 iPhones",
  "🚲 Réserver vélos + sièges enfants pour Kyoto"
];
