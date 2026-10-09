// Vérification de data.js avant un push (voir GUIDE.md) :
//   node verifie-data.js
// 1. data.js s'évalue sans erreur (syntaxe + exécution) ;
// 2. chaque day.sleep existe dans SLEEPS ;
// 3. les dates de DAYS sont continues (un jour = J-1 + 1) ;
// 4. les id des MENUS/ACHATS/checklists sont uniques (clés de l'état localStorage).
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const sandbox = { atob: (s) => Buffer.from(s, "base64").toString("binary") };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, "data.js"), "utf8"), sandbox, { filename: "data.js" });

// Les const top-level d'un script vm vivent dans l'environnement lexical du contexte,
// pas sur l'objet sandbox → on les lit via une expression évaluée dans le contexte.
const { SLEEPS, DAYS, MENUS, ACHATS, FICHES } =
  vm.runInContext("({ SLEEPS, DAYS, MENUS, ACHATS, FICHES })", sandbox);
let err = 0;
const ko = (msg) => { console.error("✗ " + msg); err++; };

if (!SLEEPS || !DAYS || !MENUS || !ACHATS || !FICHES) ko("constante manquante (SLEEPS/DAYS/MENUS/ACHATS/FICHES)");

for (const d of DAYS || []) {
  if (!SLEEPS[d.sleep]) ko(`jour ${d.d} : sleep « ${d.sleep} » absent de SLEEPS`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.d)) ko(`jour « ${d.d} » : date mal formée (attendu AAAA-MM-JJ)`);
}
for (let i = 1; i < (DAYS || []).length; i++) {
  const prev = new Date(DAYS[i - 1].d + "T12:00:00"), next = new Date(DAYS[i].d + "T12:00:00");
  if (Math.round((next - prev) / 864e5) !== 1) ko(`dates non continues : ${DAYS[i - 1].d} → ${DAYS[i].d}`);
}
const seen = new Set();
const uniq = (id, ctx) => { if (seen.has(id)) ko(`id en double « ${id} » (${ctx})`); seen.add(id); };
for (const [ph, opts] of Object.entries(MENUS || {})) for (const o of opts) uniq(o.id, "MENUS " + ph);
for (const a of ACHATS || []) uniq(a.id, "ACHATS");
for (const [k, f] of Object.entries(FICHES || {})) for (const c of f.check || []) uniq(c.id, "FICHES." + k + ".check");

if (err) { console.error(`\n${err} erreur(s) — NE PAS pousser.`); process.exit(1); }
console.log(`✓ data.js OK — ${DAYS.length} jours (${DAYS[0].d} → ${DAYS[DAYS.length - 1].d}), ${Object.keys(SLEEPS).length} logements.`);
