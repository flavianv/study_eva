// Page d'exercices en français : la fiche du gâteau + de nouveaux problèmes dans le même style. Les corrigés sont masqués (<details>).
import exData from "./chimie_ex_data.mjs";

export default function (ctx) {
  const {pg, table, steps, f, e, CH} = ctx;
  const {cake, lem, syr, sal, he, bor} = exData(CH);
  const qa = (n, q, sol) => `<div class="qa"><p><b>${n}.</b> ${q}</p><details class="qsol"><summary>Voir le corrigé</summary>${steps(sol)}</details></div>`;
  const data = items => `<div class="databox"><b>Données</b><ul>${items.map(i => `<li>${i}</li>`).join("")}</ul></div>`;
  const rule = `<p class="muted"><i>Toute réponse doit être justifiée : formule littérale, puis calcul numérique posé, et respect des chiffres significatifs.</i></p>`;
  const kT = bor.k;

  pg("exercices_chimie.html", {title: "Exercices : le gâteau et autres problèmes", eyebrow: "Chimie · Exercices",
    lede: "Des problèmes dans le style de ta fiche : une petite histoire, un encadré de données, puis des questions qui demandent un raisonnement. Ils reprennent les chapitres 1 et 2 (moles, concentrations, dissolution, dilution, dosage). Essaie chaque question d'abord, puis ouvre son corrigé.",
    body: `<section><h2>Comment répondre</h2>
<ol><li><b>La formule littérale</b> d'abord (par exemple n = m / M), <b>puis</b> les valeurs numériques, puis le résultat avec son unité.</li><li><b>Convertis les unités</b> avant de calculer (µg → g, mL → L ; les °C ne changent pas une formule mais changent V<sub>m</sub>).</li><li><b>Chiffres significatifs</b> : un produit ou un quotient en a autant que la donnée <i>la moins précise</i>. Garde des chiffres de plus dans les étapes intermédiaires et arrondis à la fin. « 3×10⁻²² g » n'a qu'un chiffre significatif ; « 1,11 mol » en a trois.</li><li>Termine par une <b>phrase</b> qui répond à la question posée.</li></ol></section>

<section class="ex"><h2>Exercice 1 · Le gâteau au chocolat</h2>
<p>Gâteau d'anniversaire de Mme Dubois, dont le péché mignon est le gâteau au chocolat. Ingrédients : 1,11 mol de chocolat noir, 0,58 mol de sucre, 5 œufs, 1,15 mol de farine, 1,25×10⁸ µg de beurre, 1 sachet de levure (11 g). Ustensiles : un moule rectangle de 24 cm de long, 8 cm de large et 6 cm de haut ; un moule rond de 10 cm de rayon et 6 cm de haut.</p>
<p>La levure permet de faire gonfler les gâteaux. À 24 °C, le volume molaire d'un gaz est de 24 L·mol⁻¹ ; à 180 °C, il devient égal à <b>36,9 L·mol⁻¹</b>. 10 g de levure dégagent 2,7×10⁻² mol de CO<sub>2</sub>. La pâte, après mélange des ingrédients, a un volume de 500 mL. Le four est à 180 °C.</p>
${data(["Sucre : C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>", "Masse d'une molécule de chocolat : 3×10⁻²² g", "Masse molaire de la farine : 108,36 g/mol", "M(C) = 12,0 g/mol ; M(H) = 1,00 g/mol ; M(O) = 16,0 g/mol", "N<sub>A</sub> = 6,02×10²³ mol⁻¹", "Volume pavé droit : L × l × h ; volume cylindre : π × r² × h"])}
${rule}
${qa(1, "Quelle masse de chocolat doit-on utiliser ?", [["La donnée est la masse d'<b>une seule molécule</b>. Une mole, c'est N<sub>A</sub> molécules, donc M = m<sub>molécule</sub> × N<sub>A</sub>.", `M = 3×10⁻²² × 6,02×10²³ = ${f(cake.Mchoc, 4)} g/mol`], ["Masse à partir de la quantité : m = n × M.", `m = 1,11 × ${f(cake.Mchoc, 4)} = ${f(cake.mChoc, 4)} g`], ["Chiffres significatifs : 3×10⁻²² n'en a qu'un, le résultat n'en garde qu'un.", "<b>m ≈ 2×10² g</b> de chocolat"]])}
${qa(2, "Quel volume de gaz est libéré dans le gâteau lors de la cuisson ?", [["Le sachet fait 11 g, pas 10 g : la quantité de CO<sub>2</sub> est proportionnelle à la masse de levure.", `n(CO₂) = 2,7×10⁻² × 11 / 10 = ${e(cake.nCO2, 3)} mol`], ["Le gaz est libéré <b>dans le four, à 180 °C</b> : on utilise V<sub>m</sub> = 36,9 L/mol, pas 24 L/mol.", ""], ["V = n × V<sub>m</sub>.", `V = ${e(cake.nCO2, 3)} × 36,9 = ${f(cake.VCO2, 4)} L`], ["Deux chiffres significatifs (2,7×10⁻²).", "<b>V ≈ 1,1 L</b> de CO₂"]])}
${qa(3, "Le moule rectangle est-il adapté pour faire ce gâteau ?", [["Le gâteau occupe la pâte plus le gaz emprisonné dedans.", `V<sub>gâteau</sub> = 0,500 + ${f(cake.VCO2, 2)} = <b>${f(cake.Vfinal, 2)} L</b>`], ["Moule rectangle : V = L × l × h, en cm³ puis en L (1 L = 1000 cm³).", `V = 24 × 8,0 × 6,0 = ${f(cake.Vrect * 1000, 4)} cm³ = <b>${f(cake.Vrect, 2)} L</b>`], ["Moule rond : V = π × r² × h.", `V = π × 10² × 6,0 = ${f(cake.Vround * 1000, 4)} cm³ = <b>${f(cake.Vround, 2)} L</b>`], ["On compare avec le volume du gâteau.", `${f(cake.Vrect, 2)} L &lt; ${f(cake.Vfinal, 2)} L : le moule rectangle est <b>trop petit</b>, le gâteau déborderait. Le moule rond (${f(cake.Vround, 2)} L &gt; ${f(cake.Vfinal, 2)} L) est le moule adapté.`]])}
<h3>Pour aller plus loin</h3>
${qa(4, "Quelle masse de sucre faut-il ? (M(C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) à calculer avec les données)", [["Masse molaire d'après la formule.", `M = 12 × 12,0 + 22 × 1,00 + 11 × 16,0 = ${f(cake.Msugar, 4)} g/mol`], ["m = n × M.", `m = 0,58 × ${f(cake.Msugar, 4)} = ${f(cake.mSugar, 4)} g → <b>2,0×10² g</b> (deux chiffres significatifs)`]])}
${qa(5, "Quelle masse de farine, et quelle masse de beurre ? (1 µg = 10⁻⁶ g)", [["Farine : m = n × M.", `m = 1,15 × 108,36 = ${f(cake.mFlour, 4)} g → <b>125 g</b>`], ["Beurre : convertir les µg en g.", `1,25×10⁸ µg × 10⁻⁶ g/µg = <b>1,25×10² g</b> = 125 g`]])}
</section>

<section class="ex"><h2>Exercice 2 · La limonade maison</h2>
<p>Pour faire une limonade pétillante, on met <b>6,0 g de bicarbonate de soude</b> (hydrogénocarbonate de sodium NaHCO<sub>3</sub>) dans 1,0 L de jus de citron, dans une bouteille de 1,5 L que l'on ferme aussitôt. L'acide du jus réagit avec le bicarbonate :</p>
<p class="formula">NaHCO<sub>3</sub>(s) + H<sub>3</sub>O⁺(aq) → Na⁺(aq) + CO<sub>2</sub>(g) + 2 H<sub>2</sub>O(l)</p>
${data(["M(Na) = 23,0 g/mol ; M(H) = 1,00 g/mol ; M(C) = 12,0 g/mol ; M(O) = 16,0 g/mol", "À 20 °C, V<sub>m</sub> = 24 L/mol", "N<sub>A</sub> = 6,02×10²³ mol⁻¹"])}
${rule}
${qa(1, "Calculer la masse molaire de NaHCO<sub>3</sub>.", [["Un Na, un H, un C et trois O.", `M = 23,0 + 1,00 + 12,0 + 3 × 16,0 = <b>${f(lem.M, 3)} g/mol</b>`]])}
${qa(2, "Calculer la quantité de bicarbonate de soude.", [["n = m / M.", `n = 6,0 / ${f(lem.M, 3)} = ${f(lem.n, 4)} → <b>n = ${e(lem.n, 2)} mol</b> (deux chiffres significatifs, d'après 6,0 g)`]])}
${qa(3, "Quel volume de CO<sub>2</sub> pourrait être libéré à 20 °C, si tout le bicarbonate réagit ?", [["L'équation montre 1 NaHCO₃ pour 1 CO₂ : les quantités sont égales.", `n(CO₂) = n(NaHCO₃) = ${f(lem.n, 4)} mol`], ["V = n × V<sub>m</sub>, avec V<sub>m</sub> = 24 L/mol.", `V = ${f(lem.n, 4)} × 24 = ${f(lem.V, 4)} L → <b>V ≈ 1,7 L</b>`]])}
${qa(4, "Combien de molécules de CO<sub>2</sub> cela représente-t-il ?", [["N = n × N<sub>A</sub>.", `N = ${f(lem.n, 4)} × 6,02×10²³ = <b>${e(lem.N, 2)}</b> molécules`]])}
${qa(5, "Est-il prudent de fermer la bouteille ? Justifier.", [["Espace libre dans la bouteille : 1,5 − 1,0.", `V<sub>libre</sub> = ${f(lem.head, 2)} L`], ["On compare avec le gaz libéré.", `${f(lem.V, 2)} L de gaz &gt; ${f(lem.head, 2)} L d'espace libre`], ["Conclusion.", "<b>Non.</b> Le gaz demande plus de trois fois la place disponible : la pression monterait et la bouteille pourrait éclater. Il faut beaucoup moins de bicarbonate, ou laisser la bouteille ouverte."]])}
</section>

<section class="ex"><h2>Exercice 3 · Le sirop de menthe</h2>
<p>Un sirop de menthe contient du saccharose (C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) à la concentration massique <b>C<sub>m0</sub> = 6,0×10² g/L</b>. Pour le boire, on mélange <b>1 volume de sirop avec 8 volumes d'eau</b> (les volumes sont supposés additifs). Un verre contient 25 cL. Un morceau de sucre pèse 5,0 g.</p>
${data(["M(C) = 12,0 g/mol ; M(H) = 1,00 g/mol ; M(O) = 16,0 g/mol", "N<sub>A</sub> = 6,02×10²³ mol⁻¹"])}
${rule}
${qa(1, "Calculer la masse molaire du saccharose et la concentration molaire C<sub>0</sub> du sirop.", [["Masse molaire.", `M = 12 × 12,0 + 22 × 1,00 + 11 × 16,0 = <b>${f(syr.M, 3)} g/mol</b>`], ["C = C<sub>m</sub> / M.", `C<sub>0</sub> = ${f(syr.Cm0, 2)} / ${f(syr.M, 3)} = ${f(syr.C0, 4)} → <b>1,8 mol/L</b> (deux chiffres significatifs)`]])}
${qa(2, "Quel est le facteur de dilution ?", [["Le volume final est de 1 + 8 = 9 volumes, dont 1 de sirop.", `F = V<sub>final</sub> / V<sub>sirop</sub> = 9 / 1 = <b>9</b>`]])}
${qa(3, "Trouver la concentration massique et la concentration molaire du sucre dans la boisson.", [["La dilution divise toutes les concentrations par F.", ""], ["Concentration massique.", `C<sub>m</sub> = C<sub>m0</sub> / F = ${f(syr.Cm0, 2)} / 9 = <b>${f(syr.Cm, 2)} g/L</b>`], ["Concentration molaire.", `C = C<sub>0</sub> / F = ${f(syr.C0, 4)} / 9 = <b>${f(syr.C, 2)} mol/L</b>`], ["Vérification : C<sub>m</sub> = C × M.", `${f(syr.C, 4)} × ${f(syr.M, 3)} = ${f(syr.C * syr.M, 3)} g/L ✓`]])}
${qa(4, "Quels volumes de sirop et d'eau pour un verre de 25 cL ?", [["25 cL = 0,25 L. Volume de sirop : V<sub>0</sub> = V / F.", `V<sub>0</sub> = 0,25 / 9 = ${f(syr.V0 * 1000, 3)} mL → <b>28 mL</b> de sirop`], ["Eau : le reste du verre.", `${f(syr.Vg * 1000, 3)} − ${f(syr.V0 * 1000, 3)} = ${f(syr.Vw * 1000, 3)} → <b>2,2×10² mL</b> d'eau`]])}
${qa(5, "Combien de morceaux de sucre y a-t-il dans un verre ?", [["Masse de sucre : m = C<sub>m</sub> × V.", `m = ${f(syr.Cm, 4)} × 0,25 = ${f(syr.m, 3)} g`], ["Nombre de morceaux.", `${f(syr.m, 3)} / 5,0 = ${f(syr.cubes, 3)} → <b>environ 3,3 morceaux</b>`], ["Bonus : molécules de sucre dans le verre.", `n = ${f(syr.m, 3)} / ${f(syr.M, 3)} = ${f(syr.n, 3)} mol ; N = ${f(syr.n, 3)} × 6,02×10²³ = ${e(syr.N, 2)}`]])}
</section>

<section class="ex"><h2>Exercice 4 · Le sérum physiologique maison</h2>
<p>Un lavage de nez est une solution de chlorure de sodium (NaCl) dans l'eau, de concentration massique <b>9,0 g/L</b>. On veut en préparer <b>500 mL</b>.</p>
${data(["M(Na) = 23,0 g/mol ; M(Cl) = 35,5 g/mol", "N<sub>A</sub> = 6,02×10²³ mol⁻¹", "NaCl(s) → Na⁺(aq) + Cl⁻(aq)"])}
${rule}
${qa(1, "Quelle masse de NaCl faut-il peser ?", [["C<sub>m</sub> = m / V, donc m = C<sub>m</sub> × V (V en litres).", `m = 9,0 × 0,500 = <b>${f(sal.m, 2)} g</b>`]])}
${qa(2, "Décrire le protocole et nommer la verrerie.", [["Peser 4,5 g de NaCl sur une balance, avec une coupelle de pesée et une spatule.", ""], ["Les verser dans une <b>fiole jaugée de 500 mL</b> avec un entonnoir ; rincer la coupelle et l'entonnoir dans la fiole avec de l'eau distillée.", ""], ["Ajouter de l'eau distillée jusqu'aux deux tiers environ, boucher et agiter jusqu'à dissolution du sel.", ""], ["Compléter jusqu'au trait de jauge avec de l'eau distillée (pipette Pasteur pour les dernières gouttes), boucher et retourner pour homogénéiser.", "V<sub>sol</sub> = 500 mL exactement"]])}
${qa(3, "Calculer la concentration molaire de la solution et la concentration de chaque ion.", [["Masse molaire.", `M = 23,0 + 35,5 = ${f(sal.M, 3)} g/mol`], ["C = C<sub>m</sub> / M.", `C = 9,0 / ${f(sal.M, 3)} = ${f(sal.C, 4)} → <b>0,15 mol/L</b>`], ["Une unité formulaire donne un Na⁺ et un Cl⁻.", "<b>[Na⁺] = [Cl⁻] = 0,15 mol/L</b>"]])}
${qa(4, "Combien d'ions Na⁺ y a-t-il dans une ampoule de 5,0 mL ?", [["Quantité : n = C × V, avec V = 5,0 mL = 5,0×10⁻³ L.", `n = ${f(sal.C, 4)} × 5,0×10⁻³ = ${e(sal.n5, 3)} mol`], ["N = n × N<sub>A</sub>.", `N = ${e(sal.n5, 3)} × 6,02×10²³ = <b>${e(sal.N5, 2)}</b> ions`]])}
${qa(5, "À partir de cette solution, on veut 100,0 mL d'une solution dix fois plus diluée. Comment procéder ?", [["F = 10, et n est conservé : C × V<sub>0</sub> = (C / 10) × V<sub>1</sub>.", ""], ["V<sub>0</sub> = V<sub>1</sub> / F.", `V<sub>0</sub> = 100,0 / 10 = <b>${f(sal.V0, 3)} mL</b>`], ["Prélever 10,0 mL avec une pipette jaugée, les verser dans une fiole jaugée de 100,0 mL, compléter jusqu'au trait avec de l'eau distillée.", `C′ = ${f(sal.C / 10, 2)} mol/L`]])}
</section>

<section class="ex"><h2>Exercice 5 · Le ballon d'hélium</h2>
<p>À une fête d'anniversaire, un ballon est gonflé avec <b>3,0 L d'hélium</b> à 20 °C. Le ballon (enveloppe et ficelle) a une masse de <b>2,0 g</b>. On admet que le ballon s'élève si la masse d'air qu'il déplace est supérieure à sa propre masse totale (hélium + enveloppe).</p>
${data(["M(He) = 4,00 g/mol ; M(air) = 29,0 g/mol (moyenne)", "À 20 °C, V<sub>m</sub> = 24 L/mol", "N<sub>A</sub> = 6,02×10²³ mol⁻¹"])}
${rule}
${qa(1, "Combien de moles d'hélium y a-t-il dans le ballon ?", [["n = V / V<sub>m</sub>.", `n = 3,0 / 24 = ${f(he.n, 3)} → <b>n = 0,13 mol</b> (deux chiffres significatifs)`]])}
${qa(2, "Combien d'atomes d'hélium cela représente-t-il ?", [["N = n × N<sub>A</sub> (l'hélium est formé d'atomes isolés). Garde n non arrondi.", `N = ${f(he.n, 3)} × 6,02×10²³ = <b>${e(he.N, 2)}</b> atomes`]])}
${qa(3, "Calculer la masse d'hélium et la masse volumique de l'hélium à 20 °C.", [["m = n × M.", `m = ${f(he.n, 3)} × 4,00 = <b>${f(he.m, 2)} g</b>`], ["Pour un gaz, ρ = m / V = M / V<sub>m</sub>.", `ρ = 4,00 / 24 = <b>${f(he.rho, 2)} g/L</b>`]])}
${qa(4, "Quelle est la masse du même volume d'air ?", [["Même volume et mêmes conditions : la même quantité de gaz, 0,125 mol.", ""], ["m = n × M(air).", `m = ${f(he.n, 3)} × 29,0 = ${f(he.mAir, 3)} → <b>3,6 g</b>`]])}
${qa(5, "Le ballon s'élève-t-il ?", [["Masse déplacée par le ballon : 3,6 g d'air. Masse du ballon : hélium + enveloppe.", `${f(he.m, 2)} + 2,0 = ${f(he.m + 2, 2)} g`], ["On compare.", `${f(he.mAir, 2)} g &gt; ${f(he.m + 2, 2)} g, soit un écart de ${f(he.net, 2)} g → <b>oui, il s'élève</b>, mais de justesse : avec une ficelle plus lourde d'environ 1 g, il resterait au sol.`]])}
</section>

<section class="ex"><h2>Exercice 6 · Pêchers ou pieds de melon ?</h2>
<p>Un agriculteur a un bidon non étiqueté de bouillie à base de sulfate de cuivre (Cu²⁺, SO<sub>4</sub><sup>2−</sup>). La bouillie est préparée à <b>7,5×10⁻² mol/L pour les pêchers</b> et à <b>1,5×10⁻² mol/L pour les pieds de melon</b>. Pour savoir de laquelle il s'agit, on réalise un dosage par spectrophotométrie.</p>
<p>À partir d'une solution mère S<sub>0</sub> de concentration <b>1,00×10⁻¹ mol/L</b>, on prépare cinq étalons de volume <b>50,0 mL</b>. On mesure leur absorbance A à une longueur d'onde fixée :</p>
${table(["Solution", "S<sub>1</sub>", "S<sub>2</sub>", "S<sub>3</sub>", "S<sub>4</sub>", "S<sub>5</sub>"], [["V<sub>0</sub> de S<sub>0</sub> prélevé (mL)", ...bor.V0.map(v => f(v, 3))], ["C (mol/L)", "?", "?", "?", "?", "?"], ["A", ...bor.A.map(a => f(a, 3))]])}
<p>La bouillie est trop concentrée pour être mesurée directement. On <b>dilue 10,0 mL jusqu'à 50,0 mL</b> et la solution diluée a pour absorbance A = <b>0,152</b>.</p>
${data(["M(Cu) = 63,5 g/mol"])}
${rule}
${qa(1, "Calculer la concentration de chaque étalon.", [["C'est une dilution : C = C<sub>0</sub> × V<sub>0</sub> / V.", ""], ["On l'applique à chaque volume.", bor.V0.map((v, i) => `S<sub>${i + 1}</sub> : 1,00×10⁻¹ × ${f(v, 3)} / 50,0 = <b>${e(bor.C[i], 3)} mol/L</b>`).join("<br>")]])}
${qa(2, "Tracer A = f(C). La loi de Beer-Lambert est-elle vérifiée ? Donner le coefficient k.", [["Les points sont alignés sur une droite qui passe par l'origine : A est proportionnelle à C, donc A = k × C. La loi est vérifiée.", ""], ["k = ΣCA / ΣC² (moindres carrés par l'origine), ou la pente de la droite.", `k = <b>${f(kT, 3)} L/mol</b> (environ 10 L/mol)`], ["Vérifier le rapport A / C pour chaque point.", bor.C.map((c, i) => f(bor.A[i] / c, 3)).join(" ; ") + " L/mol"]])}
${qa(3, "Quelle est la concentration de la solution diluée ?", [["A = 0,152 est dans la gamme des étalons (0,101 à 0,809) : on peut utiliser la droite.", ""], ["C = A / k.", `C<sub>diluée</sub> = 0,152 / ${f(kT, 3)} = <b>${e(bor.Cd, 3)} mol/L</b>`]])}
${qa(4, "En déduire la concentration de la bouillie dans le bidon.", [["Facteur de dilution : 10,0 mL dans 50,0 mL.", "F = 50,0 / 10,0 = 5"], ["Le bidon est F fois plus concentré.", `C = F × C<sub>diluée</sub> = 5 × ${e(bor.Cd, 3)} = ${e(bor.Cx, 3)} → <b>7,5×10⁻² mol/L</b>`]])}
${qa(5, "La bouillie est-elle destinée aux pêchers ou aux pieds de melon ?", [["On compare aux deux valeurs.", `${e(bor.Cx, 2)} ≈ 7,5×10⁻² mol/L, et non 1,5×10⁻² mol/L`], ["Conclusion.", "<b>La bouillie est destinée aux pêchers.</b>"]])}
${qa(6, "Quelle est la concentration massique en ions Cu²⁺ dans le bidon ?", [["[Cu²⁺] = C, car CuSO₄ donne un Cu²⁺ par unité formulaire.", ""], ["C<sub>m</sub> = C × M.", `C<sub>m</sub> = ${e(bor.Cx, 2)} × 63,5 = <b>${f(bor.Cm, 2)} g/L</b>`]])}
</section>`});
}
