// Practice engine: random questions, answer check (2 % tolerance), hint, and a step-by-step solution for every question.
(function (g) {
"use strict";
const CH = g.CH, F = CH.fmt, sci = CH.sci, sp = CH.sp;
const R = (a, b) => a + Math.random() * (b - a), pick = a => a[Math.floor(Math.random() * a.length)];
const r2 = x => Number(x.toPrecision(2)), r3 = x => Number(x.toPrecision(3));
const nm = s => `${s.name} ${s.html}`;
const col = (s, why, calc) => [why, calc];

// molar-mass data line, only for the atoms of the species
const dataM = s => Object.keys(s.comp).map(a => `M(${a}) = ${F(CH.AT[a], 3)} g/mol`).join(" ; ");
const solutes = ["NaCl", "C6H12O6", "C12H22O11", "KMnO4", "CuSO4"].map(i => sp[i]);
const solids = CH.species.filter(s => s.state !== "g" && s.id !== "Hg" && s.id !== "Cu");
const gases = CH.species.filter(s => s.state === "g");

const GEN = {};
GEN.M = {cat: "formules", label: "Masse molaire", make(){
  const s = pick(CH.species.filter(x => x.id !== "Hg" && x.id !== "Cu")), terms = Object.entries(s.comp).map(([a, n]) => `${n} × ${F(CH.AT[a], 3)}`).join(" + ");
  return {stmt: `Calcule la masse molaire de ${nm(s)}.<br><span class="muted">Données : ${dataM(s)}</span>`, ask: `M(${s.html})`, unit: "g/mol", ans: s.M,
    hint: "Compte les atomes de chaque élément avec les indices de la formule, puis additionne leurs masses molaires atomiques.",
    steps: [["La formule donne le nombre d'atomes de chaque élément.", Object.entries(s.comp).map(([a, n]) => `${n} ${a}`).join(" ; ")], ["On additionne : M = Σ (nombre d'atomes × M atomique).", `M = ${terms} = <b>${F(s.M)} g/mol</b>`]]};
}};
GEN.n_m = {cat: "formules", label: "n à partir de m", make(){
  const s = pick(solids), m = r2(R(5, 150)), n = m / s.M;
  return {stmt: `On dispose de ${F(m)} g de ${nm(s)}, de masse molaire M = ${F(s.M)} g/mol. Quelle est la quantité de matière ?`, ask: "n", unit: "mol", ans: n,
    path: "m → n", hint: "Sur la carte, de m à n on passe par la masse molaire : M = m / n.",
    steps: [["On connaît m et M, on cherche n : n = m / M.", `n = ${F(m)} / ${F(s.M)} = <b>${F(n)} mol</b>`], ["Vérification d'unités : g ÷ (g/mol) = mol.", "✓"]]};
}};
GEN.m_n = {cat: "formules", label: "m à partir de n", make(){
  const s = pick(solids), n = r2(R(.02, 3)), m = n * s.M;
  return {stmt: `Quelle masse de ${nm(s)} (M = ${F(s.M)} g/mol) faut-il pour avoir ${F(n)} mol ?`, ask: "m", unit: "g", ans: m, path: "n → m", hint: "m = n × M.",
    steps: [["On connaît n et M : m = n × M.", `m = ${F(n)} × ${F(s.M)} = <b>${F(m)} g</b>`], ["Vérification d'unités : mol × g/mol = g.", "✓"]]};
}};
GEN.N_n = {cat: "formules", label: "N et n", make(){
  const s = pick(CH.species), n = r2(R(.05, 4)), N = n * CH.NA, rev = Math.random() < .5;
  return rev ? {stmt: `Un échantillon de ${nm(s)} contient ${sci(N, 3)} entités. Quelle est la quantité de matière ? <span class="muted">(N<sub>A</sub> = 6,02×10²³ mol⁻¹)</span>`, ask: "n", unit: "mol", ans: n, path: "N → n", hint: "n = N / N_A.",
      steps: [["On regroupe les entités par paquets de N_A : n = N / N_A.", `n = ${sci(N, 3)} / ${sci(CH.NA, 3)} = <b>${F(n)} mol</b>`]]}
    : {stmt: `Combien d'entités y a-t-il dans ${F(n)} mol de ${nm(s)} ? <span class="muted">(N<sub>A</sub> = 6,02×10²³ mol⁻¹)</span><br><span class="note">Écris par ex. 1,2e24 ou 1,2×10^24.</span>`, ask: "N", unit: "", ans: N, path: "n → N", hint: "N = n × N_A.",
      steps: [["Chaque mole contient N_A entités : N = n × N_A.", `N = ${F(n)} × ${sci(CH.NA, 3)} = <b>${sci(N, 3)}</b>`]]};
}};
GEN.m_N = {cat: "formules", label: "De m à N (2 étapes)", make(){
  const s = pick(solids), m = r2(R(2, 60)), n = m / s.M, N = n * CH.NA;
  return {stmt: `Combien d'entités (molécules ou unités formulaires) y a-t-il dans ${F(m)} g de ${nm(s)} (M = ${F(s.M)} g/mol) ? <br><span class="note">Écris par ex. 1,2e24.</span>`, ask: "N", unit: "", ans: N, path: "m → n → N", hint: "Passe par n : d'abord n = m / M, puis N = n × N_A.",
    steps: [["Étape 1 : de m à n avec M.", `n = ${F(m)} / ${F(s.M)} = ${F(n)} mol`], ["Étape 2 : de n à N avec N_A.", `N = ${F(n)} × ${sci(CH.NA, 3)} = <b>${sci(N, 3)}</b>`]]};
}};
GEN.rho = {cat: "formules", label: "Masse volumique", make(){
  const s = pick([sp.H2O, sp.C2H6O, sp.Hg]), V = pick([10, 20, 25, 50, 75, 100, 250]), m = s.rho * V / 1000;
  return {stmt: `La masse volumique de ${nm(s)} liquide est ρ = ${F(s.rho)} g/L. Quelle est la masse de ${V} mL ?`, ask: "m", unit: "g", ans: m, path: "V<sub>esp</sub> → m", hint: "Attention : ρ est en g/L, convertis les mL en L avant de multiplier.",
    steps: [["Convertir : 1 L = 1000 mL.", `V = ${V} mL = ${F(V / 1000)} L`], ["ρ = m / V, donc m = ρ × V.", `m = ${F(s.rho)} × ${F(V / 1000)} = <b>${F(m)} g</b>`]]};
}};
GEN.gaz = {cat: "formules", label: "Gaz et V_m", make(){
  const s = pick(gases), V = r2(R(.5, 12)), n = V / 24, m = n * s.M, kind = pick(["n", "m", "V"]);
  if (kind === "n") return {stmt: `Un ballon contient ${F(V)} L de ${nm(s)} à 20 °C. Dans ces conditions V<sub>m</sub> = 24,0 L/mol. Quelle est la quantité de matière de gaz ?`, ask: "n", unit: "mol", ans: n, path: "V<sub>gaz</sub> → n", hint: "n = V / V_m, avec V le volume du gaz.",
    steps: [["Le volume est celui du gaz lui-même : n = V / V_m.", `n = ${F(V)} / 24,0 = <b>${F(n)} mol</b>`]]};
  if (kind === "m") return {stmt: `Quelle est la masse de ${F(V)} L de ${nm(s)} à 20 °C (V<sub>m</sub> = 24,0 L/mol ; M = ${F(s.M)} g/mol) ?`, ask: "m", unit: "g", ans: m, path: "V<sub>gaz</sub> → n → m", hint: "Passe par n : n = V / V_m, puis m = n × M.",
    steps: [["Étape 1 : du volume de gaz à n.", `n = ${F(V)} / 24,0 = ${F(n)} mol`], ["Étape 2 : de n à m.", `m = ${F(n)} × ${F(s.M)} = <b>${F(m)} g</b>`]]};
  return {stmt: `Quel volume occupent ${F(m)} g de ${nm(s)} à 20 °C (V<sub>m</sub> = 24,0 L/mol ; M = ${F(s.M)} g/mol) ?`, ask: "V", unit: "L", ans: V, path: "m → n → V<sub>gaz</sub>", hint: "n = m / M, puis V = n × V_m.",
    steps: [["Étape 1 : de m à n.", `n = ${F(m)} / ${F(s.M)} = ${F(n)} mol`], ["Étape 2 : de n au volume de gaz.", `V = n × V_m = ${F(n)} × 24,0 = <b>${F(V)} L</b>`]]};
}};
GEN.diss_m = {cat: "dissolution", label: "Masse à peser", make(){
  const s = pick(solutes), V = pick([50, 100, 200, 250, 500]), C = pick([.05, .1, .2, .25, .5]), n = C * V / 1000, m = n * s.M;
  return {stmt: `On veut préparer ${V} mL de solution de ${nm(s)} à la concentration C = ${F(C)} mol/L (M = ${F(s.M)} g/mol). Quelle masse faut-il peser ?`, ask: "m", unit: "g", ans: m, path: "C → n → m", hint: "D'abord n = C × V (V en litres), puis m = n × M.",
    steps: [["Convertir le volume : V = " + V + " mL.", `V = ${F(V / 1000)} L`], ["Quantité de matière à dissoudre : n = C × V.", `n = ${F(C)} × ${F(V / 1000)} = ${F(n)} mol`], ["Masse à peser : m = n × M.", `m = ${F(n)} × ${F(s.M)} = <b>${F(m)} g</b>`]]};
}};
GEN.diss_C = {cat: "dissolution", label: "Concentration obtenue", make(){
  const s = pick(solutes), V = pick([50, 100, 200, 250, 500]), n0 = pick([.01, .02, .025, .05, .1]), m = r3(n0 * s.M), n = m / s.M, C = n / (V / 1000), Cm = m / (V / 1000);
  const ask = pick(["C", "Cm"]);
  return {stmt: `On dissout ${F(m)} g de ${nm(s)} (M = ${F(s.M)} g/mol) dans une fiole jaugée de ${V} mL, puis on complète jusqu'au trait. Quelle est la concentration ${ask === "C" ? "molaire C" : "massique C<sub>m</sub>"} de la solution ?`,
    ask: ask === "C" ? "C" : "C<sub>m</sub>", unit: ask === "C" ? "mol/L" : "g/L", ans: ask === "C" ? C : Cm, path: ask === "C" ? "m → n → C" : "m → C<sub>m</sub>", hint: ask === "C" ? "n = m / M, puis C = n / V_sol (V_sol = volume de la fiole, en litres)." : "C_m = m / V_sol, avec V_sol en litres.",
    steps: ask === "C" ? [["Quantité de matière : n = m / M.", `n = ${F(m)} / ${F(s.M)} = ${F(n)} mol`], ["Le volume de la solution est celui de la fiole : V = " + V + " mL.", `V<sub>sol</sub> = ${F(V / 1000)} L`], ["C = n / V<sub>sol</sub>.", `C = ${F(n)} / ${F(V / 1000)} = <b>${F(C)} mol/L</b>`]]
      : [["Le volume de la solution est celui de la fiole.", `V<sub>sol</sub> = ${V} mL = ${F(V / 1000)} L`], ["C<sub>m</sub> = m / V<sub>sol</sub>.", `C<sub>m</sub> = ${F(m)} / ${F(V / 1000)} = <b>${F(Cm)} g/L</b>`]]};
}};
GEN.Cm_C = {cat: "dissolution", label: "C ↔ C_m", make(){
  const s = pick(solutes), C = r2(R(.02, .8)), Cm = C * s.M, rev = Math.random() < .5;
  return rev ? {stmt: `Une solution de ${nm(s)} (M = ${F(s.M)} g/mol) a pour concentration massique C<sub>m</sub> = ${F(Cm)} g/L. Quelle est sa concentration molaire ?`, ask: "C", unit: "mol/L", ans: C, path: "C<sub>m</sub> → C", hint: "C = C_m / M : g/L ÷ g/mol = mol/L.",
      steps: [["On divise par M pour passer des grammes aux moles.", `C = C<sub>m</sub> / M = ${F(Cm)} / ${F(s.M)} = <b>${F(C)} mol/L</b>`]]}
    : {stmt: `Une solution de ${nm(s)} (M = ${F(s.M)} g/mol) a pour concentration molaire C = ${F(C)} mol/L. Quelle est sa concentration massique ?`, ask: "C<sub>m</sub>", unit: "g/L", ans: Cm, path: "C → C<sub>m</sub>", hint: "C_m = C × M.",
      steps: [["On multiplie par M pour passer des moles aux grammes.", `C<sub>m</sub> = C × M = ${F(C)} × ${F(s.M)} = <b>${F(Cm)} g/L</b>`]]};
}};
GEN.dil_V0 = {cat: "dilution", label: "Volume à prélever", make(){
  const C0 = pick([1, .5, .2, .1, .05]), Fd = pick([2, 4, 5, 10, 20]), C1 = C0 / Fd, V1 = pick([50, 100, 250]), V0 = V1 / Fd;
  return {stmt: `On dispose d'une solution mère de concentration C<sub>0</sub> = ${F(C0)} mol/L. On veut préparer ${V1} mL de solution fille de concentration C<sub>1</sub> = ${F(C1)} mol/L. Quel volume de solution mère faut-il prélever ?`, ask: "V<sub>0</sub>", unit: "mL", ans: V0, path: "dilution : n conservé", hint: "La quantité de matière ne change pas : C₀ V₀ = C₁ V₁.",
    steps: [["Facteur de dilution : F = C₀ / C₁.", `F = ${F(C0)} / ${F(C1)} = ${F(Fd)}`], ["n est conservé : C₀ V₀ = C₁ V₁, donc V₀ = V₁ / F.", `V<sub>0</sub> = ${V1} / ${F(Fd)} = <b>${F(V0)} mL</b>`], ["Verrerie : pipette jaugée pour V₀, fiole jaugée pour V₁.", `pipette ${F(V0)} mL (ou burette si ce n'est pas une valeur usuelle), fiole ${V1} mL`]]};
}};
GEN.dil_C1 = {cat: "dilution", label: "Concentration après dilution", make(){
  const C0 = pick([1, .5, .2, .1]), V0 = pick([5, 10, 20, 25]), V1 = pick([50, 100, 250, 500].filter(v => v > V0 * 2)), C1 = C0 * V0 / V1;
  return {stmt: `On prélève ${V0} mL d'une solution à ${F(C0)} mol/L et on les verse dans une fiole jaugée de ${V1} mL, puis on complète avec de l'eau distillée jusqu'au trait. Quelle est la concentration de la solution obtenue ?`, ask: "C<sub>1</sub>", unit: "mol/L", ans: C1, path: "dilution : n conservé", hint: "Calcule d'abord n prélevé = C₀ × V₀, puis divise par V₁.",
    steps: [["Quantité de matière prélevée (elle ne change plus ensuite).", `n = C<sub>0</sub> × V<sub>0</sub> = ${F(C0)} × ${F(V0 / 1000)} = ${CH.sci(C0 * V0 / 1000, 3)} mol`], ["Elle est maintenant dans V₁ : C₁ = n / V₁.", `C<sub>1</sub> = ${CH.sci(C0 * V0 / 1000, 3)} / ${F(V1 / 1000)} = <b>${F(C1)} mol/L</b>`]]};
}};
GEN.dil_eau = {cat: "dilution", label: "On ajoute de l'eau", make(){
  const C = pick([.2, .4, .5, 1]), V = pick([20, 50, 100]), Ve = pick([30, 50, 100, 150, 200]), n = C * V / 1000, Cf = n / ((V + Ve) / 1000);
  return {stmt: `À ${V} mL d'une solution à ${F(C)} mol/L, on ajoute ${Ve} mL d'eau (volumes additifs). Quelle est la nouvelle concentration ?`, ask: "C'", unit: "mol/L", ans: Cf, path: "dilution : n conservé", hint: "L'eau n'apporte pas de soluté : n ne change pas, V augmente.",
    steps: [["Quantité de soluté (inchangée).", `n = C × V = ${F(C)} × ${F(V / 1000)} = ${F(n)} mol`], ["Nouveau volume : V' = V + V<sub>eau</sub>.", `V' = ${V} + ${Ve} = ${V + Ve} mL = ${F((V + Ve) / 1000)} L`], ["C' = n / V'.", `C' = ${F(n)} / ${F((V + Ve) / 1000)} = <b>${F(Cf)} mol/L</b>`]]};
}};
GEN.calcaire = {cat: "dissolution", label: "Sol calcaire (sujet truffe, partie 1)", make(){
  const V = pick([48, 60, 72, 85, 96]), m = pick([1.0, 1.2, 1.5, 2.0]), n = V / 1000 / 24.1, mc = n * 100.1, pc = mc / m * 100;
  return {stmt: `Un échantillon de sol de masse ${F(m)} g est attaqué par un excès d'acide chlorhydrique : CaCO<sub>3</sub>(s) + 2 H<sub>3</sub>O⁺ → Ca²⁺ + CO<sub>2</sub>(g) + 3 H<sub>2</sub>O. On recueille ${V} mL de CO<sub>2</sub> (V<sub>m</sub> = 24,1 L/mol ; M(CaCO<sub>3</sub>) = 100,1 g/mol). Quel est le pourcentage massique de CaCO<sub>3</sub> dans le sol ?`, ask: "% de CaCO₃", unit: "%", ans: pc, tol: .03, path: "V<sub>gaz</sub> → n(CO₂) = n(CaCO₃) → m → %", hint: "Un CO₂ formé pour un CaCO₃ consommé : n(CaCO₃) = n(CO₂).",
    steps: [["Volume en litres.", `V = ${V} mL = ${F(V / 1000)} L`], ["Quantité de CO₂ : n = V / V<sub>m</sub>.", `n(CO₂) = ${F(V / 1000)} / 24,1 = ${CH.sci(n, 3)} mol`], ["Coefficients de l'équation : 1 CaCO₃ donne 1 CO₂.", `n(CaCO₃) = n(CO₂) = ${CH.sci(n, 3)} mol`], ["Masse de calcaire : m = n × M.", `m = ${CH.sci(n, 3)} × 100,1 = ${F(mc)} g`], ["Pourcentage dans le sol.", `${F(mc)} / ${F(m)} × 100 = <b>${F(pc)} %</b>`]]};
}};

// ---------------- dosage par étalonnage ----------------
GEN.gamme = {cat: "gamme", label: "Préparer un étalon", make(){
  const C0 = pick([1e-2, 5e-3, 2e-2]), Vf = pick([50, 100]), V0 = pick([2, 5, 10, 20, 25]), C1 = C0 * V0 / Vf;
  return {stmt: `On veut préparer ${Vf} mL de solution étalon à C = ${sci(C1, 3)} mol/L à partir d'une solution mère S₀ à ${sci(C0, 3)} mol/L. Quel volume de S₀ faut-il prélever ?`, ask: "V<sub>0</sub>", unit: "mL", ans: V0, path: "dilution : n conservé", hint: "C₀ V₀ = C V, donc V₀ = C V / C₀.",
    steps: [["La quantité de matière est conservée.", "C₀ × V₀ = C × V"], ["On isole V₀.", `V<sub>0</sub> = C × V / C<sub>0</sub> = ${sci(C1, 3)} × ${Vf} / ${sci(C0, 3)} = <b>${F(V0)} mL</b>`]]};
}};
GEN.k = {cat: "etalonnage", label: "Coefficient k", make(){
  const k = pick([2400, 9.0, 10.1, 150, 1200, 480]), A = r2(R(.1, 1.1)), C = Number((A / k).toPrecision(3)), kk = A / C;
  return {stmt: `Pour une solution étalon de concentration ${sci(C, 3)} mol/L, on mesure A = ${F(A, 2)}. Les points d'étalonnage sont alignés sur une droite passant par l'origine : A = k × C. Calcule k.`, ask: "k", unit: "L/mol", ans: kk, path: "A = k × C", hint: "k = A / C : c'est la pente de la droite.",
    steps: [["La droite passe par l'origine : A est proportionnelle à C (loi de Beer-Lambert).", "A = k × C"], ["k est la pente.", `k = A / C = ${F(A, 2)} / ${sci(C, 3)} = <b>${F(kk)} L/mol</b>`]]};
}};
GEN.Cx = {cat: "etalonnage", label: "Lire C sur la droite", make(){
  const k = pick([2400, 9.0, 10.1, 150, 1200]), A = r2(R(.1, 1.1));
  return {stmt: `La droite d'étalonnage a pour équation A = ${F(k)} × C (C en mol/L). Une solution inconnue a pour absorbance A = ${F(A, 2)}. Quelle est sa concentration ?`, ask: "C", unit: "mol/L", ans: A / k, path: "A → C", hint: "C = A / k.",
    steps: [["On remplace A dans A = k × C et on isole C.", `C = A / k = ${F(A, 2)} / ${F(k)} = <b>${sci(A / k, 3)} mol/L</b>`], ["La valeur est-elle dans la gamme des étalons ? (sinon, il faut diluer.)", "à vérifier sur la courbe"]]};
}};
GEN.dilue = {cat: "etalonnage", label: "Échantillon dilué", make(){
  const k = pick([2400, 9.0, 10.1, 150]), Fd = pick([2, 5, 10, 20, 50]), A = r2(R(.1, 1.0)), Cd = A / k;
  return {stmt: `Avant la mesure, un échantillon a été dilué ${Fd} fois. La droite d'étalonnage est A = ${F(k)} × C (C en mol/L) et on mesure A = ${F(A, 2)} sur la solution diluée. Quelle est la concentration de l'échantillon <b>d'origine</b> ?`, ask: "C", unit: "mol/L", ans: Cd * Fd, path: "A → C<sub>diluée</sub> → C", hint: "Deux étapes : lis C de la solution diluée, puis multiplie par le facteur de dilution.",
    steps: [["Concentration de la solution diluée (celle qu'on a mesurée).", `C<sub>diluée</sub> = A / k = ${F(A, 2)} / ${F(k)} = ${sci(Cd, 3)} mol/L`], ["L'échantillon d'origine est F fois plus concentré.", `C = F × C<sub>diluée</sub> = ${Fd} × ${sci(Cd, 3)} = <b>${sci(Cd * Fd, 3)} mol/L</b>`]]};
}};
GEN.cond = {cat: "etalonnage", label: "Conductimétrie", make(){
  const k = 126, Fd = pick([1, 10, 20, 50]), Cx = r2(R(1.5, 4.5)) * 1e-3, sig = r3(k * Cx), s = sp.NaCl, Co = Cx * Fd;
  return {stmt: `Dosage du sel dans une solution par conductimétrie. La droite d'étalonnage est σ = ${F(k)} × C (σ en mS/cm, C en mol/L).${Fd > 1 ? ` L'échantillon est dilué ${Fd} fois avant la mesure.` : ""} On mesure σ = ${F(sig, 3)} mS/cm. Quelle est la concentration <b>massique</b> en NaCl de l'échantillon d'origine ? (M = 58,5 g/mol)`, ask: "C<sub>m</sub>", unit: "g/L", ans: Co * s.M, path: "σ → C → (×F) → C<sub>m</sub>", hint: "C = σ / k, puis × F, puis C_m = C × M.",
    steps: [["Concentration molaire mesurée : C = σ / k.", `C = ${F(sig, 3)} / ${F(k)} = ${sci(Cx, 3)} mol/L`], ...(Fd > 1 ? [["Correction de la dilution.", `C<sub>origine</sub> = ${Fd} × ${sci(Cx, 3)} = ${sci(Co, 3)} mol/L`]] : []), ["Concentration massique : C<sub>m</sub> = C × M.", `C<sub>m</sub> = ${sci(Co, 3)} × 58,5 = <b>${F(Co * s.M)} g/L</b>`]]};
}};
GEN.sol = {cat: "etalonnage", label: "Teneur dans le sol (sujet truffe, partie 2)", make(){
  const k = pick([10.1, 9.5, 10.5]), Cs = r2(R(2, 8)) * 1e-3, A = r3(k * Cs), msol = pick([250, 500, 1000]), V = 1.00, M = 63.5, Cm = Cs * M, gkg = Cm * V / (msol / 1000);
  return {stmt: `Un échantillon de ${F(msol)} g de sol est traité pour obtenir 1,00 L de solution contenant des ions Cu²⁺. Le dosage par spectrophotométrie donne A = ${F(A, 3)}, avec la droite d'étalonnage A = ${F(k)} × C (C en mol/L). M(Cu) = 63,5 g/mol. Quelle est la teneur en cuivre du sol, en g par kg de sol ?`, ask: "teneur", unit: "g/kg", ans: gkg, tol: .03, path: "A → C → C<sub>m</sub> → m → g/kg", hint: "C = A/k ; C_m = C × M ; masse dans 1,00 L ; divise par la masse de sol en kg.",
    steps: [["Concentration en Cu²⁺ dans la solution de sol : C = A / k.", `C = ${F(A, 3)} / ${F(k)} = ${sci(Cs, 3)} mol/L`], ["Concentration massique : C<sub>m</sub> = C × M.", `C<sub>m</sub> = ${sci(Cs, 3)} × 63,5 = ${F(Cm)} g/L`], ["Masse de cuivre dans la fiole de 1,00 L.", `m = C<sub>m</sub> × V = ${F(Cm)} × 1,00 = ${F(Cm)} g`], ["Rapportée à 1 kg de sol.", `${F(Cm)} g / ${F(msol / 1000)} kg = <b>${F(gkg)} g/kg</b>`]]};
}};
CH.GEN = GEN;

// ---------------- UI ----------------
CH.quiz = function (root, keys, cats) {
  const $ = s => root.querySelector(s);
  let q = null, active = new Set(cats.map(c => c.id)), score = {ok: 0, tot: 0}, counted = false;
  root.innerHTML = `<div class="group" id="qcats" role="group" aria-label="Thèmes"><span class="l">Thèmes</span>${cats.map(c => `<button data-c="${c.id}" aria-pressed="true">${c.label}</button>`).join("")}<span class="score" id="qscore" style="margin-left:auto"></span></div>
<div class="sheet q" style="margin-top:12px"><div class="note" id="qpath"></div><div class="stmt" id="qstmt"></div>
<div class="group"><label id="qask" for="qin"></label><input id="qin" type="text" inputmode="decimal" class="wide" autocomplete="off"><span class="unit" id="qunit"></span>
<button id="qchk" class="primary">Vérifier</button><button id="qhint">Indice</button><button id="qsol">Solution pas à pas</button><button id="qnext">Question suivante →</button></div>
<div class="status" id="qst" aria-live="polite"></div><div class="hint" id="qh" hidden></div>
<ol class="steps" id="qsteps" hidden></ol></div>`;
  const upd = () => { $("#qscore").textContent = `Réussi du premier coup : ${score.ok} / ${score.tot}`; };
  const next = () => {
    const ids = keys.filter(k => active.has(GEN[k].cat)); if (!ids.length) { $("#qstmt").textContent = "Choisis au moins un thème."; return; }
    let k; do { k = pick(ids); } while (ids.length > 1 && q && q.k === k && Math.random() < .8);
    q = GEN[k].make(); q.k = k; counted = false;
    $("#qstmt").innerHTML = q.stmt; $("#qask").innerHTML = q.ask + " ="; $("#qunit").innerHTML = q.unit; $("#qin").value = "";
    $("#qpath").innerHTML = q.path ? `Chemin sur la carte : ${q.path}` : ""; $("#qst").textContent = ""; $("#qst").className = "status";
    $("#qh").hidden = true; $("#qsteps").hidden = true; $("#qin").focus(); upd();
  };
  $("#qchk").onclick = () => {
    const v = CH.parse($("#qin").value);
    if (!isFinite(v)) { $("#qst").className = "status bad"; $("#qst").textContent = "Entre un nombre (ex. 0,25 ou 1,2e24)."; return; }
    const ok = CH.close(v, q.ans, q.tol || .02);
    if (!counted) { counted = true; score.tot++; if (ok) score.ok++; upd(); }
    $("#qst").className = "status " + (ok ? "ok" : "bad");
    $("#qst").innerHTML = ok ? `Juste ! ${q.ask} = ${F(q.ans)} ${q.unit}` : `Pas tout à fait. Regarde l'indice, ou la solution pas à pas.`;
    if (ok) show();
  };
  const show = () => { $("#qsteps").innerHTML = q.steps.map(([w, c]) => `<li><div><span class="why">${w}</span>${c}</div></li>`).join("") + `<li><div><span class="why">Réponse</span><b>${q.ask} = ${F(q.ans)} ${q.unit}</b></div></li>`; $("#qsteps").hidden = false; };
  $("#qhint").onclick = () => { $("#qh").innerHTML = q.hint; $("#qh").hidden = false; };
  $("#qsol").onclick = () => { if (!counted) { counted = true; score.tot++; upd(); } show(); };
  $("#qnext").onclick = next;
  $("#qin").addEventListener("keydown", e => { if (e.key === "Enter") $("#qchk").click(); });
  $("#qcats").addEventListener("click", e => { const b = e.target.closest("button[data-c]"); if (!b) return; const c = b.dataset.c; active.has(c) ? active.delete(c) : active.add(c); b.setAttribute("aria-pressed", active.has(c)); next(); });
  next();
};
})(window);
