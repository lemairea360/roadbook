#!/usr/bin/env node
// Rend une page HTML en PNG à la taille de la photo originale.
//   node render.js page.html sortie.png [largeur hauteur]
//   node render.js --size photo.jpg          → affiche "largeur hauteur"
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const [a, b, w, h] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  if (a === '--size') {
    await page.goto('file://' + path.resolve(b));
    const [W, H] = await page.evaluate(() => { const i = document.querySelector('img'); return [i.naturalWidth, i.naturalHeight]; });
    console.log(W, H);
    await browser.close();
    return;
  }
  if (!a || !b) { console.error('usage: node render.js page.html sortie.png [largeur hauteur]'); process.exit(1); }
  await page.goto('file://' + path.resolve(a));
  let W = Number(w), H = Number(h);
  if (!W || !H) [W, H] = await page.evaluate(() => { const s = getComputedStyle(document.body); return [parseInt(s.width), parseInt(s.height)]; });
  await page.setViewportSize({ width: W, height: H });
  await page.waitForTimeout(300);
  await page.screenshot({ path: b, clip: { x: 0, y: 0, width: W, height: H } });
  await browser.close();
  console.log(`${b} (${W}x${H})`);
})();
