// English exercise page: the cake sheet + new problems in the same style. Solutions are hidden in <details>.
import exData from "./chimie_ex_data.mjs";

export default function (ctx) {
  const {pg, table, steps, f, e, CH} = ctx;
  const {cake, lem, syr, sal, he, bor} = exData(CH);
  const qa = (n, q, sol) => `<div class="qa"><p><b>${n}.</b> ${q}</p><details class="qsol"><summary>Show the solution</summary>${steps(sol)}</details></div>`;
  const data = items => `<div class="databox"><b>Data</b><ul>${items.map(i => `<li>${i}</li>`).join("")}</ul></div>`;
  const rule = `<p class="muted"><i>Every answer must be justified: write the formula in letters, then the numerical calculation, and respect the significant figures.</i></p>`;
  const kT = bor.k;

  pg("exercices_chimie.html", {title: "Exercices : le gâteau et autres problèmes", eyebrow: "Chimie · Exercices",
    lede: "Problems in the style of your sheet: a short story, a data box, then questions that need a reasoned answer. They use chapters 1 and 2 (moles, concentrations, dissolution, dilution, dosage). Try each question first, then open its solution.",
    body: `<section><h2>How to answer</h2>
<ol><li><b>Formula in letters</b> first (for example n = m / M), <b>then</b> the numbers, then the result with its unit.</li><li><b>Convert units</b> before computing (µg → g, mL → L, °C does not change a formula but changes V<sub>m</sub>).</li><li><b>Significant figures</b>: a product or quotient has as many as the <i>least precise</i> data. Keep extra digits in intermediate steps and round at the end. “3×10⁻²² g” has one significant figure; “1.11 mol” has three.</li><li>Finish with a <b>sentence</b> that answers the question asked.</li></ol></section>

<section class="ex"><h2>Exercise 1 · The chocolate cake</h2>
<p>Birthday cake of Mrs Dubois, who loves chocolate cake. Ingredients: 1.11 mol of dark chocolate, 0.58 mol of sugar, 5 eggs, 1.15 mol of flour, 1.25×10⁸ µg of butter, 1 sachet of yeast (11 g). Utensils: a rectangular mould 24 cm long, 8 cm wide, 6 cm high; a round mould of 10 cm radius and 6 cm high.</p>
<p>The yeast makes cakes rise. At 24 °C the molar volume of a gas is 24 L/mol; at 180 °C it is <b>36.9 L/mol</b>. 10 g of yeast releases 2.7×10⁻² mol of CO<sub>2</sub>. After mixing, the dough has a volume of 500 mL. The oven is at 180 °C.</p>
${data(["Sugar: C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>", "Mass of one chocolate molecule: 3×10⁻²² g", "Molar mass of flour: 108.36 g/mol", "M(C) = 12.0 g/mol ; M(H) = 1.00 g/mol ; M(O) = 16.0 g/mol", "N<sub>A</sub> = 6.02×10²³ mol⁻¹", "Cuboid volume: L × l × h ; cylinder volume: π × r² × h"])}
${rule}
${qa(1, "What mass of chocolate must be used?", [["The data gives the mass of <b>one molecule</b>. One mole is N<sub>A</sub> molecules, so M = m<sub>molecule</sub> × N<sub>A</sub>.", `M = 3×10⁻²² × 6.02×10²³ = ${f(cake.Mchoc, 4)} g/mol`], ["Mass from the amount: m = n × M.", `m = 1.11 × ${f(cake.Mchoc, 4)} = ${f(cake.mChoc, 4)} g`], ["Significant figures: 3×10⁻²² has only one, so the result keeps one.", "<b>m ≈ 2×10² g</b> of chocolate"]])}
${qa(2, "What volume of gas is released in the cake during baking?", [["The sachet has 11 g, not 10 g: the amount of CO<sub>2</sub> is proportional to the mass of yeast.", `n(CO₂) = 2.7×10⁻² × 11 / 10 = ${e(cake.nCO2, 3)} mol`], ["The gas is released <b>in the oven, at 180 °C</b>: use V<sub>m</sub> = 36.9 L/mol, not 24 L/mol.", ""], ["V = n × V<sub>m</sub>.", `V = ${e(cake.nCO2, 3)} × 36.9 = ${f(cake.VCO2, 4)} L`], ["Two significant figures (2.7×10⁻²).", "<b>V ≈ 1.1 L</b> of CO₂"]])}
${qa(3, "Is the rectangular mould suitable for this cake?", [["The cake takes up the dough plus the gas trapped in it.", `V<sub>cake</sub> = 0.500 + ${f(cake.VCO2, 2)} = <b>${f(cake.Vfinal, 2)} L</b>`], ["Rectangular mould: V = L × l × h, in cm³ then L (1 L = 1000 cm³).", `V = 24 × 8.0 × 6.0 = ${f(cake.Vrect * 1000, 4)} cm³ = <b>${f(cake.Vrect, 2)} L</b>`], ["Round mould: V = π × r² × h.", `V = π × 10² × 6.0 = ${f(cake.Vround * 1000, 4)} cm³ = <b>${f(cake.Vround, 2)} L</b>`], ["Compare with the volume of the cake.", `${f(cake.Vrect, 2)} L &lt; ${f(cake.Vfinal, 2)} L: the rectangular mould is <b>too small</b>, the cake would overflow. The round mould (${f(cake.Vround, 2)} L &gt; ${f(cake.Vfinal, 2)} L) is the suitable one.`]])}
<h3>To go further</h3>
${qa(4, "What mass of sugar is needed? (M(C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) from the data)", [["Molar mass from the formula.", `M = 12 × 12.0 + 22 × 1.00 + 11 × 16.0 = ${f(cake.Msugar, 4)} g/mol`], ["m = n × M.", `m = 0.58 × ${f(cake.Msugar, 4)} = ${f(cake.mSugar, 4)} g → <b>2.0×10² g</b> (two significant figures)`]])}
${qa(5, "What mass of flour, and what mass of butter? (1 µg = 10⁻⁶ g)", [["Flour: m = n × M.", `m = 1.15 × 108.36 = ${f(cake.mFlour, 4)} g → <b>125 g</b>`], ["Butter: convert µg to g.", `1.25×10⁸ µg × 10⁻⁶ g/µg = <b>1.25×10² g</b> = 125 g`]])}
</section>

<section class="ex"><h2>Exercise 2 · Homemade lemonade</h2>
<p>To make a fizzy lemonade, you put <b>6.0 g of baking soda</b> (sodium hydrogencarbonate NaHCO<sub>3</sub>) into 1.0 L of lemon juice in a bottle of 1.5 L, which you close at once. The acid of the juice reacts with the baking soda:</p>
<p class="formula">NaHCO<sub>3</sub>(s) + H<sub>3</sub>O⁺(aq) → Na⁺(aq) + CO<sub>2</sub>(g) + 2 H<sub>2</sub>O(l)</p>
${data(["M(Na) = 23.0 g/mol ; M(H) = 1.00 g/mol ; M(C) = 12.0 g/mol ; M(O) = 16.0 g/mol", "At 20 °C, V<sub>m</sub> = 24 L/mol", "N<sub>A</sub> = 6.02×10²³ mol⁻¹"])}
${rule}
${qa(1, "Calculate the molar mass of NaHCO<sub>3</sub>.", [["One Na, one H, one C and three O.", `M = 23.0 + 1.00 + 12.0 + 3 × 16.0 = <b>${f(lem.M, 3)} g/mol</b>`]])}
${qa(2, "Calculate the amount of baking soda.", [["n = m / M.", `n = 6.0 / ${f(lem.M, 3)} = ${f(lem.n, 4)} → <b>n = ${e(lem.n, 2)} mol</b> (two significant figures, from 6.0 g)`]])}
${qa(3, "What volume of CO<sub>2</sub> could be released at 20 °C, if all the baking soda reacts?", [["The equation shows 1 NaHCO₃ for 1 CO₂: the amounts are equal.", `n(CO₂) = n(NaHCO₃) = ${f(lem.n, 4)} mol`], ["V = n × V<sub>m</sub>, with V<sub>m</sub> = 24 L/mol.", `V = ${f(lem.n, 4)} × 24 = ${f(lem.V, 4)} L → <b>V ≈ 1.7 L</b>`]])}
${qa(4, "How many CO<sub>2</sub> molecules is that?", [["N = n × N<sub>A</sub>.", `N = ${f(lem.n, 4)} × 6.02×10²³ = <b>${e(lem.N, 2)}</b> molecules`]])}
${qa(5, "Is it safe to close the bottle? Justify.", [["Free space in the bottle: 1.5 − 1.0.", `V<sub>free</sub> = ${f(lem.head, 2)} L`], ["Compare with the gas released.", `${f(lem.V, 2)} L of gas &gt; ${f(lem.head, 2)} L of free space`], ["Conclusion.", "<b>No.</b> The gas needs more than three times the room available, so the pressure would build up and the bottle could burst. Use much less baking soda, or leave the bottle open."]])}
</section>

<section class="ex"><h2>Exercise 3 · Mint syrup</h2>
<p>A mint syrup contains sucrose (C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) at a mass concentration <b>C<sub>m0</sub> = 6.0×10² g/L</b>. To drink it, you mix <b>1 volume of syrup with 8 volumes of water</b> (volumes are assumed to add up). A glass holds 25 cL. A sugar cube weighs 5.0 g.</p>
${data(["M(C) = 12.0 g/mol ; M(H) = 1.00 g/mol ; M(O) = 16.0 g/mol", "N<sub>A</sub> = 6.02×10²³ mol⁻¹"])}
${rule}
${qa(1, "Calculate the molar mass of sucrose and the molar concentration C<sub>0</sub> of the syrup.", [["Molar mass.", `M = 12 × 12.0 + 22 × 1.00 + 11 × 16.0 = <b>${f(syr.M, 3)} g/mol</b>`], ["C = C<sub>m</sub> / M.", `C<sub>0</sub> = ${f(syr.Cm0, 2)} / ${f(syr.M, 3)} = ${f(syr.C0, 4)} → <b>1.8 mol/L</b> (two significant figures)`]])}
${qa(2, "What is the dilution factor?", [["The final volume is 1 + 8 = 9 volumes, of which 1 is syrup.", `F = V<sub>final</sub> / V<sub>syrup</sub> = 9 / 1 = <b>9</b>`]])}
${qa(3, "Find the mass concentration and the molar concentration of the sugar in the drink.", [["Dilution divides every concentration by F.", ""], ["Mass concentration.", `C<sub>m</sub> = C<sub>m0</sub> / F = ${f(syr.Cm0, 2)} / 9 = <b>${f(syr.Cm, 2)} g/L</b>`], ["Molar concentration.", `C = C<sub>0</sub> / F = ${f(syr.C0, 4)} / 9 = <b>${f(syr.C, 2)} mol/L</b>`], ["Check: C<sub>m</sub> = C × M.", `${f(syr.C, 4)} × ${f(syr.M, 3)} = ${f(syr.C * syr.M, 3)} g/L ✓`]])}
${qa(4, "What volumes of syrup and of water make one 25 cL glass?", [["25 cL = 0.25 L. Volume of syrup: V<sub>0</sub> = V / F.", `V<sub>0</sub> = 0.25 / 9 = ${f(syr.V0 * 1000, 3)} mL → <b>28 mL</b> of syrup`], ["Water: the rest of the glass.", `${f(syr.Vg * 1000, 3)} − ${f(syr.V0 * 1000, 3)} = ${f(syr.Vw * 1000, 3)} → <b>2.2×10² mL</b> of water`]])}
${qa(5, "How many sugar cubes are in one glass?", [["Mass of sugar: m = C<sub>m</sub> × V.", `m = ${f(syr.Cm, 4)} × 0.25 = ${f(syr.m, 3)} g`], ["Number of cubes.", `${f(syr.m, 3)} / 5.0 = ${f(syr.cubes, 3)} → <b>about 3.3 cubes</b>`], ["Bonus: molecules of sugar in the glass.", `n = ${f(syr.m, 3)} / ${f(syr.M, 3)} = ${f(syr.n, 3)} mol ; N = ${f(syr.n, 3)} × 6.02×10²³ = ${e(syr.N, 2)}`]])}
</section>

<section class="ex"><h2>Exercise 4 · Homemade saline solution</h2>
<p>A nasal wash is a solution of sodium chloride (NaCl) in water at a mass concentration of <b>9.0 g/L</b>. You want to prepare <b>500 mL</b> of it.</p>
${data(["M(Na) = 23.0 g/mol ; M(Cl) = 35.5 g/mol", "N<sub>A</sub> = 6.02×10²³ mol⁻¹", "NaCl(s) → Na⁺(aq) + Cl⁻(aq)"])}
${rule}
${qa(1, "What mass of NaCl must be weighed?", [["C<sub>m</sub> = m / V, so m = C<sub>m</sub> × V (V in litres).", `m = 9.0 × 0.500 = <b>${f(sal.m, 2)} g</b>`]])}
${qa(2, "Describe the protocol and name the glassware.", [["Weigh 4.5 g of NaCl on a balance, using a weighing boat and a spatula.", ""], ["Pour it into a <b>500 mL fiole jaugée</b> through a funnel; rinse the boat and funnel into the flask with distilled water.", ""], ["Add distilled water to about two thirds, stopper and swirl until the salt has dissolved.", ""], ["Fill to the trait de jauge with distilled water (Pasteur pipette for the last drops), stopper and invert to homogenise.", "V<sub>sol</sub> = 500 mL exactly"]])}
${qa(3, "Calculate the molar concentration of the solution and the concentration of each ion.", [["Molar mass.", `M = 23.0 + 35.5 = ${f(sal.M, 3)} g/mol`], ["C = C<sub>m</sub> / M.", `C = 9.0 / ${f(sal.M, 3)} = ${f(sal.C, 4)} → <b>0.15 mol/L</b>`], ["One formula unit gives one Na⁺ and one Cl⁻.", "<b>[Na⁺] = [Cl⁻] = 0.15 mol/L</b>"]])}
${qa(4, "How many Na⁺ ions are in a 5.0 mL ampoule?", [["Amount: n = C × V, with V = 5.0 mL = 5.0×10⁻³ L.", `n = ${f(sal.C, 4)} × 5.0×10⁻³ = ${e(sal.n5, 3)} mol`], ["N = n × N<sub>A</sub>.", `N = ${e(sal.n5, 3)} × 6.02×10²³ = <b>${e(sal.N5, 2)}</b> ions`]])}
${qa(5, "From this solution, you want 100.0 mL of a solution ten times more dilute. How do you proceed?", [["F = 10, and n is conserved: C × V<sub>0</sub> = (C / 10) × V<sub>1</sub>.", ""], ["V<sub>0</sub> = V<sub>1</sub> / F.", `V<sub>0</sub> = 100.0 / 10 = <b>${f(sal.V0, 3)} mL</b>`], ["Take 10.0 mL with a pipette jaugée, pour into a 100.0 mL fiole jaugée, fill to the mark with distilled water.", `C′ = ${f(sal.C / 10, 2)} mol/L`]])}
</section>

<section class="ex"><h2>Exercise 5 · The helium balloon</h2>
<p>At a birthday party, a balloon is filled with <b>3.0 L of helium</b> at 20 °C. The balloon (envelope and string) has a mass of <b>2.0 g</b>. We assume the balloon rises if the mass of air it displaces is greater than its own total mass (helium + envelope).</p>
${data(["M(He) = 4.00 g/mol ; M(air) = 29.0 g/mol (average)", "At 20 °C, V<sub>m</sub> = 24 L/mol", "N<sub>A</sub> = 6.02×10²³ mol⁻¹"])}
${rule}
${qa(1, "How many moles of helium are in the balloon?", [["n = V / V<sub>m</sub>.", `n = 3.0 / 24 = ${f(he.n, 3)} → <b>n = 0.13 mol</b> (two significant figures)`]])}
${qa(2, "How many helium atoms is that?", [["N = n × N<sub>A</sub> (helium is made of single atoms). Keep n unrounded.", `N = ${f(he.n, 3)} × 6.02×10²³ = <b>${e(he.N, 2)}</b> atoms`]])}
${qa(3, "Calculate the mass of helium and the density of helium at 20 °C.", [["m = n × M.", `m = ${f(he.n, 3)} × 4.00 = <b>${f(he.m, 2)} g</b>`], ["For a gas, ρ = m / V = M / V<sub>m</sub>.", `ρ = 4.00 / 24 = <b>${f(he.rho, 2)} g/L</b>`]])}
${qa(4, "What is the mass of the same volume of air?", [["Same volume and conditions: the same amount of gas, 0.125 mol.", ""], ["m = n × M(air).", `m = ${f(he.n, 3)} × 29.0 = ${f(he.mAir, 3)} → <b>3.6 g</b>`]])}
${qa(5, "Does the balloon rise?", [["Mass displaced by the balloon: 3.6 g of air. Mass of the balloon: helium + envelope.", `${f(he.m, 2)} + 2.0 = ${f(he.m + 2, 2)} g`], ["Compare.", `${f(he.mAir, 2)} g &gt; ${f(he.m + 2, 2)} g, a difference of ${f(he.net, 2)} g → <b>yes, it rises</b>, but only just: with a string heavier by about 1 g it would stay down.`]])}
</section>

<section class="ex"><h2>Exercise 6 · Peach trees or melon plants?</h2>
<p>A farmer has an unlabelled can of copper sulfate spray (Cu²⁺, SO<sub>4</sub><sup>2−</sup>). The spray is made at <b>7.5×10⁻² mol/L for peach trees</b> and at <b>1.5×10⁻² mol/L for melon plants</b>. To find out which one it is, you do a dosage by spectrophotometry.</p>
<p>From a mother solution S<sub>0</sub> of concentration <b>1.00×10⁻¹ mol/L</b>, five standards of volume <b>50.0 mL</b> are prepared. Their absorbances A are measured at a set wavelength:</p>
${table(["Solution", "S<sub>1</sub>", "S<sub>2</sub>", "S<sub>3</sub>", "S<sub>4</sub>", "S<sub>5</sub>"], [["V<sub>0</sub> of S<sub>0</sub> taken (mL)", ...bor.V0.map(v => f(v, 3))], ["C (mol/L)", "?", "?", "?", "?", "?"], ["A", ...bor.A.map(a => f(a, 3))]])}
<p>The spray is too concentrated to be measured directly. <b>10.0 mL are diluted to 50.0 mL</b> and the diluted solution has A = <b>0.152</b>.</p>
${data(["M(Cu) = 63.5 g/mol"])}
${rule}
${qa(1, "Calculate the concentration of each standard.", [["It is a dilution: C = C<sub>0</sub> × V<sub>0</sub> / V.", ""], ["Apply it to each volume.", bor.V0.map((v, i) => `S<sub>${i + 1}</sub>: 1.00×10⁻¹ × ${f(v, 3)} / 50.0 = <b>${e(bor.C[i], 3)} mol/L</b>`).join("<br>")]])}
${qa(2, "Draw A = f(C). Is the Beer–Lambert law verified? Give the coefficient k.", [["The points are aligned along a straight line that passes through the origin: A is proportional to C, so A = k × C. The law is verified.", ""], ["k = ΣCA / ΣC² (least squares through the origin), or the slope of the line.", `k = <b>${f(kT, 3)} L/mol</b> (about 10 L/mol)`], ["Check the ratio A / C for each point.", bor.C.map((c, i) => f(bor.A[i] / c, 3)).join(" ; ") + " L/mol"]])}
${qa(3, "What is the concentration of the diluted solution?", [["A = 0.152 is inside the range of the standards (0.101 to 0.809): the line can be used.", ""], ["C = A / k.", `C<sub>diluted</sub> = 0.152 / ${f(kT, 3)} = <b>${e(bor.Cd, 3)} mol/L</b>`]])}
${qa(4, "Deduce the concentration of the spray in the can.", [["Dilution factor: 10.0 mL into 50.0 mL.", "F = 50.0 / 10.0 = 5"], ["The can is F times more concentrated.", `C = F × C<sub>diluted</sub> = 5 × ${e(bor.Cd, 3)} = ${e(bor.Cx, 3)} → <b>7.5×10⁻² mol/L</b>`]])}
${qa(5, "Is the spray meant for peach trees or for melon plants?", [["Compare with the two values.", `${e(bor.Cx, 2)} ≈ 7.5×10⁻² mol/L, not 1.5×10⁻² mol/L`], ["Conclusion.", "<b>The spray is meant for peach trees.</b>"]])}
${qa(6, "What is the mass concentration of Cu²⁺ ions in the can?", [["[Cu²⁺] = C, since CuSO₄ gives one Cu²⁺ per formula unit.", ""], ["C<sub>m</sub> = C × M.", `C<sub>m</sub> = ${e(bor.Cx, 2)} × 63.5 = <b>${f(bor.Cm, 2)} g/L</b>`]])}
</section>`});
}
