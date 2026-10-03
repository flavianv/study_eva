// Chemistry section of Eva's notes: two courses (Dissolution et dilution · Dosage par étalonnage) built on the
// quantité-de-matière formula sheet. Static pages are generated here; interactive pages live in ../Chimie/*.html.
// Every number printed in the worked solutions is computed here with the same helpers the interactive pages use.
import {pathToFileURL} from "node:url";

export default async function ({page, table, V, T, fs, path, ROOT, HERE, OUT, SITE, rows}) {
  const SRC = path.join(ROOT, "Chimie");
  await import(pathToFileURL(path.join(SRC, "chimie.js")).href);
  const CH = globalThis.CH, f = (x, s = 3) => CH.fmt(x, s), e = (x, s = 3) => CH.sci(x, s), sp = CH.sp;
  for (const file of ["chimie.js", "chimie_quiz.js", "chimie.css", "chimie_map.css"]) fs.copyFileSync(path.join(SRC, file), path.join(OUT, file));
  fs.appendFileSync(path.join(OUT, "site.css"), "\n" + fs.readFileSync(path.join(SRC, "chimie_map.css"), "utf8"));

  // ---------- reading order ----------
  const A = [   // [file, title, description, kind, label]
    ["chimie_formules.html", "Quantité de matière : la carte des formules", "Eight quantities, one hub: n. Every formula of the sheet, with units and a mini example each.", "read", "Fiche"],
    ["carte_formules.html", "La carte des conversions", "Pick a species and one known quantity: all the others are computed along a highlighted path.", "play", "Interactif"],
    ["labo_formules.html", "Le labo des formules", "Six small experiments: density, moles, N_A, concentration, C_m = C·M, gases.", "play", "Interactif"],
    ["chimie_exemples.html", "Exemples corrigés : les formules", "Sugar cube, glass of ethanol, balloons, mineral water, copper wire. Step by step.", "sol", "Corrigé"],
    ["dissolution_dilution.html", "Dissolution et dilution : le cours", "Make a solution from a solid, dilute it, and know which glassware to use.", "read", "Fiche"],
    ["labo_dilution.html", "Labo : dissoudre et diluer", "The five dissolution steps, and a dilution where n visibly does not change.", "play", "Interactif"],
    ["dilution_exemples.html", "Exemples corrigés : dissolution et dilution", "Seven worked problems, from weighing NaCl to a two-step dilution.", "sol", "Corrigé"],
    ["sujet_truffe_1.html", "Sujet truffe, partie 1 : calcaire et préparation de S₃", "Exam problem: limestone from a gas volume, and how to prepare S₃ from S₀. Full solution.", "sol", "Corrigé"],
    ["entrainement_solutions.html", "Entraînement : formules, dissolution, dilution", "Random questions with hints and a step-by-step solution for each.", "play", "Interactif"],
  ];
  const B = [
    ["dosage_cours.html", "Dosage par étalonnage : le cours", "Standards, Beer–Lambert, the calibration line and how to read an unknown from it.", "read", "Fiche"],
    ["labo_etalonnage.html", "Labo : courbe d'étalonnage", "Build a gamme étalon, measure, fit the line, find an unknown. Includes the truffe data.", "play", "Interactif"],
    ["dosage_exemples.html", "Exemples corrigés : dosage", "Spectrophotometry, a sample that must be diluted, and a conductimetry dosage.", "sol", "Corrigé"],
    ["sujet_truffe_2.html", "Sujet truffe, partie 2 : le cuivre du sol", "Exam problem: eight questions from wavelength to the final conclusion. Full solution.", "sol", "Corrigé"],
    ["sujet_boisson.html", "Sujet boisson bleue : le colorant E133", "Lab sheet: dose brilliant blue in an energy drink, question by question, with the marathon-runner conclusion.", "sol", "Corrigé"],
    ["entrainement_dosage.html", "Entraînement : dosage par étalonnage", "Random questions with hints and a step-by-step solution for each.", "play", "Interactif"],
  ];
  const X = [["exercices_chimie.html", "Exercices : le gâteau et autres problèmes", "Six problems in the style of your cake sheet: yeast and gas, lemonade, syrup, saline, helium, a dosage. Solutions hidden.", "sol", "Exercices"]];
  const ORDER = [...A, ...B, ...X].map(r => r[0]), TITLE = Object.fromEntries([...A, ...B, ...X].map(r => [r[0], r[1]]));
  const STATIC = new Set([...A, ...B, ...X].filter(r => r[3] !== "play").map(r => r[0]));
  const L = (file, lang) => lang === "fr" && STATIC.has(file) ? file.replace(".html", "_fr.html") : file;
  const nav = (file, lang) => { const i = ORDER.indexOf(file), g = k => [L(ORDER[k], lang), TITLE[ORDER[k]]];
    return {prev: i > 0 ? g(i - 1) : undefined, next: i < ORDER.length - 1 ? g(i + 1) : undefined}; };

  // ---------- interactive pages (already in French; "next" leads to the French written pages) ----------
  const wrapInteractive = file => {
    let src = fs.readFileSync(path.join(SRC, file), "utf8");
    const {next} = nav(file, "fr");
    const bar = `<nav style="max-width:1040px;margin:0 auto 14px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font:600 .85rem 'Barlow Semi Condensed',system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase">
<a href="home.html" style="color:var(--accent);text-decoration:none">← ${SITE}</a>${next ? `<a href="${next[0]}" style="color:var(--accent);text-decoration:none">${next[1]} →</a>` : ""}</nav>`;
    src = src.replace('<div class="wrap">', bar + '\n<div class="wrap">');
    fs.writeFileSync(path.join(OUT, file), `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head><body>\n${src}\n</body></html>`);
  };
  for (const r of [...A, ...B]) if (r[3] === "play") wrapInteractive(r[0]);

  // ---------- written pages, one generator per language ----------
  const steps = list => `<ol class="steps">${list.map(([why, calc]) => `<li><div><span class="why">${why}</span>${calc}</div></li>`).join("")}</ol>`;
  const mapBlock = `<div class="mapw">${CH.mapSVG()}</div>`;
  const {default: numbers} = await import("./chimie_numbers.mjs");
  const {default: pagesEN} = await import("./chimie_en.mjs");
  const {default: pagesFR} = await import("./chimie_fr.mjs");
  const {default: exEN} = await import("./chimie_ex_en.mjs");
  const {default: exFR} = await import("./chimie_ex_fr.mjs");
  for (const [lang, gen, genEx] of [["en", pagesEN, exEN], ["fr", pagesFR, exFR]]) {
    CH.dec = lang === "fr" ? "," : ".";                       // decimal mark of the page being generated
    const route = lang === "fr" ? "Chemin sur la carte :" : "Path on the map:";
    const ex = (title, given, rt, sol, ans) => `<section class="ex"><h2>${title}</h2><p class="givens">${given}</p>${rt ? `<p class="path">${route} ${rt}</p>` : ""}${steps(sol)}${ans ? `<span class="ans">${ans}</span>` : ""}</section>`;
    const pg = (file, o) => {
      const twin = lang === "fr" ? file : L(file, "fr"), sw = lang === "fr" ? `<a href="${file}">English</a>` : `<a href="${twin}">Français</a>`;
      page(L(file, lang), {...o, eyebrow: `${o.eyebrow} · ${sw}`, ...nav(file, lang)});
    };
    const ctx = {pg, table, steps, ex, mapBlock, f: (x, s = 3) => CH.fmt(x, s), e: (x, s = 3) => CH.sci(x, s), CH, num: numbers(CH), L: file => L(file, lang)};
    gen(ctx); genEx(ctx);
  }
  CH.dec = ".";

  const home = `<section><div class="sec-head"><h2>Chimie : dissolution et dilution</h2><span class="muted">Quantité de matière, concentrations, fabriquer et diluer une solution</span></div><div class="toc">${rows(A, 11)}</div></section>
<section><div class="sec-head"><h2>Chimie : dosage par étalonnage</h2><span class="muted">Gamme étalon, Beer–Lambert, courbe d'étalonnage, sujet truffe</span></div><div class="toc">${rows(B, 11 + A.length)}</div></section>
<section><div class="sec-head"><h2>Chimie : exercices</h2><span class="muted">Problèmes dans le style des sujets, corrigés masqués</span></div><div class="toc">${rows(X, 11 + A.length + B.length)}</div></section>
<p class="muted">Les fiches, exemples corrigés et sujets existent aussi <b>en français</b> : bouton « Français » en haut de chaque page.</p>`;
  return {home};
}
