// French written pages of the chemistry section (twins of chimie_en.mjs: same structure, same computed numbers).
export default function (ctx) {
  const {pg, table, steps, ex, mapBlock, f, e, CH, num, L} = ctx;
  const {n36, V50, m50, nSalt, sug, nSug, Nsug, mEt, nEt, NEt, nB, mCO2, mO2, NB, CmCa, CCa, nCaB, mCaB, nCu, VCu, m1, n3, nCuSO4, CCuSO4, nCO2, mCaCO3, pCaCO3, stdC, stdA, ptsT, kT, fitT, CsT, CmsT, gkgT, mnC, mnA, kMn, Cmn, Cmn2, naC, naS, kNa, CNa, CNa0, mCuFlask, eC, eA, ptsE, kE, k0E, fitE, r2E, CbE, CbE0, CbE2, dailyE} = num;

  // ---------- 1. la carte des formules ----------
  pg("chimie_formules.html", {title: "Quantité de matière : la carte des formules", eyebrow: "Chimie · Cours 1 · Fiche",
    lede: "Huit grandeurs, un centre : n. Tout ce que tu pèses, mesures dans une fiole ou comptes peut se convertir en nombre de moles n, puis de n en n'importe quoi d'autre. Cette page est la base des deux cours de chimie.",
    body: `<section><h2>1 · Pourquoi la mole ?</h2>
<p>Les atomes et les molécules sont beaucoup trop petits pour être comptés un par un : une seule goutte d'eau contient environ 10²¹ molécules. Les chimistes comptent donc par <b>paquets</b>. Une mole est un paquet de N<sub>A</sub> = 6,02×10²³ entités (atomes, molécules, ions), comme une douzaine est un paquet de 12.</p>
<p>L'astuce qui la rend utile : une mole de n'importe quelle substance pèse sa <b>masse molaire M</b> en grammes. Compter revient à peser.</p></section>
<section><h2>2 · La carte</h2>
${mapBlock}
<ul style="margin-top:12px"><li>Chaque <b>case</b> est une grandeur, avec son symbole et son unité. Chaque <b>flèche</b> est une conversion ; la lettre dessus est le nombre par lequel on multiplie ou divise.</li>
<li><b>n est le centre.</b> Pour aller d'une case à une autre, on passe par n. Ne saute jamais directement de m à N, ou de V à m.</li>
<li>La rangée du haut concerne l'<b>espèce pure</b> (ce qu'on pèse ou mesure). La rangée du bas concerne la <b>solution</b> dans laquelle elle est dissoute ; V<sub>sol</sub> (en pointillés) est le volume de cette solution.</li>
<li>ρ, M et les autres constantes appartiennent à l'espèce, pas à ton échantillon : on les cherche, ou l'énoncé les donne.</li></ul>
<p>Pour l'essayer en direct : <a href="carte_formules.html">La carte des conversions</a>.</p></section>
<section><h2>3 · Toutes les formules</h2>
${table(["Lien", "Formule", "Constante", "Vérification d'unités"], [
  ["V<sub>esp</sub> ↔ m", "ρ = m / V<sub>esp</sub>", "ρ en g/L (espèce)", "g/L × L = g"],
  ["m ↔ n", "M = m / n  ⇒  n = m / M", "M en g/mol (espèce)", "g ÷ g/mol = mol"],
  ["n ↔ N", "N = n × N<sub>A</sub>  ⇒  n = N / N<sub>A</sub>", "N<sub>A</sub> = 6,02×10²³ mol⁻¹", "mol × mol⁻¹ = un nombre"],
  ["n ↔ V<sub>gaz</sub>", "n = V / V<sub>m</sub>", "V<sub>m</sub> = 24,0 L/mol (20 °C, 1 bar)", "L ÷ L/mol = mol"],
  ["m → C<sub>m</sub>", "C<sub>m</sub> = m / V<sub>sol</sub>", "aucune", "g ÷ L = g/L"],
  ["n → C", "C = n / V<sub>sol</sub>", "aucune", "mol ÷ L = mol/L"],
  ["C ↔ C<sub>m</sub>", "C<sub>m</sub> = C × M", "M", "mol/L × g/mol = g/L"]])}
<p class="muted">La vérification d'unités est ton filet de sécurité : si les unités à droite ne donnent pas l'unité de gauche, la formule est à l'envers.</p></section>
<section><h2>4 · Un lien à la fois</h2>
<h3 class="fm">ρ = m / V<sub>esp</sub> · masse volumique</h3>
<p>« Combien pèse un litre de l'espèce ? » Eau : 1000 g/L (= 1,00 g/mL). Éthanol : 789 g/L. Elle permet de passer d'un <b>volume de liquide ou de solide</b> à sa masse, et inversement.</p>
${steps([["50 mL d'éthanol : on convertit d'abord, 1 L = 1000 mL.", "V = 50 mL = 0,050 L"], ["m = ρ × V.", `m = 789 × 0,050 = <b>${f(m50)} g</b>`]])}
<div class="key warn"><p><b>Piège :</b> ρ en g/mL ou en g/L. 0,789 g/mL = 789 g/L. Et toujours convertir les mL en L avant de multiplier.</p></div>
<h3 class="fm">M = m / n · masse molaire</h3>
<p>La masse d'une mole, en g/mol. On la lit dans le tableau périodique et on additionne les atomes de la formule : M(H<sub>2</sub>O) = 2×1,0 + 16,0 = 18,0 g/mol ; M(CO<sub>2</sub>) = 12,0 + 2×16,0 = 44,0 g/mol.</p>
${steps([["Combien de moles dans 36 g d'eau ? n = m / M.", `n = 36 / 18,0 = <b>${f(n36)} mol</b>`]])}
<p class="muted">Astuce du triangle : m en haut, n et M en bas. Cache celle que tu cherches : m = n × M, n = m / M, M = m / n.</p>
<h3 class="fm">N = n × N<sub>A</sub> · nombre d'entités</h3>
<p>N compte les entités elles-mêmes (atomes, molécules ou ions). Ta note sur les unités le dit bien : <b>atomes = mol × atomes/mol</b>. N<sub>A</sub> est le facteur « atomes par mole ».</p>
${steps([["0,50 mol d'eau : combien de molécules ?", `N = 0,50 × 6,02×10²³ = <b>${e(.5 * CH.NA)}</b>`], ["Chaque H<sub>2</sub>O a 3 atomes, donc atomes = 3 × N.", `${e(3 * .5 * CH.NA)} atomes`]])}
<h3 class="fm">C = n / V<sub>sol</sub> et C<sub>m</sub> = m / V<sub>sol</sub> · concentrations</h3>
<p>Toutes deux disent « combien de soluté par litre de <b>solution</b> » : C en moles (mol/L), C<sub>m</sub> en grammes (g/L).</p>
${steps([["5,85 g de NaCl (M = 58,5 g/mol) dissous pour obtenir 250 mL de solution. D'abord n.", `n = 5,85 / 58,5 = ${f(nSalt)} mol`], ["V<sub>sol</sub> = 250 mL = 0,250 L.", `C = 0,100 / 0,250 = <b>${f(nSalt / .25)} mol/L</b>`], ["Et en grammes par litre.", `C<sub>m</sub> = 5,85 / 0,250 = <b>${f(5.85 / .25)} g/L</b>`]])}
<div class="key warn"><p><b>Piège :</b> ρ et C<sub>m</sub> sont toutes deux en g/L, mais ce n'est pas la même chose. ρ divise par le volume de l'<b>espèce pure</b> (V<sub>esp</sub>) ; C<sub>m</sub> divise par le volume de la <b>solution entière</b> (V<sub>sol</sub>).</p></div>
<h3 class="fm">C<sub>m</sub> = C × M · le pont entre les deux</h3>
<p>On part de C<sub>m</sub> = m / V et on remplace m par n × M : C<sub>m</sub> = (n × M) / V = (n / V) × M = C × M. En unités : g/L = mol/L × g/mol.</p>
${steps([["À partir de C = 0,100 mol/L : on multiplie par M.", `C<sub>m</sub> = 0,100 × 58,5 = <b>${f(5.85)} g/L</b> (comme ci-dessus ✓)`], ["De C<sub>m</sub> à C : on divise par M.", `C = 5,85 / 58,5 = ${f(.1)} mol/L`]])}
<h3 class="fm">n = V / V<sub>m</sub> · les gaz</h3>
<p>Dans des conditions données, une mole de <b>n'importe quel</b> gaz occupe le même volume V<sub>m</sub>. Sur ta fiche : V<sub>m</sub> = 24,0 L/mol à 20 °C et 1 bar. Il varie avec la température et la pression (22,4 L/mol à 0 °C et 1 atm), donc <b>l'énoncé te le donne</b> : utilise toujours la valeur donnée (le sujet truffe utilise 24,1 L/mol).</p>
<div class="key"><p>Ta question sur la fiche : « V : espèce ou solution ? ». <b>Réponse : l'espèce.</b> Dans n = V / V<sub>m</sub>, V est le volume du <b>gaz lui-même</b>. Un gaz qui se dégage d'une réaction se mesure dans une éprouvette : ce volume est V. Ce n'est jamais le volume d'une solution.</p></div>
${steps([["6,0 L de CO<sub>2</sub> à 20 °C.", `n = 6,0 / 24,0 = ${f(.25)} mol`], ["Puis la masse avec M = 44,0 g/mol.", `m = 0,250 × 44,0 = <b>${f(11)} g</b>`], ["Bonus : la masse volumique d'un gaz vaut M / V<sub>m</sub>.", `ρ(CO₂) = 44,0 / 24,0 = ${f(44 / 24)} g/L`]])}</section>
<section><h2>5 · Méthode et pièges</h2>
<ol><li><b>Écris ce que tu connais</b>, avec son unité, et ce qui est demandé.</li><li><b>Trouve le chemin</b> sur la carte de la case connue à la case demandée, en passant par n.</li><li><b>Convertis les unités d'abord</b> (mL → L, mg → g, kg → g).</li><li><b>Calcule étape par étape</b>, en gardant les valeurs non arrondies dans la calculatrice ; arrondis à la fin à 3 chiffres significatifs.</li><li><b>Vérifie</b> l'unité et l'ordre de grandeur.</li></ol>
${table(["Piège", "Remède"], [["mL utilisés comme des L", "Diviser par 1000 avant chaque formule"], ["ρ confondue avec C<sub>m</sub>", "V<sub>esp</sub> (espèce pure) ou V<sub>sol</sub> (solution finale)"], ["V<sub>m</sub> = 24 L/mol utilisé pour un liquide", "V<sub>m</sub> ne vaut que pour les gaz"], ["Sauter n", "m, N, V<sub>gaz</sub>, C se relient tous par n"], ["Oublier les atomes par molécule", "N compte les molécules ; atomes = N × atomes par molécule"]])}
<p>Ensuite : <a href="carte_formules.html">joue avec la carte</a>, puis <a href="labo_formules.html">le labo</a>.</p></section>`});

  // ---------- 2. exemples : formules ----------
  pg("chimie_exemples.html", {title: "Exemples corrigés : les formules", eyebrow: "Chimie · Cours 1 · Corrigé",
    lede: "Cinq exemples corrigés qui utilisent toute la carte. Pour chacun : les données, le chemin par n, et chaque étape avec son unité.",
    body: `${ex("1 · Un morceau de sucre", "Un morceau de sucre (saccharose, C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) pèse 5,0 g. Données : M(C) = 12,0 ; M(H) = 1,0 ; M(O) = 16,0 g/mol. Trouver M, n, le nombre de molécules et le nombre d'atomes de carbone.", "m → n → N",
      [["Masse molaire d'après la formule : 12 C, 22 H, 11 O.", `M = 12×12,0 + 22×1,0 + 11×16,0 = ${f(342)} g/mol`], ["Moles : n = m / M.", `n = 5,0 / 342 = <b>${f(nSug)} mol</b>`], ["Molécules : N = n × N<sub>A</sub>. Garde n non arrondi dans la calculatrice.", `N = ${f(nSug, 6)} × 6,02×10²³ = <b>${e(Nsug)}</b>`], ["Chaque molécule contient 12 atomes de carbone.", `N(C) = 12 × ${e(Nsug)} = <b>${e(12 * Nsug)}</b>`]])}
${ex("2 · Un verre d'éthanol", "100 mL d'éthanol liquide, C<sub>2</sub>H<sub>6</sub>O, ρ = 789 g/L, M = 46,0 g/mol. Trouver m, n et N. Puis l'échantillon est complété avec de l'eau pour faire exactement 0,500 L de solution : trouver C et C<sub>m</sub>.", "V<sub>esp</sub> → m → n → N, puis n → C",
      [["Convertir 100 mL en litres.", "V<sub>esp</sub> = 0,100 L"], ["Masse à partir de la masse volumique : m = ρ × V<sub>esp</sub>.", `m = 789 × 0,100 = <b>${f(mEt)} g</b>`], ["Moles : n = m / M.", `n = ${f(mEt)} / 46,0 = <b>${f(nEt)} mol</b>`], ["Molécules.", `N = ${f(nEt)} × 6,02×10²³ = <b>${e(NEt)}</b>`], ["Dans 0,500 L de solution : C = n / V<sub>sol</sub> (les 100 mL d'éthanol ne sont <i>pas</i> V<sub>sol</sub>).", `C = ${f(nEt)} / 0,500 = <b>${f(nEt / .5)} mol/L</b>`], ["Et C<sub>m</sub> = C × M, ou m / V<sub>sol</sub>.", `C<sub>m</sub> = ${f(mEt)} / 0,500 = <b>${f(mEt / .5)} g/L</b>`]])}
${ex("3 · Deux ballons", "Deux ballons de 3,0 L chacun, l'un de CO<sub>2</sub>, l'autre de O<sub>2</sub>, à 20 °C (V<sub>m</sub> = 24,0 L/mol). M(CO<sub>2</sub>) = 44,0 ; M(O<sub>2</sub>) = 32,0 g/mol. Comparer n, m et N, et trouver la masse volumique du CO<sub>2</sub>.", "V<sub>gaz</sub> → n → m et N",
      [["Même volume de gaz, mêmes conditions : n = V / V<sub>m</sub>. C'est la même chose pour les deux gaz.", `n = 3,0 / 24,0 = <b>${f(nB)} mol</b>`], ["Même n, donc même nombre de molécules (Avogadro–Ampère).", `N = ${f(nB)} × 6,02×10²³ = <b>${e(NB)}</b> molécules dans chacun`], ["Mais les masses diffèrent car M diffère.", `m(CO₂) = ${f(nB)} × 44,0 = <b>${f(mCO2)} g</b> ; m(O₂) = ${f(nB)} × 32,0 = <b>${f(mO2)} g</b>`], ["Masse volumique d'un gaz : ρ = M / V<sub>m</sub>.", `ρ(CO₂) = 44,0 / 24,0 = <b>${f(44 / 24)} g/L</b>, plus lourd que l'air (≈ 1,2 g/L)`]])}
${ex("4 · Une étiquette d'eau minérale", "Une bouteille de 1,50 L indique : calcium Ca²⁺ 80 mg/L. M(Ca) = 40,1 g/mol. Trouver C, la masse et le nombre d'ions calcium dans la bouteille.", "C<sub>m</sub> → C → n → N",
      [["Convertir l'étiquette en g/L (1 g = 1000 mg).", `C<sub>m</sub> = 80 mg/L = ${f(CmCa)} g/L`], ["C = C<sub>m</sub> / M.", `C = ${f(CmCa)} / 40,1 = <b>${e(CCa)} mol/L</b>`], ["Masse dans la bouteille : m = C<sub>m</sub> × V.", `m = ${f(CmCa)} × 1,50 = <b>${f(mCaB)} g</b> (120 mg)`], ["Moles dans la bouteille : n = C × V.", `n = ${e(CCa)} × 1,50 = <b>${e(nCaB)} mol</b>`], ["Ions : N = n × N<sub>A</sub>.", `N = ${e(nCaB)} × 6,02×10²³ = <b>${e(nCaB * CH.NA)}</b>`]])}
${ex("5 · Un fil de cuivre", "Un morceau de fil de cuivre a une masse de 12,7 g. M(Cu) = 63,5 g/mol, ρ(Cu) = 8960 g/L. Trouver n, le nombre d'atomes et le volume du fil.", "m → n → N, et m → V<sub>esp</sub>",
      [["Moles : n = m / M.", `n = 12,7 / 63,5 = <b>${f(nCu)} mol</b>`], ["Atomes (le cuivre est formé d'atomes isolés) : N = n × N<sub>A</sub>.", `N = ${f(nCu)} × 6,02×10²³ = <b>${e(nCu * CH.NA)}</b> atomes`], ["Volume, avec la masse volumique utilisée à l'envers : V<sub>esp</sub> = m / ρ.", `V = 12,7 / 8960 = ${e(VCu)} L = <b>${f(VCu * 1000)} mL</b>`]])}`});

  // ---------- 3. cours dissolution et dilution ----------
  pg("dissolution_dilution.html", {title: "Dissolution et dilution : le cours", eyebrow: "Chimie · Cours 1 · Fiche",
    lede: "Deux gestes de laboratoire construits sur C = n / V : dissoudre un solide pour faire une solution de concentration connue, puis la diluer sans changer la quantité de soluté.",
    body: `<section><h2>1 · Vocabulaire</h2>
<ul><li><b>Soluté</b> : ce qui se dissout. <b>Solvant</b> : ce dans quoi il se dissout (l'eau : solution <i>aqueuse</i>). <b>Solution</b> : le mélange.</li>
<li><b>Concentration apportée</b> : la concentration de soluté que tu <i>introduis</i>, C = n(soluté introduit) / V<sub>sol</sub>.</li>
<li>Un solide ionique se sépare en ions en se dissolvant. NaCl(s) → Na⁺(aq) + Cl⁻(aq) : une unité formulaire donne un Na⁺ et un Cl⁻, donc [Na⁺] = [Cl⁻] = C. De même CuSO<sub>4</sub>(s) → Cu²⁺(aq) + SO<sub>4</sub><sup>2−</sup>(aq), donc [Cu²⁺] = C. Pour CaCl<sub>2</sub> on aurait [Cl⁻] = 2C.</li></ul></section>
<section><h2>2 · Dissolution : quelle masse peser ?</h2>
<p>On veut V<sub>sol</sub> d'une solution de concentration C. On passe par n :</p>
<p class="formula">n = C × V<sub>sol</sub>   puis   m = n × M   ⇒   m = C × V<sub>sol</sub> × M</p>
<p>Chemin sur la carte : C → n → m.</p>
<h3>Protocole (fiole jaugée)</h3>
<ol><li><b>Calculer</b> m, puis le <b>peser</b> (balance, coupelle de pesée, spatule). Noter la masse réellement pesée.</li>
<li><b>Introduire</b> le solide dans la fiole jaugée avec un entonnoir. Rincer la coupelle et l'entonnoir avec de l'eau distillée dans la fiole.</li>
<li><b>Dissoudre</b> : ajouter de l'eau distillée jusqu'aux deux tiers environ, boucher, agiter jusqu'à disparition du solide.</li>
<li><b>Compléter jusqu'au trait de jauge</b> avec de l'eau distillée, les dernières gouttes à la pipette Pasteur ; le bas du ménisque est sur le trait, l'œil au même niveau.</li>
<li><b>Homogénéiser</b> : boucher et retourner plusieurs fois.</li></ol>
<div class="key warn"><p>V<sub>sol</sub> est le volume de la <b>solution finale</b>, le trait de la fiole, et non le volume d'eau versée : le solide prend de la place. C'est pourquoi on complète jusqu'au trait <i>après</i> avoir dissous.</p></div>
<p>Essaie les cinq étapes dans <a href="labo_dilution.html">Labo : dissoudre et diluer</a>.</p></section>
<section><h2>3 · Dilution : n ne change pas</h2>
<p>On part d'une <b>solution mère</b> (concentration C<sub>0</sub>). On en prélève un volume V<sub>0</sub>, on le verse dans une fiole de volume V<sub>1</sub>, on complète jusqu'au trait avec de l'eau. On obtient une <b>solution fille</b> de concentration C<sub>1</sub>.</p>
<p>On n'a ajouté que de l'eau, donc la quantité de soluté est la même avant et après :</p>
<p class="formula">n = C<sub>0</sub> V<sub>0</sub> = C<sub>1</sub> V<sub>1</sub></p>
<p>Le <b>facteur de dilution</b> dit de combien on a dilué :</p>
<p class="formula">F = C<sub>0</sub> / C<sub>1</sub> = V<sub>1</sub> / V<sub>0</sub>  &nbsp;(F &gt; 1)</p>
<p>Formes pratiques : <b>V<sub>0</sub> = V<sub>1</sub> / F</b> (combien de mère prélever) et <b>C<sub>1</sub> = C<sub>0</sub> / F</b>. Vérification : la fille est toujours <i>moins</i> concentrée que la mère.</p>
<h3>Protocole</h3>
<ol><li>Verser un peu de solution mère dans un <b>bécher</b> (ne jamais pipeter directement dans le flacon).</li>
<li>Rincer la <b>pipette jaugée</b> avec un peu de solution mère, puis la remplir au-dessus du trait avec une propipette et ajuster au trait.</li>
<li>La vider dans la <b>fiole jaugée</b> de volume V<sub>1</sub>.</li>
<li>Ajouter de l'eau distillée aux deux tiers, boucher et agiter, puis compléter jusqu'au trait, boucher et retourner.</li></ol>
<h3>Quelle verrerie ?</h3>
${table(["Verrerie", "Précision", "Usage"], [["Pipette jaugée (1, 2, 5, 10, 20, 25 mL)", "élevée : un trait (ou deux)", "prélever V<sub>0</sub> de solution mère"], ["Fiole jaugée (25 … 1000 mL)", "élevée : un trait", "préparer V<sub>1</sub> : le volume final"], ["Burette graduée", "bonne", "volumes qu'aucune pipette ne donne (ex. 40,0 mL)"], ["Éprouvette graduée", "faible", "volumes approximatifs seulement"], ["Bécher", "aucune", "contenir, verser, rincer ; jamais pour mesurer"]])}
<h3>Une gamme de solutions étalons</h3>
<p>Pour faire plusieurs solutions à partir d'une seule mère, on répète la dilution avec des V<sub>0</sub> différents dans des fioles de même V<sub>1</sub>. Avec S<sub>0</sub> = 1,00×10⁻² mol/L et des fioles de 50,0 mL (le sujet truffe), V<sub>0</sub> = C × 50,0 / C<sub>0</sub> :</p>
${table(["Solution", "C (mol/L)", "F", "V<sub>0</sub> à prélever"], [1e-3, 2e-3, 5e-3, 8e-3].map((c, i) => [`S<sub>${i + 1}</sub>`, e(c), f(1e-2 / c), `${f(c * 50 / 1e-2)} mL`]))}
<p class="muted">40,0 mL n'est pas une pipette courante : utiliser une burette, ou la pipette de 20,0 mL deux fois. Cette gamme sert dans le <a href="${L("dosage_cours.html")}">cours sur le dosage</a>.</p>
<h3>Quand F est très grand</h3>
<p>Diluer en <b>deux étapes</b> : F = F<sub>1</sub> × F<sub>2</sub>. Passer de 1,0 mol/L à 1,0×10⁻⁴ mol/L (F = 10 000) en une seule étape demanderait 0,01 mL de solution mère. Deux étapes de F = 100 (1 mL dans une fiole de 100 mL, deux fois) sont précises et faciles.</p></section>
<section><h2>4 · Aide-mémoire</h2>
${table(["Tâche", "Formules", "Chemin"], [["Peser pour une C et un V visés", "m = C × V × M", "C → n → m"], ["Concentration à partir d'une masse pesée", "C = m / (M × V)", "m → n → C"], ["Changer de type de concentration", "C<sub>m</sub> = C × M", "C ↔ C<sub>m</sub>"], ["Volume de mère à prélever", "V<sub>0</sub> = C<sub>1</sub> V<sub>1</sub> / C<sub>0</sub> = V<sub>1</sub> / F", "n conservé"], ["Concentration après ajout d'eau", "C' = C V / (V + V<sub>eau</sub>)", "n conservé"]])}
<h3>Erreurs fréquentes</h3>
<ul><li>Utiliser le volume d'eau ajoutée au lieu du volume de la solution finale.</li><li>Confondre C<sub>0</sub>V<sub>0</sub> = C<sub>1</sub>V<sub>1</sub> : la mère est l'indice <b>0</b> (la plus grande C, le plus petit V).</li><li>Laisser des volumes en mL quand C est en mol/L. Dans C<sub>0</sub>V<sub>0</sub> = C<sub>1</sub>V<sub>1</sub> on peut garder les mL <i>si les deux volumes sont en mL</i> ; pour n = C × V il faut des L.</li><li>Pipeter dans le flacon de stock, ou dépasser le trait : on ne peut pas reprendre de solution.</li></ul></section>`});

  // ---------- 4. exemples : dissolution et dilution ----------
  pg("dilution_exemples.html", {title: "Exemples corrigés : dissolution et dilution", eyebrow: "Chimie · Cours 1 · Corrigé",
    lede: "Sept problèmes corrigés. Chacun donne les données, le chemin par n et chaque étape.",
    body: `${ex("1 · Quelle masse de NaCl peser ?", "Préparer 250 mL d'une solution de chlorure de sodium à C = 0,100 mol/L. M(NaCl) = 58,5 g/mol.", "C → n → m",
      [["Volume en litres.", "V<sub>sol</sub> = 250 mL = 0,250 L"], ["Moles à dissoudre : n = C × V.", `n = 0,100 × 0,250 = ${f(.025)} mol`], ["Masse à peser : m = n × M.", `m = ${f(.025)} × 58,5 = <b>${f(m1)} g</b>`], ["Vérification avec le raccourci m = C V M.", `0,100 × 0,250 × 58,5 = ${f(m1)} g ✓`]])}
${ex("2 · Quelle concentration ai-je faite ?", "5,85 g de NaCl sont dissous dans une fiole jaugée de 250 mL, puis complétés jusqu'au trait. Trouver C, C<sub>m</sub> et les concentrations des ions.", "m → n → C",
      [["Moles : n = m / M.", `n = 5,85 / 58,5 = ${f(.1)} mol`], ["C = n / V<sub>sol</sub>.", `C = 0,100 / 0,250 = <b>${f(.4)} mol/L</b>`], ["C<sub>m</sub> = C × M.", `C<sub>m</sub> = 0,400 × 58,5 = <b>${f(23.4)} g/L</b>`], ["NaCl(s) → Na⁺ + Cl⁻ : un de chaque par unité formulaire.", "[Na⁺] = [Cl⁻] = <b>0,400 mol/L</b>"]])}
${ex("3 · Diluer une solution de glucose", "À partir d'une solution à C<sub>0</sub> = 0,500 mol/L, préparer 100,0 mL à C<sub>1</sub> = 0,0500 mol/L. Quel volume prélever, avec quelle verrerie ?", "dilution : n conservé",
      [["Facteur de dilution.", `F = C₀ / C₁ = 0,500 / 0,0500 = ${f(10)}`], ["n est conservé : C₀V₀ = C₁V₁, donc V₀ = V₁ / F.", `V<sub>0</sub> = 100,0 / 10 = <b>${f(10)} mL</b>`], ["Vérification de la quantité de soluté des deux côtés.", `C₀V₀ = 0,500 × 0,0100 = ${e(n3)} mol ; C₁V₁ = 0,0500 × 0,1000 = ${e(.05 * .1)} mol ✓`], ["Verrerie : pipette jaugée de 10,0 mL + fiole jaugée de 100,0 mL + eau distillée.", ""]])}
${ex("4 · Quelle pipette ?", "À partir de S<sub>0</sub> = 1,00×10⁻² mol/L, préparer 100,0 mL d'une solution à 2,0×10⁻³ mol/L.", "dilution : n conservé",
      [["Facteur de dilution.", `F = ${e(1e-2)} / ${e(2e-3, 2)} = ${f(5)}`], ["V₀ = V₁ / F.", `V<sub>0</sub> = 100,0 / 5 = <b>${f(20)} mL</b>`], ["20,0 mL existe en pipette jaugée : l'utiliser avec une fiole jaugée de 100,0 mL.", ""]])}
${ex("5 · On ajoute de l'eau", "À 50,0 mL d'une solution à 0,40 mol/L on ajoute 150 mL d'eau (volumes supposés additifs). Trouver la nouvelle concentration.", "n conservé, V change",
      [["Quantité de soluté, inchangée par l'eau.", `n = 0,40 × 0,0500 = ${f(.02)} mol`], ["Nouveau volume : 50,0 + 150 = 200 mL.", "V' = 0,200 L"], ["C' = n / V'.", `C' = ${f(.02)} / 0,200 = <b>${f(.1)} mol/L</b>`], ["Vérification : le volume est multiplié par 4, donc C est divisée par 4.", `0,40 / 4 = 0,10 ✓`]])}
${ex("6 · Sulfate de cuivre et Cu²⁺", "2,5 g de CuSO<sub>4</sub> (M = 159,5 g/mol) sont dissous dans une fiole de 500 mL. Trouver C et la concentration massique des ions Cu²⁺ (M(Cu) = 63,5 g/mol).", "m → n → C → C<sub>m</sub>(Cu²⁺)",
      [["Moles de soluté.", `n = 2,5 / 159,5 = ${f(nCuSO4)} mol`], ["Concentration du soluté.", `C = ${f(nCuSO4)} / 0,500 = <b>${f(CCuSO4)} mol/L</b>`], ["CuSO₄ → Cu²⁺ + SO₄²⁻ : [Cu²⁺] = C.", `[Cu²⁺] = ${f(CCuSO4)} mol/L`], ["Concentration massique des ions : C<sub>m</sub> = C × M(Cu).", `C<sub>m</sub> = ${f(CCuSO4)} × 63,5 = <b>${f(CCuSO4 * 63.5)} g/L</b>`]])}
${ex("7 · Une dilution par 10 000", "À partir d'une solution à 1,00 mol/L, préparer une solution à 1,00×10⁻⁴ mol/L avec seulement des fioles de 100,0 mL et une pipette de 1,00 mL.", "deux dilutions successives",
      [["Facteur de dilution total.", `F = 1,00 / 1,00×10⁻⁴ = ${e(1e4, 3)}`], ["En une étape il faudrait V₀ = 100,0 / 10 000 = 0,0100 mL : impossible. On décompose en F = 100 × 100.", ""], ["Première dilution : 1,00 mL de mère dans 100,0 mL (F₁ = 100).", `C<sub>1</sub> = 1,00 / 100 = ${e(1e-2)} mol/L`], ["Deuxième dilution : 1,00 mL de cette solution dans 100,0 mL (F₂ = 100).", `C<sub>2</sub> = ${e(1e-2)} / 100 = <b>${e(1e-4)} mol/L</b>`]])}`});

  // ---------- 5. sujet truffe, partie 1 ----------
  pg("sujet_truffe_1.html", {title: "Sujet truffe, partie 1 : calcaire et préparation de S₃", eyebrow: "Chimie · Cours 1 · Corrigé de sujet",
    lede: "Extrait d'un sujet sur l'analyse d'un sol pour la culture de la truffe. La partie 1 mesure le calcaire à partir d'un volume de gaz ; la première question de la partie 2 demande comment préparer une solution étalon par dilution. Corrigés complets, étape par étape.",
    body: `<section><h2>L'énoncé (résumé)</h2>
<p><b>Partie 1 · La teneur en calcaire du sol.</b> Verser un peu d'acide chlorhydrique concentré sur un sol qui fait effervescence montre qu'il contient du carbonate de calcium (« calcaire »). La réaction est</p>
<p class="formula">CaCO<sub>3</sub>(s) + 2 H<sub>3</sub>O⁺(aq) → Ca²⁺(aq) + CO<sub>2</sub>(g) + 3 H<sub>2</sub>O(l)</p>
<p>L'acide est en excès et le gaz est recueilli dans une éprouvette graduée remplie d'eau. Pour un échantillon de sol de masse <b>m = 1,2 g</b>, le volume de gaz recueilli est <b>V = 72 mL</b>. Dans les conditions de l'expérience, <b>V<sub>m</sub> = 24,1 L/mol</b>.</p>
<p><b>Question 1.</b> La quantité de calcaire dans le sol étudié convient-elle à la culture de la truffe ?</p></section>
<section><h2>Corrigé, partie 1</h2>
<p>Chemin sur la carte : V<sub>gaz</sub> → n(CO<sub>2</sub>) → (équation) → n(CaCO<sub>3</sub>) → m → pourcentage.</p>
${steps([
  ["Convertir le volume de gaz en litres : le volume molaire est en L/mol.", "V = 72 mL = 0,072 L"],
  ["Moles de gaz : n = V / V<sub>m</sub>. Ce V est le volume du gaz lui-même, et on utilise le V<sub>m</sub> donné, 24,1 L/mol, pas 24,0.", `n(CO₂) = 0,072 / 24,1 = <b>${e(nCO2)} mol</b>`],
  ["Lire l'équation : 1 CaCO₃ consommé donne 1 CO₂. L'acide étant en excès, tout le calcaire réagit, donc les deux quantités sont égales.", `n(CaCO₃) = n(CO₂) = ${e(nCO2)} mol`],
  ["Masse molaire du carbonate de calcium : 1 Ca, 1 C, 3 O.", `M(CaCO₃) = 40,1 + 12,0 + 3 × 16,0 = ${f(100.1)} g/mol`],
  ["Masse de calcaire : m = n × M.", `m(CaCO₃) = ${e(nCO2)} × 100,1 = <b>${f(mCaCO3)} g</b>`],
  ["Part de l'échantillon : diviser par les 1,2 g de sol.", `${f(mCaCO3)} / 1,2 = ${f(mCaCO3 / 1.2)} → <b>≈ ${f(pCaCO3, 2)} % du sol est du CaCO₃</b>`]])}
<div class="key warn"><p><b>Conclusion (question 1).</b> Donne le résultat : environ 0,30 g de CaCO<sub>3</sub> dans 1,2 g de sol, soit <b>environ 25 %</b> de calcaire. La question demande ensuite de le comparer à la plage qui convient aux truffes. Cette plage figure dans les documents du sujet, qui n'étaient pas sur les pages fournies : je ne peux donc pas écrire la phrase finale à ta place. Rédige-la ainsi : « Le sol contient environ 25 % de CaCO<sub>3</sub> ; le document indique que les truffes demandent … ; donc ce sol convient / ne convient pas. » (On sait que les truffes préfèrent les sols riches en calcaire.)</p></div></section>
<section><h2>Partie 2 · question 3 : préparer S₃ à partir de S₀</h2>
<p><b>Énoncé.</b> Série de solutions de sulfate de cuivre de volume 50,0 mL préparées à partir d'une solution mère S<sub>0</sub>, C<sub>0</sub> = 1,00×10⁻² mol/L. S<sub>3</sub> a pour concentration C<sub>3</sub> = 5,00×10⁻³ mol/L. <i>Proposer une liste de matériel et un protocole pour préparer S<sub>3</sub> à partir de S<sub>0</sub>. Justifier.</i></p>
<h3>Justification (le calcul)</h3>
${steps([
  ["C'est une dilution : S₃ est moins concentrée que S₀ et on n'ajoute que de l'eau, donc n est conservé : C₀V₀ = C₃V₃.", "C₀ × V₀ = C₃ × V₃"],
  ["Facteur de dilution.", `F = C₀ / C₃ = ${e(1e-2)} / ${e(5e-3)} = <b>${f(2)}</b>`],
  ["Volume de S₀ à prélever : V₀ = V₃ / F.", `V<sub>0</sub> = 50,0 / 2 = <b>${f(25)} mL</b>`],
  ["Vérification sur la quantité de soluté.", `n = ${e(1e-2)} × 0,0250 = ${e(2.5e-4)} mol ; ${e(5e-3)} × 0,0500 = ${e(2.5e-4)} mol ✓`]])}
<h3>Matériel</h3>
<ul><li>1 pipette jaugée de <b>25,0 mL</b> + une propipette (V<sub>0</sub> doit être connu précisément) ;</li><li>1 fiole jaugée de <b>50,0 mL</b> avec son bouchon (V<sub>3</sub> doit être connu précisément) ;</li><li>1 bécher avec un peu de S<sub>0</sub> (et un autre pour les déchets/rinçages), de l'eau distillée dans une pissette, une pipette Pasteur, un entonnoir.</li></ul>
<p class="muted">Pas d'éprouvette graduée : sa précision est trop faible pour un étalon.</p>
<h3>Protocole</h3>
<ol><li>Verser un peu de S<sub>0</sub> dans un bécher.</li><li>Rincer la pipette de 25,0 mL avec un peu de S<sub>0</sub>, puis la remplir et ajuster le ménisque au trait.</li><li>Vider les 25,0 mL de S<sub>0</sub> dans la fiole jaugée de 50,0 mL.</li><li>Ajouter de l'eau distillée jusqu'aux deux tiers environ, boucher, agiter.</li><li>Compléter avec de l'eau distillée jusqu'au trait (pipette Pasteur pour les dernières gouttes), boucher et retourner plusieurs fois pour homogénéiser.</li></ol>
<h3>Les autres solutions de la série</h3>
<p>Même méthode, V<sub>0</sub> = C × 50,0 / C<sub>0</sub> :</p>
${table(["Solution", "C (mol/L)", "F", "V<sub>0</sub> de S<sub>0</sub>", "Verrerie"], [[`S<sub>1</sub>`, e(1e-3), "10", "5,00 mL", "pipette 5,0 mL"], [`S<sub>2</sub>`, e(2e-3), "5", "10,0 mL", "pipette 10,0 mL"], [`S<sub>3</sub>`, e(5e-3), "2", "25,0 mL", "pipette 25,0 mL"], [`S<sub>4</sub>`, e(8e-3), "1,25", "40,0 mL", "burette (ou 2 × 20,0 mL)"], [`S<sub>0</sub>`, e(1e-2), "1", "—", "la mère elle-même"]])}
<p>La suite de ce sujet (longueur d'onde, courbe d'étalonnage, Beer–Lambert, teneur en cuivre) est corrigée dans <a href="${L("sujet_truffe_2.html")}">Sujet truffe, partie 2</a>.</p></section>`});

  // ---------- 6. cours dosage ----------
  pg("dosage_cours.html", {title: "Dosage par étalonnage : le cours", eyebrow: "Chimie · Cours 2 · Fiche",
    lede: "Comment trouver une concentration inconnue en la comparant à des solutions préparées soi-même : préparer des étalons, mesurer une grandeur qui croît avec C, tracer la droite, lire l'inconnue dessus.",
    body: `<section><h2>1 · L'idée</h2>
<p>Un <b>dosage par étalonnage</b> trouve la concentration C<sub>x</sub> d'une espèce dans un échantillon <b>sans réaction</b>. On utilise une grandeur physique qui dépend de la concentration (la couleur en spectrophotométrie, les ions en conductimétrie). On la mesure sur des solutions de concentration <b>connue</b> (les étalons), on regarde comment elle varie avec C, puis on la mesure sur l'inconnue et on lit la réponse.</p>
<p>Il repose sur la dilution : les étalons sont préparés à partir d'une seule solution mère (voir <a href="${L("dissolution_dilution.html")}">Dissolution et dilution</a>).</p></section>
<section><h2>2 · Les sept étapes</h2>
<ol><li><b>Préparer la solution mère S<sub>0</sub></b> (C<sub>0</sub> connue), par dissolution.</li>
<li><b>Faire la gamme étalon</b> par dilution : S<sub>1</sub> … S<sub>n</sub> avec C = C<sub>0</sub> V<sub>0</sub> / V.</li>
<li><b>Mesurer</b> la grandeur (A ou σ) pour chaque étalon, avec les mêmes réglages.</li>
<li><b>Tracer la courbe d'étalonnage</b> : grandeur mesurée (y) en fonction de C (x).</li>
<li><b>Vérifier le modèle</b> : points alignés sur une droite passant par l'origine ⇒ proportionnalité.</li>
<li><b>Mesurer l'inconnue</b> dans les mêmes conditions ; sa valeur doit se situer <b>dans</b> la gamme des étalons.</li>
<li><b>Lire C<sub>x</sub></b> sur la droite (graphique ou équation), et corriger d'une éventuelle dilution.</li></ol></section>
<section><h2>3 · Spectrophotométrie et loi de Beer-Lambert</h2>
<p>Une solution colorée absorbe une partie de la lumière qui la traverse. L'<b>absorbance A</b> (sans unité) mesure cette absorption. Pour une solution diluée, une seule espèce absorbante, une longueur d'onde et une cuve de longueur ℓ :</p>
<p class="formula">A = ε × ℓ × C = k × C</p>
<p>A est <b>proportionnelle</b> à C. k (L/mol) est la pente de la droite d'étalonnage ; il contient ε (le coefficient d'absorption molaire) et ℓ.</p>
<ul><li><b>Choisir λ au maximum du spectre d'absorption</b> de l'espèce : le signal est le plus grand, la mesure est donc la plus sensible. Une solution colorée absorbe la couleur <i>opposée</i> à celle qu'on voit : une solution bleue de Cu²⁺ absorbe l'orangé-rouge (λ<sub>max</sub> ≈ 800 nm).</li>
<li><b>Régler le zéro</b> (le blanc) avec le solvant seul, dans le même type de cuve.</li>
<li>La loi vaut pour des solutions <b>diluées</b> : rester en dessous de A ≈ 1 à 1,5.</li></ul></section>
<section><h2>4 · Conductimétrie</h2>
<p>Une solution d'ions conduit l'électricité. Sa conductivité σ (en S/m, ou mS/cm) est la somme sur les ions de λ<sub>i</sub> × C<sub>i</sub>. Pour un seul sel dissous en solution diluée, on retrouve une proportionnalité :</p>
<p class="formula">σ = k × C</p>
<p>Étalonner la sonde, mesurer à la même température, rincer la sonde entre les solutions. Exemple : NaCl donne environ 126 mS/cm par mol/L à 25 °C.</p></section>
<section><h2>5 · La courbe d'étalonnage</h2>
<h3>La tracer à la main</h3>
<ol><li>C en abscisse, A (ou σ) en ordonnée ; nommer les deux axes avec leurs unités.</li><li>Choisir des échelles pour que les points remplissent la feuille (et inclure l'origine).</li><li>Marquer chaque point d'une petite croix.</li><li>Tracer <b>une seule droite</b>, à la règle, passant par l'origine et au plus près de tous les points, avec à peu près autant de points au-dessus qu'en dessous. Ne pas relier les points.</li></ol>
<h3>Justifier Beer-Lambert (ou la proportionnalité)</h3>
<p>Écrire : « Les points sont alignés sur une droite qui passe par l'origine, donc A est proportionnelle à C : A = k × C. Cela est en accord avec la loi de Beer-Lambert, aux incertitudes de mesure près. »</p>
<h3>Lire l'inconnue</h3>
<ul><li><b>Graphiquement</b> : de A<sub>x</sub> sur l'axe des ordonnées, aller horizontalement jusqu'à la droite, puis verticalement jusqu'à l'axe des abscisses. Montrer les pointillés.</li><li><b>Avec l'équation</b> : prendre deux points éloignés de la <i>droite</i> (pas des données) pour trouver k = ΔA / ΔC, puis C<sub>x</sub> = A<sub>x</sub> / k.</li></ul>
<div class="mapw" style="padding:12px">${CH.calibSVG({pts: ptsT, k: kT, xmax: 1.05e-2, ymax: .12, xs: 1000, xl: "Concentration C (mmol/L)", yl: "Absorbance A", probe: {x: CsT, y: .035}})}</div>
<p class="muted">Données du sujet truffe (sulfate de cuivre) : A = k × C avec k ≈ ${f(kT, 3)} L/mol. A<sub>s</sub> = 0,035 donne C ≈ ${f(CsT * 1000, 3)} mmol/L. Corrigé complet dans <a href="${L("sujet_truffe_2.html")}">Sujet truffe, partie 2</a>.</p></section>
<section><h2>6 · De la concentration à ce qu'on demande</h2>
${table(["Tu as", "Tu veux", "Fais"], [["A<sub>x</sub> ou σ<sub>x</sub>", "C de la solution mesurée", "C = A / k"], ["C d'un échantillon <i>dilué</i> (F fois)", "C de l'échantillon d'origine", "C = F × C<sub>mesurée</sub>"], ["C (mol/L)", "C<sub>m</sub> (g/L)", "C<sub>m</sub> = C × M"], ["C<sub>m</sub> (g/L) dans une fiole V", "masse dans la fiole", "m = C<sub>m</sub> × V"], ["masse m d'espèce dans un échantillon de masse m<sub>éch</sub>", "teneur (g/kg, %)", "m / m<sub>éch</sub>"]])}
<h3>Hors gamme ?</h3>
<p>Si A<sub>x</sub> dépasse le plus grand étalon, ne prolonge pas la droite : <b>dilue</b> l'échantillon d'un facteur F connu, mesure à nouveau, et multiplie C par F. Si elle est bien plus petite que le plus petit étalon, utilise un échantillon plus concentré ou un réglage plus sensible.</p></section>
<section><h2>7 · Erreurs fréquentes</h2>
<ul><li>Relier les points au lieu de tracer une seule droite.</li><li>Oublier de tenir compte d'une dilution de l'échantillon (réponse F fois trop petite).</li><li>Lire un point hors de la gamme des étalons.</li><li>Écrire C en mmol/L sur le graphique puis l'utiliser en mol/L dans la formule.</li><li>Choisir λ au hasard : ce doit être le maximum d'absorption.</li></ul>
<p>Ensuite : construis la courbe dans <a href="labo_etalonnage.html">Labo : courbe d'étalonnage</a>.</p></section>`});

  // ---------- 7. exemples : dosage ----------
  pg("dosage_exemples.html", {title: "Exemples corrigés : dosage", eyebrow: "Chimie · Cours 2 · Corrigé",
    lede: "Trois dosages complets : spectrophotométrie, un échantillon trop concentré qu'il faut diluer, et un dosage par conductimétrie.",
    body: `${ex("1 · Permanganate par spectrophotométrie", "Une solution mère S<sub>0</sub> de KMnO<sub>4</sub> à 1,00×10⁻³ mol/L est diluée en cinq étalons de 50,0 mL (V<sub>0</sub> = 5,0 ; 10,0 ; 15,0 ; 20,0 ; 25,0 mL). Absorbances à 525 nm : 0,25 ; 0,47 ; 0,73 ; 0,95 ; 1,19. Un échantillon a A = 0,62. Trouver sa concentration.", "V<sub>0</sub> → C (gamme) ; A → C<sub>x</sub>",
      [["Concentration de chaque étalon : C = C₀ V₀ / V.", `C = 1,00×10⁻³ × V₀ / 50,0 → ${mnC.map(c => e(c, 2)).join(" ; ")} mol/L`], ["On trace A en fonction de C : les cinq points sont alignés sur une droite passant par l'origine ⇒ A = k × C (Beer-Lambert).", ""], ["Pente de la meilleure droite passant par l'origine : k = Σ(C·A) / Σ(C²).", `k = <b>${f(kMn, 3)} L/mol</b> (environ 2400 L/mol)`], ["A = 0,62 est-elle dans la gamme des étalons (0,25 à 1,19) ? Oui.", "✓"], ["Lire C<sub>x</sub> = A<sub>x</sub> / k.", `C<sub>x</sub> = 0,62 / ${f(kMn, 3)} = <b>${e(Cmn)} mol/L</b>`]])}
<div class="mapw" style="padding:12px">${CH.calibSVG({pts: mnC.map((x, i) => ({x, y: mnA[i]})), k: kMn, xmax: 6e-4, ymax: 1.4, xs: 1000, xl: "Concentration C (mmol/L)", yl: "Absorbance A", probe: {x: Cmn, y: .62}})}</div>
${ex("2 · Un échantillon trop concentré", "Même étalonnage que l'exemple 1. Un nouvel échantillon donne A = 2,9, au-dessus du plus grand étalon (1,19) : la loi n'est plus valable. L'échantillon est dilué 10 fois (1 mL dans une fiole de 10 mL), et la solution diluée donne A = 0,29. Trouver la concentration de l'échantillon d'origine.", "A → C(diluée) → C(origine)",
      [["A = 2,9 est hors gamme. On dilue d'un facteur F = 10 connu et on mesure à nouveau.", "F = V₁ / V₀ = 10,0 / 1,00 = 10"], ["Concentration de la solution diluée : C = A / k.", `C<sub>diluée</sub> = 0,29 / ${f(kMn, 3)} = ${e(Cmn2)} mol/L`], ["Vérification : 0,29 est dans la gamme ✓. L'échantillon d'origine est F fois plus concentré.", `C = F × C<sub>diluée</sub> = 10 × ${e(Cmn2)} = <b>${e(Cmn2 * 10)} mol/L</b>`]])}
${ex("3 · Le sel d'une perfusion, par conductimétrie", "Des étalons de NaCl à 1,00 ; 2,00 ; 3,00 ; 4,00 ; 5,00 mmol/L donnent σ = 0,125 ; 0,255 ; 0,378 ; 0,508 ; 0,630 mS/cm. Une perfusion (« sérum physiologique ») est diluée 50 fois et donne σ = 0,390 mS/cm. Trouver la concentration de la perfusion en mol/L et en g/L. M(NaCl) = 58,5 g/mol.", "σ → C(diluée) → C → C<sub>m</sub>",
      [["Les points sont alignés et passent par l'origine : σ = k × C.", `k = Σ(Cσ) / Σ(C²) = <b>${f(kNa, 3)} mS·cm⁻¹ par mol/L</b>`], ["Concentration de la solution diluée : C = σ / k.", `C = 0,390 / ${f(kNa, 3)} = ${e(CNa)} mol/L (dans la gamme ✓)`], ["On annule la dilution : × 50.", `C = 50 × ${e(CNa)} = <b>${f(CNa0)} mol/L</b>`], ["Concentration massique : C<sub>m</sub> = C × M.", `C<sub>m</sub> = ${f(CNa0)} × 58,5 = <b>${f(CNa0 * 58.5)} g/L</b> (une perfusion saline est étiquetée 9 g/L ✓)`]])}`});

  // ---------- 8. sujet truffe, partie 2 ----------
  pg("sujet_truffe_2.html", {title: "Sujet truffe, partie 2 : le cuivre du sol", eyebrow: "Chimie · Cours 2 · Corrigé de sujet",
    lede: "Huit questions sur la teneur en cuivre d'un sol, dosée par spectrophotométrie. Chacune est corrigée étape par étape, du choix de la longueur d'onde à la conclusion finale.",
    body: `<section><h2>L'énoncé (résumé)</h2>
<p><b>Partie 2 · La teneur en cuivre du sol.</b> Une solution « de sol » est préparée en agitant <b>m = 500,0 g</b> de sol dans une fiole jaugée de <b>1,00 L</b>, puis en filtrant. Elle contient des ions Cu²⁺(aq), dosés par spectrophotométrie.</p>
<p>Une série de solutions de sulfate de cuivre (Cu²⁺, SO<sub>4</sub><sup>2−</sup>), de <b>V = 50,0 mL</b> chacune, est préparée à partir d'une solution mère S<sub>0</sub>, <b>C<sub>0</sub> = 1,00×10⁻² mol/L</b>. L'absorbance est mesurée à une longueur d'onde prédéfinie. Pour la solution de sol : <b>A<sub>s</sub> = 0,035</b>.</p>
${table(["Solution", "S<sub>1</sub>", "S<sub>2</sub>", "S<sub>3</sub>", "S<sub>4</sub>", "S<sub>0</sub>"], [["C (mol/L)", "1,00×10⁻³", "2,00×10⁻³", "5,00×10⁻³", "8,00×10⁻³", "1,00×10⁻²"], ["Absorbance A", "0,010", "0,019", "0,045", "0,082", "0,103"]])}</section>
<section><h2>Q1 · La longueur d'onde</h2>
<p><i>Indiquer la valeur de la longueur d'onde sur laquelle il faut régler le spectrophotomètre.</i></p>
${steps([["Le réglage est la longueur d'onde du <b>maximum d'absorbance</b> de la solution de Cu²⁺ : le signal y est le plus grand, la mesure est donc la plus sensible et l'erreur relative la plus faible.", ""], ["On la lit sur le spectre d'absorption de Cu²⁺ fourni avec le sujet (pas sur les pages données). Une solution bleue absorbe la lumière orangé-rouge.", "λ ≈ <b>800 nm</b> (lire la valeur exacte sur le spectre)"]])}</section>
<section><h2>Q2 · La couleur de Cu²⁺</h2>
<p><i>Préciser la couleur de la solution d'ion cuivre (Cu²⁺).</i></p>
${steps([["Les solutions de Cu²⁺(aq) sont <b>bleues</b> (bleu clair). C'est pourquoi elles absorbent dans l'orangé-rouge, vers 800 nm : la solution montre la couleur complémentaire de la lumière qu'elle absorbe.", ""]])}</section>
<section><h2>Q3 · Préparer S₃</h2>
<p>Traité dans <a href="${L("sujet_truffe_1.html")}">Sujet truffe, partie 1</a> : F = 2, prélever <b>25,0 mL</b> de S<sub>0</sub> avec une pipette jaugée, les verser dans une fiole jaugée de 50,0 mL, compléter jusqu'au trait avec de l'eau distillée.</p></section>
<section><h2>Q4 · La courbe d'étalonnage</h2>
<p><i>Tracer la courbe étalon (absorbance en fonction de la concentration).</i></p>
${steps([["Axes : C (mol/L) en abscisse, A en ordonnée. Nommer les deux.", ""], ["Échelles : x de 0 à 1,00×10⁻² mol/L (par exemple 2,00×10⁻³ mol/L pour 4 cm), y de 0 à 0,120 (par exemple 0,020 pour 2 cm). Partir de l'origine.", ""], ["Placer les cinq points avec des croix : (1,00×10⁻³ ; 0,010), (2,00×10⁻³ ; 0,019), (5,00×10⁻³ ; 0,045), (8,00×10⁻³ ; 0,082), (1,00×10⁻² ; 0,103).", ""], ["Tracer la meilleure droite passant par l'origine, à la règle, avec des points de part et d'autre. Ne pas relier les points.", `Sa pente est k ≈ <b>${f(kT, 3)} L/mol</b> (environ 10)`]])}
<div class="mapw" style="padding:12px">${CH.calibSVG({pts: ptsT, k: kT, xmax: 1.05e-2, ymax: .12, xs: 1000, xl: "Concentration C (mmol/L)", yl: "Absorbance A", probe: {x: CsT, y: .035}, aria: "Courbe d'étalonnage du sulfate de cuivre avec lecture de la solution de sol"})}</div></section>
<section><h2>Q5 · Compatible avec Beer-Lambert ?</h2>
<p><i>Justifier que les points obtenus sont compatibles avec la loi de Beer-Lambert.</i></p>
${steps([["Beer-Lambert dit A = k × C : A est proportionnelle à C, donc le graphique est une droite passant par l'origine.", ""], ["Sur le graphique, les points sont alignés sur une droite qui passe par l'origine (les petits écarts sont l'incertitude de mesure).", ""], ["Vérification numérique : le rapport A / C est presque constant.", [0, 1, 2, 3, 4].map(i => `${f(stdA[i] / stdC[i], 3)}`).join(" ; ") + " L/mol, tous environ 10"], ["Conclusion.", "<b>A = k × C est vérifiée : la loi de Beer-Lambert s'applique.</b>"]])}
<p class="muted">Ta réponse manuscrite dit la même chose : une droite passant par l'origine montre une proportionnalité entre A et C. Ajouter « aux incertitudes de mesure près » et la valeur de k la rend complète.</p></section>
<section><h2>Q6 · Concentration de la solution de sol</h2>
<p><i>Déterminer la concentration molaire C<sub>Cu²⁺</sub> de la solution de sol préparée. Justifier.</i></p>
${steps([["Justification : A<sub>s</sub> = 0,035 est comprise entre les absorbances de S<sub>1</sub> (0,010) et S<sub>3</sub> (0,045) : elle est <b>dans la gamme</b> des étalons, la lecture sur la droite est donc valable.", ""], ["Graphiquement : de 0,035 sur l'axe des ordonnées, aller horizontalement jusqu'à la droite, puis descendre jusqu'à l'axe des abscisses.", `C ≈ <b>${f(CsT * 1000, 2)}×10⁻³ mol/L</b>`], ["Avec l'équation : C = A<sub>s</sub> / k.", `C<sub>Cu²⁺</sub> = 0,035 / ${f(kT, 3)} = <b>${e(CsT, 2)} mol/L</b>`], ["Attendre un petit écart (3,4 à 3,6×10⁻³ mol/L) selon la façon de tracer la droite.", ""]])}</section>
<section><h2>Q7 · Concentration massique en cuivre</h2>
<p><i>En déduire la concentration massique C<sub>ms</sub> en ions cuivre Cu²⁺ dans le sol.</i> (M(Cu) = 63,5 g/mol)</p>
${steps([["Concentration massique à partir de la concentration molaire : C<sub>m</sub> = C × M.", `C<sub>ms</sub> = ${e(CsT, 3)} × 63,5 = <b>${f(CmsT, 2)} g/L</b> de solution de sol`], ["La fiole de 1,00 L contient donc cette masse de cuivre, venue des 500,0 g de sol : m = C<sub>m</sub> × V.", `m(Cu) = ${f(CmsT, 3)} × 1,00 = ${f(CmsT * 1.0, 2)} g`], ["Teneur en cuivre du sol, par kilogramme de sol.", `${f(CmsT * 1.0, 2)} g / 0,5000 kg = <b>${f(gkgT, 2)} g/kg</b> (≈ ${f(gkgT * 1000, 2)} mg/kg)`]])}
<p class="muted">La formulation « concentration massique dans le sol » peut désigner les g/L de la solution de sol (0,22 g/L) ou les g par kg de sol (0,44 g/kg). Donne les deux, avec les unités, comme ci-dessus.</p></section>
<section><h2>Q8 · Le sol est-il propice à la truffe ?</h2>
<p><i>Peut-on affirmer que l'échantillon de sol étudié est propice à la culture de la truffe ? Présenter toutes les étapes.</i></p>
<p>La réponse demande <b>deux résultats comparés aux critères donnés dans les documents du sujet</b> (qui n'étaient pas sur les pages fournies). Voici la chaîne complète et la phrase type :</p>
${steps([["Calcaire (partie 1) : à partir du volume de gaz, n(CaCO₃) = V / V<sub>m</sub>.", `≈ <b>25 %</b> de CaCO₃ (0,30 g dans 1,2 g de sol) — voir la <a href="${L("sujet_truffe_1.html")}">partie 1</a>`], ["Cuivre (partie 2) : dosage spectrophotométrique avec la droite d'étalonnage A = k × C, k ≈ 10 L/mol.", `C(Cu²⁺) ≈ ${e(CsT, 2)} mol/L → <b>${f(CmsT, 2)} g/L</b> → <b>${f(gkgT, 2)} g/kg</b> de sol`], ["Comparer chaque résultat à la plage ou à la limite donnée dans les documents (plage de calcaire favorable aux truffes ; teneur maximale en cuivre tolérée).", "[reprendre les valeurs des documents]"], ["Conclure : le sol convient seulement si les <b>deux</b> critères sont respectés.", "« Le sol contient environ 25 % de CaCO₃ et 0,44 g de Cu²⁺ par kg. D'après les documents …, donc le sol est / n'est pas propice à la culture de la truffe. »"]])}</section>`});

  // ---------- 9. sujet boisson bleue (E133) ----------
  const Fe = [.5, .4, .2, .1].map(c => 1 / c), Ve = [.5, .4, .2, .1].map(c => 50 * c / 1);
  const chartE = CH.calibSVG({pts: ptsE, k: kE, b: 0, xmax: 1.05, ymax: 1.8, xs: 1, xl: "Concentration massique Cm (mg/L)", yl: "Absorbance A", probe: {x: CbE, y: .832}, aria: "Droite d'étalonnage du colorant bleu avec lecture de la boisson"});
  pg("sujet_boisson.html", {title: "Sujet boisson bleue : le colorant E133", eyebrow: "Chimie · Cours 2 · Corrigé de sujet",
    lede: "Une fiche de TP sur le colorant E133 (bleu brillant) dans une boisson énergisante bleue : préparer une gamme d'étalons, mesurer l'absorbance, tracer la droite d'étalonnage et décider combien de bouteilles un marathonien peut boire. Chaque question est expliquée.",
    body: `<section><h2>L'énoncé (résumé)</h2>
<p>Une boisson énergisante bleue contient le colorant E133 (<i>bleu brillant</i>). On trouve sa concentration par <b>dosage par étalonnage</b>. À partir d'une solution mère S<sub>0</sub> de concentration massique <b>C<sub>m0</sub> = 1,0 mg/L</b>, on prépare quatre solutions filles S<sub>1</sub> à S<sub>4</sub> dans des fioles de <b>50,0 mL</b>. On mesure l'absorbance A<sub>i</sub> de chacune avec le même spectrophotomètre, puis celle de la boisson.</p>
${table(["Solution", "S<sub>0</sub>", "S<sub>1</sub>", "S<sub>2</sub>", "S<sub>3</sub>", "S<sub>4</sub>", "Boisson"], [["C<sub>mi</sub> (mg/L)", "1,0", "0,5", "0,4", "0,2", "0,1", "?"], ["A<sub>i</sub>", "1,625", "0,786", "0,702", "0,349", "0,208", "0,832"]])}
<p class="muted">Un élément est difficile à lire sur la feuille : la ligne imprimée semble indiquer C<sub>m0</sub> = 0,1 mg/L, mais le tableau et tes calculs utilisent 1,0 mg/L, la seule valeur qui rend les dilutions possibles. Dans la colonne boisson, 0,832 est l'absorbance mesurée et 0,528 la concentration que tu as calculée en Q8.</p></section>
<section><h2>Préliminaire 1 · Pourquoi la solution est-elle bleue ?</h2>
${steps([["Une solution colorée absorbe certaines couleurs de la lumière blanche et laisse passer les autres.", ""], ["Le colorant bleu brillant absorbe surtout l'<b>orangé-rouge</b> (autour de 630 nm), la couleur opposée au bleu sur le cercle chromatique.", ""], ["Ce qui arrive à l'œil est la lumière blanche privée d'orangé-rouge, donc <b>bleue</b>.", "couleur complémentaire"]])}</section>
<section><h2>Préliminaire 2 · Beer-Lambert avec la concentration massique</h2>
<p><i>Exprimer la loi en fonction de la concentration massique, en précisant les unités.</i></p>
${steps([["Beer-Lambert avec la concentration molaire : A = ε × ℓ × C.", ""], ["On remplace C par C<sub>m</sub> / M, car C<sub>m</sub> = C × M.", "A = (ε × ℓ / M) × C<sub>m</sub>"], ["On appelle k′ le facteur devant : <b>A = k′ × C<sub>m</sub></b>.", ""], ["Unités : A n'en a pas et C<sub>m</sub> est en mg/L, donc k′ est en <b>L/mg</b>.", "k′ [L/mg] × C<sub>m</sub> [mg/L] = sans unité ✓"]])}
<div class="key warn"><p><b>Correction de ta note.</b> En haut de ta feuille tu as écrit « C<sub>m</sub> = C × V ». C'est <b>C<sub>m</sub> = C × M</b>, avec M la masse molaire : g/L = mol/L × g/mol. V est un volume et ne peut pas transformer des moles en grammes.</p></div></section>
<section><h2>Tableau · F et V<sub>m</sub> pour chaque solution</h2>
<p>V<sub>f</sub> = 50,0 mL est le volume de chaque solution fille. Une dilution conserve la quantité de soluté, donc C<sub>m0</sub> × V<sub>m</sub> = C<sub>mi</sub> × V<sub>f</sub> (voir <a href="${L("dissolution_dilution.html")}">le cours sur la dilution</a>).</p>
${steps([["Facteur de dilution : F = C<sub>m0</sub> / C<sub>mi</sub>.", Fe.map((x, i) => `F<sub>${i + 1}</sub> = 1,0 / ${f([.5, .4, .2, .1][i])} = <b>${f(x)}</b>`).join(" ; ")], ["Volume de solution mère à prélever : V<sub>m</sub> = V<sub>f</sub> / F, ou V<sub>f</sub> × C<sub>mi</sub> / C<sub>m0</sub>.", Ve.map((x, i) => `V<sub>m${i + 1}</sub> = 50,0 × ${f([.5, .4, .2, .1][i])} / 1,0 = <b>${f(x)} mL</b>`).join(" ; ")], ["En litres, comme dans ton tableau.", "2,5×10⁻² L ; 2,0×10⁻² L ; 1,0×10⁻² L ; 5×10⁻³ L"], ["Verrerie : le volume prélevé avec une <b>pipette jaugée</b> (25, 20, 10, 5 mL), remplie avec une propipette à partir d'un petit bécher ; le volume final dans une <b>fiole jaugée</b> de 50,0 mL ; de l'eau distillée dans une pissette.", "les quatre colonnes utilisent une fiole jaugée de 50,0 mL"]])}
<p class="muted">Tes facteurs et ta verrerie sont justes. Vérifie les puissances de dix pour S<sub>2</sub> et S<sub>3</sub> : 20 mL font 2,0×10⁻² L et 10 mL font 1,0×10⁻² L. Sur la photo elles ressemblent à 20×10⁻² et 10×10⁻², soit 0,2 L et 0,1 L, bien plus qu'une fiole de 50 mL.</p></section>
<section><h2>Q1 · Protocole pour S₁</h2>
${steps([["S<sub>1</sub> a F = 2, donc la moitié du volume final vient de S<sub>0</sub>.", "V<sub>m1</sub> = 25,0 mL"], ["Verser un peu de S<sub>0</sub> dans un bécher. Rincer la pipette de 25,0 mL avec un peu de S<sub>0</sub>, puis la remplir et ajuster le ménisque au trait.", ""], ["Vider les 25,0 mL dans la fiole jaugée de 50,0 mL.", ""], ["Ajouter de l'eau distillée jusqu'aux deux tiers environ, boucher et agiter.", ""], ["Compléter jusqu'au trait de jauge (dernières gouttes à la pipette Pasteur), boucher et retourner plusieurs fois.", "C<sub>m1</sub> = 0,5 mg/L"]])}
<p class="muted">Justification : une pipette jaugée et une fiole jaugée sont précises ; une éprouvette graduée ou un bécher ne le seraient pas.</p></section>
<section><h2>Q2 · La longueur d'onde</h2>
${steps([["La lumière doit être monochromatique : une seule longueur d'onde, réglée sur le spectrophotomètre.", ""], ["On choisit la longueur d'onde du <b>maximum du spectre d'absorption</b> du colorant : A y est la plus grande, donc la droite est la plus pentue et la mesure la plus sensible.", "λ = <b>630 nm</b> ✓"], ["C'est cohérent avec le préliminaire 1 : le colorant absorbe l'orangé-rouge.", ""]])}</section>
<section><h2>Q3 · « Faire le blanc »</h2>
${steps([["Remplir une cuve avec le <b>solvant seul</b>, de l'eau distillée, et essuyer ses faces transparentes.", ""], ["La placer dans le spectrophotomètre à la longueur d'onde choisie et appuyer sur zéro : l'appareil fixe A = 0 pour « pas de colorant ».", "A(eau) = 0"], ["Ensuite, chaque mesure est l'absorbance du colorant seul, pas celle de l'eau ou de la cuve. À refaire si on change λ.", ""]])}
<p class="muted">Ta réponse, « mettre une cuve avec de l'eau et appuyer sur 0 », est juste. Ajoute la longueur d'onde et la raison.</p></section>
<section><h2>Q4 · Les mesures</h2>
${steps([["Même spectrophotomètre, même cuve, même λ pour tout.", ""], ["Aller de la solution la <b>moins</b> concentrée à la plus concentrée (S<sub>4</sub>, S<sub>3</sub>, S<sub>2</sub>, S<sub>1</sub>, S<sub>0</sub>), puis la boisson ; rincer la cuve avec la solution suivante à chaque fois.", ""], ["Tenir la cuve par les faces dépolies et éviter les bulles.", ""], ["Noter A<sub>i</sub> dans le tableau.", `${eA.map(x => f(x, 3)).join(" ; ")} et 0,832`]])}</section>
<section><h2>Q6 · La courbe A<sub>i</sub> = f(C<sub>mi</sub>)</h2>
${steps([["Axe x : C<sub>mi</sub> en mg/L de 0 à 1,0. Axe y : A de 0 à 1,8. Inclure l'origine.", ""], ["Placer les cinq points avec des croix.", `(1,0 ; 1,625), (0,5 ; 0,786), (0,4 ; 0,702), (0,2 ; 0,349), (0,1 ; 0,208)`], ["Tracer avec un tableur (Regressi, Latispro, Excel) et ajouter une courbe de tendance linéaire. Elle donne une pente de 1,5744.", `tendance : A = ${f(kE, 5)} × C<sub>m</sub> + ${f(fitE.b, 2)}`], ["Beer-Lambert prévoit <b>A = k′ × C<sub>m</sub></b> sans ordonnée à l'origine : on garde donc la pente comme constante. La petite ordonnée à l'origine (0,04) est attribuée à l'incertitude de mesure.", `<b>k′ = ${f(kE, 5)} L/mg</b>`]])}
<div class="mapw" style="padding:12px">${chartE}</div></section>
<section><h2>Q7 · La loi de Beer-Lambert est-elle justifiée ?</h2>
${steps([["Beer-Lambert prévoit que A est proportionnelle à C<sub>m</sub> : une droite passant par l'origine.", ""], ["Les cinq points sont alignés le long d'une telle droite.", `R² ≈ ${f(r2E, 3)}`], ["Vérifier le rapport A / C<sub>m</sub> : il doit être presque constant (environ k′).", eC.map((c, i) => f(eA[i] / c, 3)).join(" ; ") + " L/mg"], ["Les petits écarts (le plus grand est S<sub>4</sub>) sont de l'incertitude de mesure : une petite erreur pèse plus sur une petite valeur de A. S<sub>0</sub> (A = 1,625) est près de la limite de validité, A ≈ 1,5, où la droite commence à se courber légèrement.", ""], ["Conclusion.", "<b>Oui : la concentration massique est proportionnelle à l'absorbance, donc la loi de Beer-Lambert est justifiée (aux incertitudes de mesure près).</b>"]])}
<p class="muted">Ta réponse, « oui, la concentration massique est proportionnelle à l'absorbance », est juste. Pour la compléter, dis que les points sont alignés sur une droite passant par l'origine.</p></section>
<section><h2>Q8 · Concentration de la boisson, et le marathonien</h2>
<h3>Concentration massique de la boisson</h3>
${steps([["A = 0,832 est comprise entre S<sub>1</sub> (0,786) et S<sub>0</sub> (1,625) : elle est <b>dans la gamme</b> des étalons, l'utilisation de la droite est donc valable.", ""], ["On sait que A = k′ × C<sub>m</sub>, donc C<sub>m</sub> = A / k′.", ""], ["Application numérique.", `C<sub>m</sub> = 0,832 / ${f(kE, 5)} = <b>${f(CbE, 3)} mg/L</b>`]])}
<h3>Nombre de bouteilles</h3>
<p>Données de la feuille : marathonien <b>m = 70 kg</b>, dose journalière admissible (DJA) <b>10 mg/kg/jour</b>, bouteille <b>V = 50×10⁻² L = 0,50 L</b>.</p>
${steps([["Quantité maximale de colorant par jour pour le marathonien : 10 mg/kg × 70 kg.", `<b>${dailyE} mg</b>`], ["Colorant dans une bouteille : C<sub>m</sub> = m / V, donc m = C<sub>m</sub> × V.", `m = 50×10⁻² × ${f(CbE, 3)} = ${f(CbE * .5, 3)} → <b>0,26 mg</b> de bleu brillant`], ["Nombre de bouteilles = maximum journalier / colorant par bouteille.", `N = ${dailyE} / 0,26 = <b>2692 bouteilles</b>`], ["Arrondir <b>à l'entier inférieur</b>.", ""], ["Signification : 2 692 bouteilles de 0,50 L font environ 1 350 L de boisson. Le colorant seul est très loin d'être dangereux : l'eau, le sucre et la caféine poseraient problème bien avant.", "<b>Le colorant E133 seul ne présente pas de risque.</b>"]])}
<div class="key"><p><b>Notes sur la précision.</b><br>• Garder 0,264 mg au lieu d'arrondir à 0,26 donne ${Math.floor(dailyE / .264)} bouteilles. Les deux conviennent si la méthode est claire.<br>• La courbe de tendance a une ordonnée à l'origine (0,041). Avec sa pente seule, comme ci-dessus, on obtient ${f(CbE, 3)} mg/L ; avec l'équation complète, ${f(CbE2, 3)} mg/L ; en forçant la droite par l'origine, ${f(CbE0, 3)} mg/L (k′ = ${f(k0E, 3)} L/mg). Les trois valeurs concordent à 5 % près et la conclusion (des milliers de bouteilles, donc aucun danger) ne change pas.<br>• Si ta feuille indique que la boisson a été diluée F fois avant la mesure, multiplie C<sub>m</sub> par F et divise le nombre de bouteilles par F.</p></div></section>`});
}
