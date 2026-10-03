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
    ["entrainement_dosage.html", "Entraînement : dosage par étalonnage", "Random questions with hints and a step-by-step solution for each.", "play", "Interactif"],
  ];
  const ORDER = [...A, ...B].map(r => r[0]), TITLE = Object.fromEntries([...A, ...B].map(r => [r[0], r[1]]));
  const nav = file => { const i = ORDER.indexOf(file); return {prev: i > 0 ? [ORDER[i - 1], TITLE[ORDER[i - 1]]] : undefined, next: i < ORDER.length - 1 ? [ORDER[i + 1], TITLE[ORDER[i + 1]]] : undefined}; };

  // ---------- interactive pages ----------
  const wrapInteractive = file => {
    let src = fs.readFileSync(path.join(SRC, file), "utf8");
    const {next} = nav(file);
    const bar = `<nav style="max-width:1040px;margin:0 auto 14px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font:600 .85rem 'Barlow Semi Condensed',system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase">
<a href="home.html" style="color:var(--accent);text-decoration:none">← ${SITE}</a>${next ? `<a href="${next[0]}" style="color:var(--accent);text-decoration:none">${next[1]} →</a>` : ""}</nav>`;
    src = src.replace('<div class="wrap">', bar + '\n<div class="wrap">');
    fs.writeFileSync(path.join(OUT, file), `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head><body>\n${src}\n</body></html>`);
  };
  for (const r of [...A, ...B]) if (r[3] === "play") wrapInteractive(r[0]);

  // ---------- helpers for static pages ----------
  const steps = list => `<ol class="steps">${list.map(([why, calc]) => `<li><div><span class="why">${why}</span>${calc}</div></li>`).join("")}</ol>`;
  const sub = (b, s) => `${b}<sub>${s}</sub>`;
  const ex = (title, given, route, sol, ans) => `<section class="ex"><h2>${title}</h2><p class="givens">${given}</p>${route ? `<p class="path">Path on the map: ${route}</p>` : ""}${steps(sol)}${ans ? `<span class="ans">${ans}</span>` : ""}</section>`;
  const mapBlock = `<div class="mapw">${CH.mapSVG()}</div>`;
  const pg = (file, o) => page(file, {...o, ...nav(file)});

  // ============================================================ COURSE A
  // ---------- 1. the formula map ----------
  const n36 = 36 / 18, V50 = .050, m50 = 789 * V50, nSalt = 5.85 / 58.5;
  pg("chimie_formules.html", {title: "Quantité de matière : la carte des formules", eyebrow: "Chimie · Cours 1 · Fiche",
    lede: "Eight quantities, one hub. Anything you weigh, measure in a flask or count can be turned into a number of moles n, and from n into anything else. This page is the foundation of both chemistry courses.",
    body: `<section><h2>1 · Why a mole?</h2>
<p>Atoms and molecules are far too small to count one by one: a single drop of water holds about 10²¹ molecules. So chemists count in <b>packets</b>. One mole is a packet of N<sub>A</sub> = 6.02×10²³ entities (atoms, molecules, ions), the way a dozen is a packet of 12.</p>
<p>The trick that makes it useful: one mole of any substance weighs its <b>molar mass M</b> in grams. Counting becomes weighing.</p></section>
<section><h2>2 · The map</h2>
${mapBlock}
<ul style="margin-top:12px"><li>Each <b>box</b> is a quantity, with its symbol and unit. Each <b>arrow</b> is a conversion; the letter on it is the number you multiply or divide by.</li>
<li><b>n is the hub.</b> To go from any box to any other, go through n. Never try to jump from m to N, or from V to m, in one move.</li>
<li>The top row is about the <b>pure species</b> (what you weigh or measure). The bottom row is about the <b>solution</b> it is dissolved in; V<sub>sol</sub> (dashed) is the volume of that solution.</li>
<li>ρ, M and the other constants belong to the species, not to your sample: you look them up or the exercise gives them.</li></ul>
<p>Try it live: <a href="carte_formules.html">La carte des conversions</a>.</p></section>
<section><h2>3 · All the formulas</h2>
${table(["Link", "Formula", "Constant", "Unit check"], [
  ["V<sub>esp</sub> ↔ m", "ρ = m / V<sub>esp</sub>", "ρ in g/L (species)", "g/L × L = g"],
  ["m ↔ n", "M = m / n  ⇒  n = m / M", "M in g/mol (species)", "g ÷ g/mol = mol"],
  ["n ↔ N", "N = n × N<sub>A</sub>  ⇒  n = N / N<sub>A</sub>", "N<sub>A</sub> = 6.02×10²³ mol⁻¹", "mol × mol⁻¹ = a number"],
  ["n ↔ V<sub>gaz</sub>", "n = V / V<sub>m</sub>", "V<sub>m</sub> = 24.0 L/mol (20 °C, 1 bar)", "L ÷ L/mol = mol"],
  ["m → C<sub>m</sub>", "C<sub>m</sub> = m / V<sub>sol</sub>", "none", "g ÷ L = g/L"],
  ["n → C", "C = n / V<sub>sol</sub>", "none", "mol ÷ L = mol/L"],
  ["C ↔ C<sub>m</sub>", "C<sub>m</sub> = C × M", "M", "mol/L × g/mol = g/L"]])}
<p class="muted">The unit check is your safety net: if the units on the right do not give the unit on the left, the formula is upside down.</p></section>
<section><h2>4 · One link at a time</h2>
<h3 class="fm">ρ = m / V<sub>esp</sub> · masse volumique</h3>
<p>“How much does one litre of the species weigh?” Water: 1000 g/L (= 1.00 g/mL). Ethanol: 789 g/L. It lets you go from a <b>volume of liquid or solid</b> to its mass, and back.</p>
${steps([["50 mL of ethanol: convert first, 1 L = 1000 mL.", "V = 50 mL = 0.050 L"], ["m = ρ × V.", `m = 789 × 0.050 = <b>${f(m50)} g</b>`]])}
<div class="key warn"><p><b>Trap:</b> ρ in g/mL vs g/L. 0.789 g/mL = 789 g/L. And always convert mL to L before you multiply.</p></div>
<h3 class="fm">M = m / n · masse molaire</h3>
<p>The mass of one mole, in g/mol. Read it from the periodic table and add up the atoms of the formula: M(H<sub>2</sub>O) = 2×1.0 + 16.0 = 18.0 g/mol; M(CO<sub>2</sub>) = 12.0 + 2×16.0 = 44.0 g/mol.</p>
${steps([["How many moles are in 36 g of water? n = m / M.", `n = 36 / 18.0 = <b>${f(n36)} mol</b>`]])}
<p class="muted">Triangle trick: put m on top, n and M below. Cover the one you want: m = n × M, n = m / M, M = m / n.</p>
<h3 class="fm">N = n × N<sub>A</sub> · nombre d'entités</h3>
<p>N counts the entities themselves (atoms, molecules or ions). Your note on units says it well: <b>atoms = mol × atoms/mol</b>. N<sub>A</sub> is the “atoms per mole” factor.</p>
${steps([["0.50 mol of water: how many molecules?", `N = 0.50 × 6.02×10²³ = <b>${e(.5 * CH.NA)}</b>`], ["Each H<sub>2</sub>O has 3 atoms, so atoms = 3 × N.", `${e(3 * .5 * CH.NA)} atoms`]])}
<h3 class="fm">C = n / V<sub>sol</sub> and C<sub>m</sub> = m / V<sub>sol</sub> · concentrations</h3>
<p>Both say “how much solute per litre of <b>solution</b>”: C in moles (mol/L), C<sub>m</sub> in grams (g/L).</p>
${steps([["5.85 g of NaCl (M = 58.5 g/mol) dissolved to make 250 mL of solution. First n.", `n = 5.85 / 58.5 = ${f(nSalt)} mol`], ["V<sub>sol</sub> = 250 mL = 0.250 L.", `C = 0.100 / 0.250 = <b>${f(nSalt / .25)} mol/L</b>`], ["And in grams per litre.", `C<sub>m</sub> = 5.85 / 0.250 = <b>${f(5.85 / .25)} g/L</b>`]])}
<div class="key warn"><p><b>Trap:</b> ρ and C<sub>m</sub> are both in g/L but not the same thing. ρ divides by the volume of the <b>pure species</b> (V<sub>esp</sub>); C<sub>m</sub> divides by the volume of the <b>whole solution</b> (V<sub>sol</sub>).</p></div>
<h3 class="fm">C<sub>m</sub> = C × M · the bridge between the two</h3>
<p>Start from C<sub>m</sub> = m / V and replace m by n × M: C<sub>m</sub> = (n × M) / V = (n / V) × M = C × M. In units: g/L = mol/L × g/mol.</p>
${steps([["From C = 0.100 mol/L: multiply by M.", `C<sub>m</sub> = 0.100 × 58.5 = <b>${f(5.85)} g/L</b> (same as above ✓)`], ["From C<sub>m</sub> to C: divide by M.", `C = 5.85 / 58.5 = ${f(.1)} mol/L`]])}
<h3 class="fm">n = V / V<sub>m</sub> · gases</h3>
<p>In given conditions, one mole of <b>any</b> gas occupies the same volume V<sub>m</sub>. Your sheet: V<sub>m</sub> = 24.0 L/mol at 20 °C and 1 bar. It changes with temperature and pressure (22.4 L/mol at 0 °C and 1 atm), so <b>the exercise gives it to you</b>: always use the given value (the truffe exam uses 24.1 L/mol).</p>
<div class="key"><p>Your question on the sheet, “V: espèce ou solution ?”. <b>Answer: the species.</b> In n = V / V<sub>m</sub>, V is the volume of the <b>gas itself</b>. A gas bubbling out of a reaction is measured in a cylinder: that volume is V. It is never the volume of a solution.</p></div>
${steps([["6.0 L of CO<sub>2</sub> at 20 °C.", `n = 6.0 / 24.0 = ${f(.25)} mol`], ["Then to a mass with M = 44.0 g/mol.", `m = 0.250 × 44.0 = <b>${f(11)} g</b>`], ["A bonus: the density of a gas is M / V<sub>m</sub>.", `ρ(CO₂) = 44.0 / 24.0 = ${f(44 / 24)} g/L`]])}</section>
<section><h2>5 · Method and traps</h2>
<ol><li><b>Write what you know</b>, with its unit, and what is asked.</li><li><b>Find the path</b> on the map from the known box to the asked box, through n.</li><li><b>Convert units first</b> (mL → L, mg → g, kg → g).</li><li><b>Compute step by step</b>, keeping unrounded values in the calculator; round at the end to 3 significant figures.</li><li><b>Check</b> the unit and the order of magnitude.</li></ol>
${table(["Trap", "Fix"], [["mL used as L", "Divide by 1000 before every formula"], ["ρ confused with C<sub>m</sub>", "V<sub>esp</sub> (pure species) vs V<sub>sol</sub> (final solution)"], ["V<sub>m</sub> = 24 L/mol used for a liquid", "V<sub>m</sub> is for gases only"], ["Skipping n", "m, N, V<sub>gaz</sub>, C all connect through n"], ["Forgetting atoms per molecule", "N counts molecules; atoms = N × atoms per molecule"]])}
<p>Next: <a href="carte_formules.html">play with the map</a>, then <a href="labo_formules.html">the lab</a>.</p></section>`});

  // ---------- 2. formula examples ----------
  const sug = {m: 5.0, M: 342}, nSug = sug.m / sug.M, Nsug = nSug * CH.NA;
  const mEt = 789 * .1, nEt = mEt / 46, NEt = nEt * CH.NA;
  const nB = 3 / 24, mCO2 = nB * 44, mO2 = nB * 32, NB = nB * CH.NA;
  const CmCa = .080, CCa = CmCa / 40.1, nCaB = CCa * 1.5, mCaB = CmCa * 1.5;
  const nCu = 12.7 / 63.5, VCu = 12.7 / 8960;
  pg("chimie_exemples.html", {title: "Exemples corrigés : les formules", eyebrow: "Chimie · Cours 1 · Corrigé",
    lede: "Five worked examples that use the whole map. For each one: what is given, the path through n, and every step with its unit.",
    body: `${ex("1 · A sugar cube", "A sugar cube (saccharose, C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) weighs 5.0 g. Data: M(C) = 12.0, M(H) = 1.0, M(O) = 16.0 g/mol. Find M, n, the number of molecules, and the number of carbon atoms.", "m → n → N",
      [["Molar mass from the formula: 12 C, 22 H, 11 O.", `M = 12×12.0 + 22×1.0 + 11×16.0 = ${f(342)} g/mol`], ["Moles: n = m / M.", `n = 5.0 / 342 = <b>${f(nSug)} mol</b>`], ["Molecules: N = n × N<sub>A</sub>. Keep n unrounded in the calculator.", `N = ${f(nSug, 6)} × 6.02×10²³ = <b>${e(Nsug)}</b>`], ["Each molecule has 12 carbon atoms.", `N(C) = 12 × ${e(Nsug)} = <b>${e(12 * Nsug)}</b>`]])}
${ex("2 · A glass of ethanol", "100 mL of liquid ethanol, C<sub>2</sub>H<sub>6</sub>O, ρ = 789 g/L, M = 46.0 g/mol. Find m, n and N. Then the sample is topped up with water to make exactly 0.500 L of solution: find C and C<sub>m</sub>.", "V<sub>esp</sub> → m → n → N, then n → C",
      [["Convert 100 mL to litres.", "V<sub>esp</sub> = 0.100 L"], ["Mass from the density: m = ρ × V<sub>esp</sub>.", `m = 789 × 0.100 = <b>${f(mEt)} g</b>`], ["Moles: n = m / M.", `n = ${f(mEt)} / 46.0 = <b>${f(nEt)} mol</b>`], ["Molecules.", `N = ${f(nEt)} × 6.02×10²³ = <b>${e(NEt)}</b>`], ["In 0.500 L of solution: C = n / V<sub>sol</sub> (the 100 mL of ethanol is <i>not</i> V<sub>sol</sub>).", `C = ${f(nEt)} / 0.500 = <b>${f(nEt / .5)} mol/L</b>`], ["And C<sub>m</sub> = C × M, or m / V<sub>sol</sub>.", `C<sub>m</sub> = ${f(mEt)} / 0.500 = <b>${f(mEt / .5)} g/L</b>`]])}
${ex("3 · Two balloons", "Two balloons of 3.0 L each, one with CO<sub>2</sub> and one with O<sub>2</sub>, at 20 °C (V<sub>m</sub> = 24.0 L/mol). M(CO<sub>2</sub>) = 44.0, M(O<sub>2</sub>) = 32.0 g/mol. Compare n, m and N, and find the density of CO<sub>2</sub>.", "V<sub>gaz</sub> → n → m and N",
      [["Same gas volume, same conditions: n = V / V<sub>m</sub>. It is the same for both gases.", `n = 3.0 / 24.0 = <b>${f(nB)} mol</b>`], ["Same n means the same number of molecules (Avogadro–Ampère).", `N = ${f(nB)} × 6.02×10²³ = <b>${e(NB)}</b> molecules in each`], ["But the masses differ because M differs.", `m(CO₂) = ${f(nB)} × 44.0 = <b>${f(mCO2)} g</b> ; m(O₂) = ${f(nB)} × 32.0 = <b>${f(mO2)} g</b>`], ["Density of a gas: ρ = M / V<sub>m</sub>.", `ρ(CO₂) = 44.0 / 24.0 = <b>${f(44 / 24)} g/L</b>, heavier than air (≈ 1.2 g/L)`]])}
${ex("4 · A mineral-water label", "A bottle of 1.50 L says: calcium Ca²⁺ 80 mg/L. M(Ca) = 40.1 g/mol. Find C, the mass and the number of calcium ions in the bottle.", "C<sub>m</sub> → C → n → N",
      [["Convert the label to g/L (1 g = 1000 mg).", `C<sub>m</sub> = 80 mg/L = ${f(CmCa)} g/L`], ["C = C<sub>m</sub> / M.", `C = ${f(CmCa)} / 40.1 = <b>${e(CCa)} mol/L</b>`], ["Mass in the bottle: m = C<sub>m</sub> × V.", `m = ${f(CmCa)} × 1.50 = <b>${f(mCaB)} g</b> (120 mg)`], ["Moles in the bottle: n = C × V.", `n = ${e(CCa)} × 1.50 = <b>${e(nCaB)} mol</b>`], ["Ions: N = n × N<sub>A</sub>.", `N = ${e(nCaB)} × 6.02×10²³ = <b>${e(nCaB * CH.NA)}</b>`]])}
${ex("5 · A copper wire", "A piece of copper wire has a mass of 12.7 g. M(Cu) = 63.5 g/mol, ρ(Cu) = 8960 g/L. Find n, the number of atoms and the volume of the wire.", "m → n → N, and m → V<sub>esp</sub>",
      [["Moles: n = m / M.", `n = 12.7 / 63.5 = <b>${f(nCu)} mol</b>`], ["Atoms (copper is made of single atoms): N = n × N<sub>A</sub>.", `N = ${f(nCu)} × 6.02×10²³ = <b>${e(nCu * CH.NA)}</b> atoms`], ["Volume, with the density used backwards: V<sub>esp</sub> = m / ρ.", `V = 12.7 / 8960 = ${e(VCu)} L = <b>${f(VCu * 1000)} mL</b>`]])}`});

  // ---------- 3. dissolution & dilution course ----------
  pg("dissolution_dilution.html", {title: "Dissolution et dilution : le cours", eyebrow: "Chimie · Cours 1 · Fiche",
    lede: "Two lab skills built on C = n / V: dissolve a solid to make a solution of known concentration, then dilute that solution without changing the amount of solute.",
    body: `<section><h2>1 · Vocabulary</h2>
<ul><li><b>Solute</b> (soluté): what dissolves. <b>Solvent</b> (solvant): what it dissolves in (water: an <i>aqueous</i> solution). <b>Solution</b>: the mixture.</li>
<li><b>Concentration apportée</b>: the concentration of solute you <i>put in</i>, C = n(solute introduced) / V<sub>sol</sub>.</li>
<li>An ionic solid splits into ions when it dissolves. NaCl(s) → Na⁺(aq) + Cl⁻(aq): one formula unit gives one Na⁺ and one Cl⁻, so [Na⁺] = [Cl⁻] = C. Likewise CuSO<sub>4</sub>(s) → Cu²⁺(aq) + SO<sub>4</sub><sup>2−</sup>(aq), so [Cu²⁺] = C. For CaCl<sub>2</sub> you would get [Cl⁻] = 2C.</li></ul></section>
<section><h2>2 · Dissolution: how much to weigh?</h2>
<p>You want V<sub>sol</sub> of a solution at concentration C. Go through n:</p>
<p class="formula">n = C × V<sub>sol</sub>   then   m = n × M   ⇒   m = C × V<sub>sol</sub> × M</p>
<p>Path on the map: C → n → m.</p>
<h3>Protocol (fiole jaugée)</h3>
<ol><li><b>Calculate</b> m, then <b>weigh</b> it (balance, weighing boat, spatula). Note the mass really weighed.</li>
<li><b>Introduce</b> the solid into the volumetric flask with a funnel. Rinse the boat and the funnel into the flask with distilled water.</li>
<li><b>Dissolve</b>: add distilled water to about two thirds, stopper, swirl until the solid has disappeared.</li>
<li><b>Fill to the mark</b> (trait de jauge) with distilled water, last drops with a Pasteur pipette; the bottom of the meniscus sits on the mark, eye at the same level.</li>
<li><b>Homogenise</b>: stopper and invert several times.</li></ol>
<div class="key warn"><p>V<sub>sol</sub> is the volume of the <b>final solution</b>, the mark on the flask, not the volume of water you poured: the solid takes up room. That is why you fill to the mark <i>after</i> dissolving.</p></div>
<p>Try the five steps in <a href="labo_dilution.html">Labo : dissoudre et diluer</a>.</p></section>
<section><h2>3 · Dilution: n does not change</h2>
<p>Start from a <b>mother solution</b> (solution mère, concentration C<sub>0</sub>). Take a volume V<sub>0</sub> of it, pour it into a flask of volume V<sub>1</sub>, fill to the mark with water. You get a <b>daughter solution</b> (solution fille) of concentration C<sub>1</sub>.</p>
<p>You added only water, so the amount of solute is the same before and after:</p>
<p class="formula">n = C<sub>0</sub> V<sub>0</sub> = C<sub>1</sub> V<sub>1</sub></p>
<p>The <b>dilution factor</b> says by how much you diluted:</p>
<p class="formula">F = C<sub>0</sub> / C<sub>1</sub> = V<sub>1</sub> / V<sub>0</sub>  &nbsp;(F &gt; 1)</p>
<p>Handy forms: <b>V<sub>0</sub> = V<sub>1</sub> / F</b> (how much mother to take) and <b>C<sub>1</sub> = C<sub>0</sub> / F</b>. Check: the daughter is always <i>less</i> concentrated than the mother.</p>
<h3>Protocol</h3>
<ol><li>Pour some mother solution into a small <b>beaker</b> (never pipette from the stock bottle).</li>
<li>Rinse the <b>pipette jaugée</b> with a little mother solution, then fill it above the mark with a pipette filler and adjust to the mark.</li>
<li>Empty it into the <b>fiole jaugée</b> of volume V<sub>1</sub>.</li>
<li>Add distilled water to two thirds, stopper and swirl, then fill to the mark, stopper and invert.</li></ol>
<h3>Which glassware?</h3>
${table(["Glassware", "Precision", "Use"], [["Pipette jaugée (1, 2, 5, 10, 20, 25 mL)", "high: one mark (or two)", "taking V<sub>0</sub> of mother solution"], ["Fiole jaugée (25 … 1000 mL)", "high: one mark", "making V<sub>1</sub>: the final volume"], ["Burette graduée", "good", "volumes that no pipette matches (e.g. 40.0 mL)"], ["Éprouvette graduée", "poor", "rough volumes only"], ["Bécher", "none", "holding, pouring, rinsing; never to measure"]])}
<h3>A series of standards (gamme)</h3>
<p>To make several solutions from one mother, repeat the dilution with different V<sub>0</sub> in flasks of the same V<sub>1</sub>. With S<sub>0</sub> = 1.00×10⁻² mol/L and 50.0 mL flasks (the truffe exam), V<sub>0</sub> = C × 50.0 / C<sub>0</sub>:</p>
${table(["Solution", "C (mol/L)", "F", "V<sub>0</sub> to take"], [1e-3, 2e-3, 5e-3, 8e-3].map((c, i) => [`S<sub>${i + 1}</sub>`, e(c), f(1e-2 / c), `${f(c * 50 / 1e-2)} mL`]))}
<p class="muted">40.0 mL is not a standard pipette: use a burette, or the 20.0 mL pipette twice. This series is used in the <a href="dosage_cours.html">dosage course</a>.</p>
<h3>When F is very large</h3>
<p>Dilute in <b>two steps</b>: F = F<sub>1</sub> × F<sub>2</sub>. Going from 1.0 mol/L to 1.0×10⁻⁴ mol/L (F = 10 000) in one step would need 0.01 mL of mother solution. Two steps of F = 100 each (1 mL into a 100 mL flask, twice) are accurate and easy.</p></section>
<section><h2>4 · Quick reference</h2>
${table(["Task", "Formulas", "Path"], [["Weigh for a target C and V", "m = C × V × M", "C → n → m"], ["Concentration from a weighed mass", "C = m / (M × V)", "m → n → C"], ["Switch concentration type", "C<sub>m</sub> = C × M", "C ↔ C<sub>m</sub>"], ["Volume of mother to take", "V<sub>0</sub> = C<sub>1</sub> V<sub>1</sub> / C<sub>0</sub> = V<sub>1</sub> / F", "n conserved"], ["Concentration after adding water", "C' = C V / (V + V<sub>water</sub>)", "n conserved"]])}
<h3>Common mistakes</h3>
<ul><li>Using the volume of water added instead of the volume of the final solution.</li><li>Mixing up C<sub>0</sub>V<sub>0</sub> = C<sub>1</sub>V<sub>1</sub>: the mother is the <b>0</b> (the larger C, the smaller V).</li><li>Leaving volumes in mL when C is in mol/L. In C<sub>0</sub>V<sub>0</sub> = C<sub>1</sub>V<sub>1</sub> you may keep mL <i>if both volumes use mL</i>; for n = C × V you must use L.</li><li>Pipetting from the stock bottle, or filling past the mark: you cannot take solution back out.</li></ul></section>`});

  // ---------- 4. dissolution & dilution examples ----------
  const Mg = {NaCl: 58.5, glc: 180, cu: 159.5};
  const m1 = .1 * .25 * 58.5, n3 = .5 * .01, nCuSO4 = 2.5 / 159.5, CCuSO4 = nCuSO4 / .5;
  pg("dilution_exemples.html", {title: "Exemples corrigés : dissolution et dilution", eyebrow: "Chimie · Cours 1 · Corrigé",
    lede: "Seven worked problems. Each one lists the data, the path through n, and every step.",
    body: `${ex("1 · How much NaCl to weigh?", "Prepare 250 mL of a sodium chloride solution at C = 0.100 mol/L. M(NaCl) = 58.5 g/mol.", "C → n → m",
      [["Volume in litres.", "V<sub>sol</sub> = 250 mL = 0.250 L"], ["Moles to dissolve: n = C × V.", `n = 0.100 × 0.250 = ${f(.025)} mol`], ["Mass to weigh: m = n × M.", `m = ${f(.025)} × 58.5 = <b>${f(m1)} g</b>`], ["Check with the shortcut m = C V M.", `0.100 × 0.250 × 58.5 = ${f(m1)} g ✓`]])}
${ex("2 · What concentration did I make?", "5.85 g of NaCl are dissolved in a 250 mL volumetric flask, then filled to the mark. Find C, C<sub>m</sub> and the ion concentrations.", "m → n → C",
      [["Moles: n = m / M.", `n = 5.85 / 58.5 = ${f(.1)} mol`], ["C = n / V<sub>sol</sub>.", `C = 0.100 / 0.250 = <b>${f(.4)} mol/L</b>`], ["C<sub>m</sub> = C × M.", `C<sub>m</sub> = 0.400 × 58.5 = <b>${f(23.4)} g/L</b>`], ["NaCl(s) → Na⁺ + Cl⁻: one of each per formula unit.", "[Na⁺] = [Cl⁻] = <b>0.400 mol/L</b>"]])}
${ex("3 · Dilute a glucose solution", "From a solution at C<sub>0</sub> = 0.500 mol/L, prepare 100.0 mL at C<sub>1</sub> = 0.0500 mol/L. Which volume do you take, and with which glassware?", "dilution: n conserved",
      [["Dilution factor.", `F = C₀ / C₁ = 0.500 / 0.0500 = ${f(10)}`], ["n is conserved: C₀V₀ = C₁V₁, so V₀ = V₁ / F.", `V<sub>0</sub> = 100.0 / 10 = <b>${f(10)} mL</b>`], ["Check the amount of solute on both sides.", `C₀V₀ = 0.500 × 0.0100 = ${e(n3)} mol ; C₁V₁ = 0.0500 × 0.1000 = ${e(.05 * .1)} mol ✓`], ["Glassware: 10.0 mL pipette jaugée + 100.0 mL fiole jaugée + distilled water.", ""]])}
${ex("4 · Which pipette?", "From S<sub>0</sub> = 1.00×10⁻² mol/L, prepare 100.0 mL of a solution at 2.0×10⁻³ mol/L.", "dilution: n conserved",
      [["Dilution factor.", `F = ${e(1e-2)} / ${e(2e-3, 2)} = ${f(5)}`], ["V₀ = V₁ / F.", `V<sub>0</sub> = 100.0 / 5 = <b>${f(20)} mL</b>`], ["20.0 mL exists as a pipette jaugée: use it with a 100.0 mL fiole jaugée.", ""]])}
${ex("5 · Adding water", "To 50.0 mL of a solution at 0.40 mol/L we add 150 mL of water (volumes assumed additive). Find the new concentration.", "n conserved, V changes",
      [["Amount of solute, unchanged by the water.", `n = 0.40 × 0.0500 = ${f(.02)} mol`], ["New volume: 50.0 + 150 = 200 mL.", "V' = 0.200 L"], ["C' = n / V'.", `C' = ${f(.02)} / 0.200 = <b>${f(.1)} mol/L</b>`], ["Cross-check: the volume was multiplied by 4, so C is divided by 4.", `0.40 / 4 = 0.10 ✓`]])}
${ex("6 · Copper sulfate and Cu²⁺", "2.5 g of CuSO<sub>4</sub> (M = 159.5 g/mol) are dissolved in a 500 mL flask. Find C, and the mass concentration of Cu²⁺ ions (M(Cu) = 63.5 g/mol).", "m → n → C → C<sub>m</sub>(Cu²⁺)",
      [["Moles of solute.", `n = 2.5 / 159.5 = ${f(nCuSO4)} mol`], ["Concentration of solute.", `C = ${f(nCuSO4)} / 0.500 = <b>${f(CCuSO4)} mol/L</b>`], ["CuSO₄ → Cu²⁺ + SO₄²⁻: [Cu²⁺] = C.", `[Cu²⁺] = ${f(CCuSO4)} mol/L`], ["Mass concentration of the ions: C<sub>m</sub> = C × M(Cu).", `C<sub>m</sub> = ${f(CCuSO4)} × 63.5 = <b>${f(CCuSO4 * 63.5)} g/L</b>`]])}
${ex("7 · A dilution by 10 000", "From a 1.00 mol/L solution, prepare a solution at 1.00×10⁻⁴ mol/L using only 100.0 mL flasks and a 1.00 mL pipette.", "two dilutions in a row",
      [["Total dilution factor.", `F = 1.00 / 1.00×10⁻⁴ = ${e(1e4, 3)}`], ["One step would need V₀ = 100.0 / 10 000 = 0.0100 mL: not possible. Split into F = 100 × 100.", ""], ["First dilution: 1.00 mL of mother in 100.0 mL (F₁ = 100).", `C<sub>1</sub> = 1.00 / 100 = ${e(1e-2)} mol/L`], ["Second dilution: 1.00 mL of that solution in 100.0 mL (F₂ = 100).", `C<sub>2</sub> = ${e(1e-2)} / 100 = <b>${e(1e-4)} mol/L</b>`]])}`});

  // ---------- 5. truffe part 1 ----------
  const nCO2 = .072 / 24.1, mCaCO3 = nCO2 * 100.1, pCaCO3 = mCaCO3 / 1.2 * 100;
  pg("sujet_truffe_1.html", {title: "Sujet truffe, partie 1 : calcaire et préparation de S₃", eyebrow: "Chimie · Cours 1 · Corrigé de sujet",
    lede: "From an exam on soil analysis for truffle growing. Part 1 measures limestone with a gas volume; the first question of part 2 asks how to prepare a standard by dilution. Full solutions, step by step.",
    body: `<section><h2>The statement (summary)</h2>
<p><b>Partie 1 · La teneur en calcaire du sol.</b> Pouring concentrated hydrochloric acid on a soil that fizzes shows it contains calcium carbonate (“calcaire”). The reaction is</p>
<p class="formula">CaCO<sub>3</sub>(s) + 2 H<sub>3</sub>O⁺(aq) → Ca²⁺(aq) + CO<sub>2</sub>(g) + 3 H<sub>2</sub>O(l)</p>
<p>The acid is in excess and the gas is collected in a graduated cylinder filled with water. For a soil sample of mass <b>m = 1.2 g</b>, the volume of gas collected is <b>V = 72 mL</b>. In the conditions of the experiment, <b>V<sub>m</sub> = 24.1 L/mol</b>.</p>
<p><b>Question 1.</b> Is the amount of limestone in this soil suitable for growing truffles?</p></section>
<section><h2>Solution, part 1</h2>
<p>Path on the map: V<sub>gaz</sub> → n(CO<sub>2</sub>) → (equation) → n(CaCO<sub>3</sub>) → m → percentage.</p>
${steps([
  ["Convert the gas volume to litres: the molar volume is in L/mol.", "V = 72 mL = 0.072 L"],
  ["Moles of gas: n = V / V<sub>m</sub>. This V is the volume of the gas itself, and we use the given V<sub>m</sub> = 24.1 L/mol, not 24.0.", `n(CO₂) = 0.072 / 24.1 = <b>${e(nCO2)} mol</b>`],
  ["Read the equation: 1 CaCO₃ consumed gives 1 CO₂. With the acid in excess, all the limestone reacts, so the two amounts are equal.", `n(CaCO₃) = n(CO₂) = ${e(nCO2)} mol`],
  ["Molar mass of calcium carbonate: 1 Ca, 1 C, 3 O.", `M(CaCO₃) = 40.1 + 12.0 + 3 × 16.0 = ${f(100.1)} g/mol`],
  ["Mass of limestone: m = n × M.", `m(CaCO₃) = ${e(nCO2)} × 100.1 = <b>${f(mCaCO3)} g</b>`],
  ["Share of the sample: divide by the 1.2 g of soil.", `${f(mCaCO3)} / 1.2 = ${f(mCaCO3 / 1.2)} → <b>≈ ${f(pCaCO3, 2)} % of the soil is CaCO₃</b>`]])}
<div class="key warn"><p><b>Conclusion (question 1).</b> State the result: about 0.30 g of CaCO<sub>3</sub> in 1.2 g of soil, that is <b>about 25 %</b> limestone. The question then asks you to compare it with the range suitable for truffles. That range is given in the documents of the exam, which were not on the pages provided, so I cannot fill in the final sentence for you. Write it as: “The soil contains about 25 % of CaCO<sub>3</sub>; the document says truffles need … ; so this soil is / is not suitable.” (Truffles are known to prefer limestone-rich soils.)</p></div></section>
<section><h2>Part 2 · question 3: prepare S₃ from S₀</h2>
<p><b>Statement.</b> Series of copper sulfate solutions of volume 50.0 mL prepared from a mother solution S<sub>0</sub>, C<sub>0</sub> = 1.00×10⁻² mol/L. S<sub>3</sub> has C<sub>3</sub> = 5.00×10⁻³ mol/L. <i>Propose a list of material and a protocol to prepare S<sub>3</sub> from S<sub>0</sub>. Justify.</i></p>
<h3>Justification (the calculation)</h3>
${steps([
  ["It is a dilution: S₃ is less concentrated than S₀, and only water is added, so n is conserved: C₀V₀ = C₃V₃.", "C₀ × V₀ = C₃ × V₃"],
  ["Dilution factor.", `F = C₀ / C₃ = ${e(1e-2)} / ${e(5e-3)} = <b>${f(2)}</b>`],
  ["Volume of S₀ to take: V₀ = V₃ / F.", `V<sub>0</sub> = 50.0 / 2 = <b>${f(25)} mL</b>`],
  ["Check on the amount of solute.", `n = ${e(1e-2)} × 0.0250 = ${e(2.5e-4)} mol ; ${e(5e-3)} × 0.0500 = ${e(2.5e-4)} mol ✓`]])}
<h3>Material</h3>
<ul><li>1 pipette jaugée of <b>25.0 mL</b> + a pipette filler (V<sub>0</sub> must be known precisely);</li><li>1 fiole jaugée of <b>50.0 mL</b> with its stopper (V<sub>3</sub> must be known precisely);</li><li>1 beaker with a little S<sub>0</sub> (and one for waste/rinsing), distilled water in a wash bottle, a Pasteur pipette, a funnel.</li></ul>
<p class="muted">Not an éprouvette graduée: its precision is too poor for a standard.</p>
<h3>Protocol</h3>
<ol><li>Pour some S<sub>0</sub> into a beaker.</li><li>Rinse the 25.0 mL pipette with a little S<sub>0</sub>, then fill it and adjust the meniscus to the mark.</li><li>Empty the 25.0 mL of S<sub>0</sub> into the 50.0 mL volumetric flask.</li><li>Add distilled water to about two thirds, stopper, swirl.</li><li>Fill with distilled water up to the mark (Pasteur pipette for the last drops), stopper and invert several times to homogenise.</li></ol>
<h3>The other solutions of the series</h3>
<p>Same method, V<sub>0</sub> = C × 50.0 / C<sub>0</sub>:</p>
${table(["Solution", "C (mol/L)", "F", "V<sub>0</sub> of S<sub>0</sub>", "Glassware"], [[`S<sub>1</sub>`, e(1e-3), "10", "5.00 mL", "pipette 5.0 mL"], [`S<sub>2</sub>`, e(2e-3), "5", "10.0 mL", "pipette 10.0 mL"], [`S<sub>3</sub>`, e(5e-3), "2", "25.0 mL", "pipette 25.0 mL"], [`S<sub>4</sub>`, e(8e-3), "1.25", "40.0 mL", "burette (or 2 × 20.0 mL)"], [`S<sub>0</sub>`, e(1e-2), "1", "—", "the mother itself"]])}
<p>The rest of this exam (wavelength, the calibration curve, Beer–Lambert, the copper content) is solved in <a href="sujet_truffe_2.html">Sujet truffe, partie 2</a>.</p></section>`});

  // ============================================================ COURSE B
  // ---------- 6. dosage course ----------
  const stdC = [1.00, 2.00, 5.00, 8.00, 10.0].map(x => x * 1e-3), stdA = [0.010, 0.019, 0.045, 0.082, 0.103];
  const ptsT = stdC.map((x, i) => ({x, y: stdA[i]}));
  const kT = CH.fit0(ptsT), fitT = CH.fit(ptsT);
  const CsT = .035 / kT, CmsT = CsT * 63.5, gkgT = CmsT * 1.00 / .5000;
  pg("dosage_cours.html", {title: "Dosage par étalonnage : le cours", eyebrow: "Chimie · Cours 2 · Fiche",
    lede: "How to find an unknown concentration by comparing with solutions you made yourself: prepare standards, measure a property that grows with C, draw the line, read the unknown on it.",
    body: `<section><h2>1 · The idea</h2>
<p>A <b>dosage par étalonnage</b> finds the concentration C<sub>x</sub> of a species in a sample <b>without a reaction</b>. You use a physical quantity that depends on the concentration (the colour for spectrophotometry, the ions for conductimetry). You measure it on solutions of <b>known</b> concentration (the standards, solutions étalons), see how it varies with C, then measure it on the unknown and read the answer.</p>
<p>It rests on dilution: the standards are made from one mother solution (see <a href="dissolution_dilution.html">Dissolution et dilution</a>).</p></section>
<section><h2>2 · The seven steps</h2>
<ol><li><b>Prepare the mother solution S<sub>0</sub></b> (known C<sub>0</sub>), by dissolution.</li>
<li><b>Make the gamme étalon</b> by dilution: S<sub>1</sub> … S<sub>n</sub> with C = C<sub>0</sub> V<sub>0</sub> / V.</li>
<li><b>Measure</b> the quantity (A or σ) for each standard, at the same settings.</li>
<li><b>Draw the calibration curve</b>: measured quantity (y) as a function of C (x).</li>
<li><b>Check the model</b>: points aligned on a line through the origin ⇒ proportionality.</li>
<li><b>Measure the unknown</b> under the same conditions; its value must fall <b>inside</b> the range of the standards.</li>
<li><b>Read C<sub>x</sub></b> on the line (graph or equation), and correct for any dilution you made.</li></ol></section>
<section><h2>3 · Spectrophotometry and Beer–Lambert</h2>
<p>A coloured solution absorbs some of the light that goes through it. The <b>absorbance A</b> (no unit) measures how much. For a dilute solution, one absorbing species, one wavelength and a cuvette of length ℓ:</p>
<p class="formula">A = ε × ℓ × C = k × C</p>
<p>A is <b>proportional</b> to C. k (L/mol) is the slope of the calibration line; it contains ε (the molar absorption coefficient) and ℓ.</p>
<ul><li><b>Choose λ at the maximum of the absorption spectrum</b> of the species: the signal is largest, so the measurement is most sensitive. A coloured solution absorbs the colour <i>opposite</i> to what you see: a blue Cu²⁺ solution absorbs orange-red (λ<sub>max</sub> ≈ 800 nm).</li>
<li><b>Set the zero</b> (le blanc) with the solvent alone, in the same cuvette type.</li>
<li>The law holds for <b>dilute</b> solutions: stay below A ≈ 1 to 1.5.</li></ul></section>
<section><h2>4 · Conductimetry</h2>
<p>A solution of ions conducts electricity. Its conductivity σ (in S/m, or mS/cm) is the sum over the ions of λ<sub>i</sub> × C<sub>i</sub>. For one dissolved salt in dilute solution this gives again a proportionality:</p>
<p class="formula">σ = k × C</p>
<p>Calibrate the probe, measure at the same temperature, rinse the probe between solutions. Example: NaCl gives about 126 mS/cm per mol/L at 25 °C.</p></section>
<section><h2>5 · The calibration curve</h2>
<h3>Drawing it by hand</h3>
<ol><li>Put C on the x-axis and A (or σ) on the y-axis; label both with units.</li><li>Choose scales so the points fill most of the sheet (and the origin is included).</li><li>Mark each point with a small cross.</li><li>Draw <b>one straight line</b>, with a ruler, through the origin and as close as possible to all the points, with about as many above as below. Do not join the dots.</li></ol>
<h3>Justify Beer–Lambert (or proportionality)</h3>
<p>Write: “The points are aligned along a straight line that passes through the origin, so A is proportional to C: A = k × C. This agrees with the Beer–Lambert law, within the uncertainty of the measurements.”</p>
<h3>Reading the unknown</h3>
<ul><li><b>Graphically</b>: from A<sub>x</sub> on the y-axis, go horizontally to the line, then vertically down to the x-axis. Show your dashed lines.</li><li><b>With the equation</b>: take two far-apart points of the <i>line</i> (not of the data) to find k = ΔA / ΔC, then C<sub>x</sub> = A<sub>x</sub> / k.</li></ul>
<div class="mapw" style="padding:12px">${CH.calibSVG({pts: ptsT, k: kT, xmax: 1.05e-2, ymax: .12, xs: 1000, xl: "Concentration C (mmol/L)", yl: "Absorbance A", probe: {x: CsT, y: .035}})}</div>
<p class="muted">Data of the truffe exam (copper sulfate): A = k × C with k ≈ ${f(kT, 3)} L/mol. A<sub>s</sub> = 0.035 gives C ≈ ${f(CsT * 1000, 3)} mmol/L. Full solution in <a href="sujet_truffe_2.html">Sujet truffe, partie 2</a>.</p></section>
<section><h2>6 · From concentration to what is asked</h2>
${table(["You have", "You want", "Do"], [["A<sub>x</sub> or σ<sub>x</sub>", "C of the measured solution", "C = A / k"], ["C of a <i>diluted</i> sample (F times)", "C of the original", "C = F × C<sub>measured</sub>"], ["C (mol/L)", "C<sub>m</sub> (g/L)", "C<sub>m</sub> = C × M"], ["C<sub>m</sub> (g/L) in a flask V", "mass in the flask", "m = C<sub>m</sub> × V"], ["mass m of species from a sample of mass m<sub>sample</sub>", "content (g/kg, %)", "m / m<sub>sample</sub>"]])}
<h3>Out of range?</h3>
<p>If A<sub>x</sub> is larger than the largest standard, do not extend the line: <b>dilute</b> the sample by a known factor F, measure again, and multiply C by F. If it is much smaller than the smallest standard, use a more concentrated sample or a more sensitive setting.</p></section>
<section><h2>7 · Common mistakes</h2>
<ul><li>Joining the points instead of drawing a single best line.</li><li>Forgetting to account for a dilution of the sample (answer F times too small).</li><li>Reading a point outside the range of the standards.</li><li>Writing C in mmol/L on the graph and then using it as mol/L in the formula.</li><li>Choosing λ at random: it must be the absorption maximum.</li></ul>
<p>Next: build the curve in <a href="labo_etalonnage.html">Labo : courbe d'étalonnage</a>.</p></section>`});

  // ---------- 7. dosage examples ----------
  const mnC = [1, 2, 3, 4, 5].map(x => x * 1e-4), mnA = [0.25, 0.47, 0.73, 0.95, 1.19], kMn = CH.fit0(mnC.map((x, i) => ({x, y: mnA[i]})));
  const Cmn = .62 / kMn, Cmn2 = .29 / kMn;
  const naC = [1, 2, 3, 4, 5].map(x => x * 1e-3), naS = [0.125, 0.255, 0.378, 0.508, 0.630], kNa = CH.fit0(naC.map((x, i) => ({x, y: naS[i]})));
  const CNa = .390 / kNa, CNa0 = CNa * 50;
  pg("dosage_exemples.html", {title: "Exemples corrigés : dosage", eyebrow: "Chimie · Cours 2 · Corrigé",
    lede: "Three complete dosages: spectrophotometry, a sample too concentrated that must be diluted, and conductimetry.",
    body: `${ex("1 · Permanganate by spectrophotometry", "A mother solution S<sub>0</sub> of KMnO<sub>4</sub> at 1.00×10⁻³ mol/L is diluted into five 50.0 mL standards (V<sub>0</sub> = 5.0, 10.0, 15.0, 20.0, 25.0 mL). Absorbances at 525 nm: 0.25, 0.47, 0.73, 0.95, 1.19. A sample has A = 0.62. Find its concentration.", "V<sub>0</sub> → C (gamme) ; A → C<sub>x</sub>",
      [["Concentration of each standard: C = C₀ V₀ / V.", `C = 1.00×10⁻³ × V₀ / 50.0 → ${mnC.map(c => e(c, 2)).join(" ; ")} mol/L`], ["Plot A against C: the five points are aligned on a line through the origin ⇒ A = k × C (Beer–Lambert).", ""], ["Slope of the best line through the origin: k = Σ(C·A) / Σ(C²).", `k = <b>${f(kMn, 3)} L/mol</b> (about 2400 L/mol)`], ["Is A = 0.62 inside the range of the standards (0.25 to 1.19)? Yes.", "✓"], ["Read C<sub>x</sub> = A<sub>x</sub> / k.", `C<sub>x</sub> = 0.62 / ${f(kMn, 3)} = <b>${e(Cmn)} mol/L</b>`]])}
<div class="mapw" style="padding:12px">${CH.calibSVG({pts: mnC.map((x, i) => ({x, y: mnA[i]})), k: kMn, xmax: 6e-4, ymax: 1.4, xs: 1000, xl: "Concentration C (mmol/L)", yl: "Absorbance A", probe: {x: Cmn, y: .62}})}</div>
${ex("2 · A sample that is too concentrated", "Same calibration as example 1. A fresh sample gives A = 2.9, above the largest standard (1.19): the law is no longer valid there. The sample is diluted 10 times (1 mL into a 10 mL flask), and the diluted solution gives A = 0.29. Find the concentration of the original sample.", "A → C(diluted) → C(original)",
      [["A = 2.9 is out of range. Dilute by a known F = 10 and measure again.", "F = V₁ / V₀ = 10.0 / 1.00 = 10"], ["Concentration of the diluted solution: C = A / k.", `C<sub>diluted</sub> = 0.29 / ${f(kMn, 3)} = ${e(Cmn2)} mol/L`], ["Check: 0.29 is inside the range ✓. The original sample is F times more concentrated.", `C = F × C<sub>diluted</sub> = 10 × ${e(Cmn2)} = <b>${e(Cmn2 * 10)} mol/L</b>`]])}
${ex("3 · Salt in a saline drip, by conductimetry", "NaCl standards of 1.00, 2.00, 3.00, 4.00, 5.00 mmol/L give σ = 0.125, 0.255, 0.378, 0.508, 0.630 mS/cm. A drip (“sérum physiologique”) is diluted 50 times and gives σ = 0.390 mS/cm. Find the concentration of the drip in mol/L and g/L. M(NaCl) = 58.5 g/mol.", "σ → C(diluted) → C → C<sub>m</sub>",
      [["The points are aligned through the origin: σ = k × C.", `k = Σ(Cσ) / Σ(C²) = <b>${f(kNa, 3)} mS·cm⁻¹ per mol/L</b>`], ["Concentration of the diluted solution: C = σ / k.", `C = 0.390 / ${f(kNa, 3)} = ${e(CNa)} mol/L (inside the range ✓)`], ["Undo the dilution: × 50.", `C = 50 × ${e(CNa)} = <b>${f(CNa0)} mol/L</b>`], ["Mass concentration: C<sub>m</sub> = C × M.", `C<sub>m</sub> = ${f(CNa0)} × 58.5 = <b>${f(CNa0 * 58.5)} g/L</b> (a saline drip is labelled 9 g/L ✓)`]])}`});

  // ---------- 8. truffe part 2 ----------
  const mCuFlask = CmsT * 1.00;
  pg("sujet_truffe_2.html", {title: "Sujet truffe, partie 2 : le cuivre du sol", eyebrow: "Chimie · Cours 2 · Corrigé de sujet",
    lede: "Eight questions on the copper content of a soil, dosed by spectrophotometry. Each is solved step by step, from the choice of wavelength to the final conclusion.",
    body: `<section><h2>The statement (summary)</h2>
<p><b>Partie 2 · La teneur en cuivre du sol.</b> A solution “de sol” is prepared by shaking <b>m = 500.0 g</b> of soil in a <b>1.00 L</b> volumetric flask, then filtering. It contains Cu²⁺(aq) ions, dosed by spectrophotometry.</p>
<p>A series of copper sulfate solutions (Cu²⁺, SO<sub>4</sub><sup>2−</sup>), <b>V = 50.0 mL</b> each, is made from a mother solution S<sub>0</sub>, <b>C<sub>0</sub> = 1.00×10⁻² mol/L</b>. The absorbance is measured at a predefined wavelength. For the soil solution: <b>A<sub>s</sub> = 0.035</b>.</p>
${table(["Solution", "S<sub>1</sub>", "S<sub>2</sub>", "S<sub>3</sub>", "S<sub>4</sub>", "S<sub>0</sub>"], [["C (mol/L)", "1.00×10⁻³", "2.00×10⁻³", "5.00×10⁻³", "8.00×10⁻³", "1.00×10⁻²"], ["Absorbance A", "0.010", "0.019", "0.045", "0.082", "0.103"]])}</section>
<section><h2>Q1 · The wavelength</h2>
<p><i>State the wavelength at which the spectrophotometer must be set.</i></p>
${steps([["The setting is the wavelength of <b>maximum absorbance</b> of the Cu²⁺ solution: the signal is largest there, so the measurement is the most sensitive and the relative error the smallest.", ""], ["Read it on the absorption spectrum of Cu²⁺ given with the exam (not on the pages provided). A blue solution absorbs orange-red light.", "λ ≈ <b>800 nm</b> (read the exact value on the spectrum)"]])}</section>
<section><h2>Q2 · The colour of Cu²⁺</h2>
<p><i>State the colour of the copper ion solution.</i></p>
${steps([["Cu²⁺(aq) solutions are <b>blue</b> (light blue). That is why they absorb in the orange-red, around 800 nm: the solution shows the complementary colour of the light it absorbs.", ""]])}</section>
<section><h2>Q3 · Preparing S₃</h2>
<p>Done in <a href="sujet_truffe_1.html">Sujet truffe, partie 1</a>: F = 2, take <b>25.0 mL</b> of S<sub>0</sub> with a pipette jaugée, into a 50.0 mL fiole jaugée, fill to the mark with distilled water.</p></section>
<section><h2>Q4 · The calibration curve</h2>
<p><i>Plot the calibration curve (absorbance as a function of concentration).</i></p>
${steps([["Axes: C (mol/L) on the x-axis, A on the y-axis. Label both.", ""], ["Scales: x from 0 to 1.00×10⁻² mol/L (for example 2.00×10⁻³ mol/L per 4 cm), y from 0 to 0.120 (for example 0.020 per 2 cm). Start at the origin.", ""], ["Plot the five points with crosses: (1.00×10⁻³ ; 0.010), (2.00×10⁻³ ; 0.019), (5.00×10⁻³ ; 0.045), (8.00×10⁻³ ; 0.082), (1.00×10⁻² ; 0.103).", ""], ["Draw the best straight line through the origin with a ruler, with points on both sides of it. Do not join the dots.", `Its slope is k ≈ <b>${f(kT, 3)} L/mol</b> (about 10)`]])}
<div class="mapw" style="padding:12px">${CH.calibSVG({pts: ptsT, k: kT, xmax: 1.05e-2, ymax: .12, xs: 1000, xl: "Concentration C (mmol/L)", yl: "Absorbance A", probe: {x: CsT, y: .035}, aria: "Courbe d'étalonnage du sulfate de cuivre avec lecture de la solution de sol"})}</div></section>
<section><h2>Q5 · Compatible with Beer–Lambert?</h2>
<p><i>Justify that the points are compatible with the Beer–Lambert law.</i></p>
${steps([["Beer–Lambert says A = k × C: A is proportional to C, so the graph is a straight line through the origin.", ""], ["On the graph, the points are aligned along a straight line that passes through the origin (small gaps are measurement uncertainty).", ""], ["Numerical check: the ratio A / C is nearly constant.", [0, 1, 2, 3, 4].map(i => `${f(stdA[i] / stdC[i], 3)}`).join(" ; ") + " L/mol, all about 10"], ["Conclusion.", "<b>A = k × C is verified: the law of Beer–Lambert applies.</b>"]])}
<p class="muted">Your handwritten answer says the same thing: a straight line through the origin shows a proportionality between A and C. Adding “within the uncertainty of the measurements” and the value of k makes it complete.</p></section>
<section><h2>Q6 · Concentration of the soil solution</h2>
<p><i>Determine the molar concentration C<sub>Cu²⁺</sub> of the soil solution. Justify.</i></p>
${steps([["Justification: A<sub>s</sub> = 0.035 lies between the absorbances of S<sub>1</sub> (0.010) and S<sub>3</sub> (0.045): it is <b>inside the range</b> of the standards, so reading it on the line is valid.", ""], ["Graphically: from 0.035 on the y-axis go horizontally to the line, then down to the x-axis.", `C ≈ <b>${f(CsT * 1000, 2)}×10⁻³ mol/L</b>`], ["With the equation: C = A<sub>s</sub> / k.", `C<sub>Cu²⁺</sub> = 0.035 / ${f(kT, 3)} = <b>${e(CsT, 2)} mol/L</b>`], ["Expect a small spread (3.4 to 3.6×10⁻³ mol/L) depending on how you draw the line.", ""]])}</section>
<section><h2>Q7 · Mass concentration of copper</h2>
<p><i>Deduce the mass concentration C<sub>ms</sub> of Cu²⁺ ions in the soil.</i> (M(Cu) = 63.5 g/mol)</p>
${steps([["Mass concentration from the molar one: C<sub>m</sub> = C × M.", `C<sub>ms</sub> = ${e(CsT, 3)} × 63.5 = <b>${f(CmsT, 2)} g/L</b> of soil solution`], ["The 1.00 L flask therefore contains this mass of copper, which came from the 500.0 g of soil: m = C<sub>m</sub> × V.", `m(Cu) = ${f(CmsT, 3)} × 1.00 = ${f(mCuFlask, 2)} g`], ["Copper content of the soil, per kilogram of soil.", `${f(mCuFlask, 2)} g / 0.5000 kg = <b>${f(gkgT, 2)} g/kg</b> (≈ ${f(gkgT * 1000, 2)} mg/kg)`]])}
<p class="muted">The wording “concentration massique dans le sol” can mean the g/L of the soil solution (0.22 g/L) or the g per kg of soil (0.44 g/kg). Give both, with units, as above.</p></section>
<section><h2>Q8 · Is the soil suitable for truffles?</h2>
<p><i>Can we say the soil sample is suitable for truffle growing? Present all the steps.</i></p>
<p>The answer needs <b>two results compared with the criteria given in the exam documents</b> (not on the pages provided). Here is the complete chain and the model sentence:</p>
${steps([["Limestone (Part 1): from the gas volume, n(CaCO₃) = V / V<sub>m</sub>.", `≈ <b>25 %</b> CaCO₃ (0.30 g in 1.2 g of soil) — see <a href="sujet_truffe_1.html">part 1</a>`], ["Copper (Part 2): spectrophotometric dosage with the calibration line A = k × C, k ≈ 10 L/mol.", `C(Cu²⁺) ≈ ${e(CsT, 2)} mol/L → <b>${f(CmsT, 2)} g/L</b> → <b>${f(gkgT, 2)} g/kg</b> of soil`], ["Compare each result with the range or limit given in the documents (limestone range suitable for truffles; maximum copper content tolerated).", "[take the values from the documents]"], ["Conclude: the soil is suitable only if <b>both</b> criteria are satisfied.", "“The soil contains about 25 % of CaCO₃ and 0.44 g of Cu²⁺ per kg. According to the documents …, so the soil is / is not suitable for truffle growing.”"]])}</section>`});

  // ---------- home sections ----------
  const home = `<section><div class="sec-head"><h2>Chimie : dissolution et dilution</h2><span class="muted">Quantité de matière, concentrations, fabriquer et diluer une solution</span></div><div class="toc">${rows(A, 11)}</div></section>
<section><div class="sec-head"><h2>Chimie : dosage par étalonnage</h2><span class="muted">Gamme étalon, Beer–Lambert, courbe d'étalonnage, sujet truffe</span></div><div class="toc">${rows(B, 11 + A.length)}</div></section>`;
  return {home};
}
