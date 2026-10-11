// Builds Eva's notes site into ./dist from the project sources (node website/build.mjs).
// Also writes artifact_index.html: the home page without <html>/<head>, for publishing as a Claude artifact.
import fs from "node:fs"; import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, "..");
const OUT = path.join(HERE, "dist");
fs.rmSync(OUT, {recursive:true, force:true}); fs.mkdirSync(path.join(OUT,"img"), {recursive:true});

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@500;600;700&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap">`;
const SITE = "Eva's notes on Engineering";

function page(file, {title, eyebrow, lede, body, prev, next, home=false}){
  const head = `<title>${home ? SITE : title + " · Eva's notes"}</title>\n${FONTS}\n<link rel="stylesheet" href="site.css">`;
  const crumb = home ? `<span class="crumb">Sciences de l'ingénieur · Chimie</span>` : `<a class="crumb" href="home.html">← ${SITE}</a>`;
  const pager = (prev||next) ? `<nav class="pager">${prev?`<a href="${prev[0]}">← ${prev[1]}</a>`:"<span></span>"}${next?`<a href="${next[0]}">${next[1]} →</a>`:""}</nav>` : "";
  const html = `<header class="nb"><div class="nb-in">${crumb}${eyebrow?`<p class="eyebrow" style="margin-top:14px">${eyebrow}</p>`:""}<h1>${home?SITE:title}</h1>${lede?`<p class="lede">${lede}</p>`:""}</div></header>
<main>${body}${pager}</main>`;
  const doc = `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head}</head><body>\n${html}\n</body></html>`;
  fs.writeFileSync(path.join(OUT, file), doc);
  if (home) { fs.writeFileSync(path.join(OUT, "home.html"), doc); fs.writeFileSync(path.join(HERE, "artifact_index.html"), `${head}\n${html}`); }
}

// torseur: rows = [[force, moment] x3], units optional
const T = (name, pt, rows, units=true) => `<span class="tz"><span class="nm">{τ<sub>${name}</sub>} =</span><span class="mat">${rows.map(([f,m])=>`<span>${f}</span><span>${m}</span>`).join("")}${units?`<span class="u"><span>N</span><span>N·m</span></span>`:""}</span><span class="pt">${pt}</span></span>`;
const V = (...cols) => `<span class="vx">${cols.map(c=>typeof c==="string"?`<span>${c}</span>`:`<span class="col">${c.map(x=>`<span>${x}</span>`).join("")}</span>`).join("")}</span>`;
const table = (head, rows) => `<div class="tw"><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const sheets = (imgs) => `<details class="sheet"><summary>Voir les feuilles d'exercice</summary><div class="imgs">${imgs.map(([f,c])=>`<figure><img src="img/${f}" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`).join("")}</div></details>`;

for (const f of ["clanta.jpeg","clanta2.jpeg","pedale.jpeg","pedale2.jpeg","suspension.jpeg","robot.jpeg"]) fs.copyFileSync(path.join(ROOT,"SI_torseurs/docs",f), path.join(OUT,"img",f));
fs.copyFileSync(path.join(HERE,"site.css"), path.join(OUT,"site.css"));

// ---------- pages ----------
const EX = [
  ["torseurs.html","Torseurs : l'essentiel","The five ideas you need for every statics exercise.","read","Fiche"],
  ["poignee.html","Poignée de porte","Pivot of axis y, moving a moment with BABAR, and a PFS that has no solution.","sol","Corrigé"],
  ["pedale.html","Pédale de commande","A see-saw in 3D: find the foot force F and the action of the pivot.","sol","Corrigé"],
  ["suspension.html","Suspension automobile","Two-force members, a PFS on {4+6} then on arm 2: does the car sag less than 12 cm? Animated on the mechanism.","play","Interactif"],
  ["robot.html","Robot 6 axes","A PFS in 3D: the gripper, then the column on its base. Graph of joints, isolated systems and a 270 N·m tipping moment.","play","Interactif"],
  ["liaisons.html","Liaisons : la méthode","Equivalence classes, the standard joints, the graph and the kinematic diagram.","read","Fiche"],
  ["casse_ecrou.html","Casse-écrou","3 classes. Helical, pivot and slider in one small loop.","play","Interactif"],
  ["compresseur.html","Compresseur à piston","4 classes. Crank and connecting rod; a sliding pivot for the piston.","play","Interactif"],
  ["etau.html","Étau d'établi","4 classes. A loop plus an open branch: the lever.","play","Interactif"],
  ["pompe_engrenages.html","Pompe à engrenages","3 classes. Two pivots and a gear contact.","play","Interactif"],
  ["came_poussoir.html","Came et poussoir à galet","4 classes, and a spring that belongs to none. A cam-roller line contact.","play","Interactif"],
  ["papa_mordu.html","Papa mordu","The not-so-serious one: 5 classes, a ball joint, point contacts, and a jaw lever with an Aïe-mètre.","play","Pour rire"],
];
const rows = (list,start) => list.map(([f,t,d,k,lab],i)=>`<a class="row" href="${f}"><span class="n">${String(start+i).padStart(2,"0")}</span><span class="t">${t}</span><span class="tag ${k}">${lab}</span><span class="d">${d}</span></a>`).join("");
// ---------- chemistry courses (own module) ----------
const CHIM = await (await import("./chimie_pages.mjs")).default({page, table, V, T, fs, path, ROOT, HERE, OUT, SITE, rows});
page("index.html",{home:true,
  lede:"Cours, fiches et exercices corrigés : sciences de l'ingénieur (statique, liaisons mécaniques), puis chimie (quantité de matière, dissolution et dilution, dosage par étalonnage). Les exercices interactifs se corrigent tout seuls, et chaque exercice a sa solution pas à pas.",
  body:`<section><div class="sec-head"><h2>Statique : torseurs</h2><span class="muted">Actions mécaniques, déplacement de moments, PFS</span></div><div class="toc">${rows(EX.slice(0,5),1)}</div></section>
<section><div class="sec-head"><h2>Modélisation : liaisons mécaniques</h2><span class="muted">Classes d'équivalence, graphe, schéma cinématique</span></div><div class="toc">${rows(EX.slice(5),6)}</div></section>
${CHIM.home}
<section class="key"><p><b>How to use the interactive exercises.</b> Colour the parts into classes, move the slider to watch the mechanism, press <i>Vérifier</i>. The full answers sit at the bottom of each page, folded. Try first, then open them. In the chemistry trainers, every question has a hint and a step-by-step solution.</p></section>`});

page("torseurs.html",{title:"Torseurs : l'essentiel",eyebrow:"Statique · Fiche",
  lede:"A torseur describes a mechanical action: what it pushes (force) and what it turns (moment), written at one point.",next:["poignee.html","Poignée de porte"],
  body:`<section><h2>1 · A torseur = force column + moment column</h2>
<div class="tzs">${T("","P",[["X","L"],["Y","M"],["Z","N"]])}</div>
<ul><li>The <b>force</b> (resultant) makes things slide. It is the same at every point.</li>
<li>The <b>moment</b> makes things turn. It depends on the point where it is written.</li>
<li>A force applied at A has <b>zero moment at A</b> (lever arm = 0).</li></ul></section>
<section><h2>2 · Joints: free ⇔ 0, blocked ⇔ unknown</h2>
${table(["Motion along / about x","In the joint's torseur"],[["translation free","X = 0"],["translation blocked","X unknown"],["rotation free","L = 0"],["rotation blocked","L unknown"]])}
<p>Pivot of axis y (rotation about y is free, so M = 0):</p><div class="tzs">${T("pivot","E",[["Ex","L"],["Ey","0"],["Ez","N"]],false)}</div>
<div class="key warn"><p>This rule is for <b>joints only</b>. A known force (user, weight, load) is projected on the axes from the figure with cos and sin.</p></div></section>
<section><h2>3 · Projecting a force</h2>
<p>The <b>cos goes on the axis next to the angle</b>, the sin on the opposite one. sin 30° = 0.5, cos 30° = √3/2 ≈ 0.866.</p>
<p>Check: F<sub>y</sub>² + F<sub>z</sub>² = F².</p></section>
<section><h2>4 · Moving a moment: the BABAR formula</h2>
<p class="formula">M<sub>B</sub> = M<sub>A</sub> + BA ∧ R</p>
<ul><li>BA goes <b>from the new point to the old point</b>.</li><li>Find BA by walking from B to A along the axes. Any path gives the same vector.</li></ul>
<h3>Cross product</h3>
<p>${V(["a","b","c"],"∧",["d","e","f"],"=",["b·f − c·e","c·d − a·f","a·e − b·d"])}</p>
<p>Cover a line, cross-multiply the two others. Physically:</p>
<ul><li><b>size</b> = r · F · sin θ: only the part of the force perpendicular to the lever arm makes things turn;</li>
<li><b>direction</b> = the rotation axis (right-hand rule).</li></ul>
<p class="muted">A distance parallel to the force gives no moment. For a vertical force, the height of the point does not matter.</p></section>
<section><h2>5 · PFS (principe fondamental de la statique)</h2>
<p>Isolated system in equilibrium ⇒ sum of external torseurs <b>written at the same point</b> = 0 ⇒ 6 equations (3 forces, 3 moments).</p>
<ol><li>Isolate the system.</li><li>List the external actions and write their torseurs.</li><li>Move every moment to the same point (BABAR).</li><li>Write the 6 equations and solve.</li></ol></section>`});

page("poignee.html",{title:"Poignée de porte",eyebrow:"Statique · Corrigé",
  lede:"A user pushes on the handle at A with ‖F‖ = 30 N. The handle turns on the door through a pivot of axis y centred at E (middle of CD). Goal: the mechanical action at E.",
  prev:["torseurs.html","Torseurs : l'essentiel"],next:["pedale.html","Pédale de commande"],
  body:`${sheets([["clanta.jpeg","Feuille 1 : données et Q1"],["clanta2.jpeg","Feuille 2 : Q2 à Q4"]])}
<section><h2>Data</h2><p>Axes: z up, y along the shaft (from D toward C), x along the lever arm (toward A).</p>
<p>Dimensions read from the figure: elbow → A = 111.75 mm along x, elbow → C = 37.75 mm along y, CD = 41.90 mm ⇒ CE = 20.95 mm.</p></section>
<section><h2>Q1 · Isolate the handle, list the external actions</h2>
<p>Two actions (weight neglected): user → handle at A, and door → handle at E (pivot of axis y).</p>
<p>F makes 30° with the vertical (α = 30°):</p>
<ul><li>F<sub>y</sub> = F·sin 30° = +15 N</li><li>F<sub>z</sub> = −F·cos 30° ≈ −25.98 N (downward)</li><li>F<sub>x</sub> = 0 (F lies in the (y, z) plane)</li></ul>
<div class="tzs">${T("ut→poignée","A",[["0","0"],["15","0"],["−25.98","0"]])}${T("porte→poignée","E",[["Ex","L"],["Ey","0"],["Ez","N"]],false)}</div>
<p>The user's moment is zero because F is applied at A. The pivot has M = 0 because rotation about y is free. That leaves 5 unknowns: Ex, Ey, Ez, L, N.</p></section>
<section><h2>Q2 · All moments at E</h2>
<p class="formula">M<sub>E</sub> = M<sub>A</sub> + EA ∧ F, with M<sub>A</sub> = 0</p>
<p>EA, walking E → C → elbow → A: x = 0.11175 m, y = 0.02095 + 0.03775 = 0.0587 m, z = 0.</p>
<p>${V(["0.11175","0.0587","0"],"∧",["0","15","−25.98"],"=",["−1.525","+2.903","+1.676"])}</p>
${table(["Component","Meaning"],[["M<sub>y</sub> = +2.903 N·m","turns the handle about the shaft"],["M<sub>x</sub> = −1.525 N·m","tilts the shaft in the door"],["M<sub>z</sub> = +1.676 N·m","swings the shaft left/right"]])}
<div class="tzs">${T("ut→poignée","E",[["0","−1.525"],["15","+2.903"],["−25.98","+1.676"]])}</div></section>
<section><h2>Q3 · PFS</h2>
<p>{τ<sub>ut→poignée</sub>}<sub>E</sub> + {τ<sub>porte→poignée</sub>}<sub>E</sub> = {0}</p>
${table(["","Equation","Result"],[["Force x","0 + Ex = 0","Ex = 0"],["Force y","F sin α + Ey = 0","Ey = −15 N"],["Force z","−F cos α + Ez = 0","Ez = +25.98 N"],["Moment x","−0.0587 F cos α + L = 0","L = +1.525 N·m"],["Moment y","0.11175 F cos α + 0 = 0","<b>impossible</b>"],["Moment z","0.11175 F sin α + N = 0","N = −1.676 N·m"]])}
<div class="key warn"><p>The y equation (2.903 = 0) is impossible. The perfect pivot transmits no moment about y, so the handle is <b>not</b> in equilibrium: it turns. In a real lock a return spring provides about −2.9 N·m.</p></div></section>
<section><h2>Q4 · Final torseurs</h2>
<div class="tzs">${T("ut→poignée","E",[["0","−1.525"],["15","+2.903"],["−25.98","+1.676"]])}${T("porte→poignée","E",[["0","1.525"],["−15","0"],["25.98","−1.676"]])}</div></section>
<section><h2>Common mistakes</h2><ul>
<li>Pivot torseur: M must be <b>0</b>, not L, M, N.</li>
<li>F = (0 ; F sin α ; <b>−F cos α</b>): the z component is negative.</li>
<li>EA on y is 58.7 mm (37.75 + 20.95), not 68.7.</li>
<li>Stay in metres so moments come out in N·m: 0.11175 × 25.98 = 2.903.</li>
<li>Q3, moment on x: L <b>−</b> 0.0587 F cos α = 0; on y: <b>0</b> + 0.11175 F cos α = 0.</li></ul></section>`});

page("pedale.html",{title:"Pédale de commande",eyebrow:"Statique · Corrigé",
  lede:"Pedal 2 turns on frame 1 through a pivot of axis x at A. The foot pushes down at B with F (unknown). Rod 3 pulls down at E with T = 10 daN = 100 N. Goal: F and the action of the pivot at A.",
  prev:["poignee.html","Poignée de porte"],next:["suspension.html","Suspension automobile"],
  body:`${sheets([["pedale.jpeg","Feuille DR1"],["pedale2.jpeg","Feuille DR2"]])}
<section><div class="key"><p>It is a see-saw: the foot pushes down on one side of the axis to lift the rod on the other side.</p></div></section>
<section><h2>Geometry</h2><p>Axes: z up, y horizontal toward C, x along the pivot axis.</p><ul>
<li>A → O: 100 mm along x.</li><li>O → B: 200 mm along −y (B on the left).</li>
<li>Arm OD = 120 mm, tilted 30° from the horizontal. Triangle O–H–D: OH = 0.12·cos 30 ≈ 0.104 m, HD = 0.12·sin 30 = 0.06 m.</li>
<li>D → C: 60 mm along x (pin). C is at the same height as D.</li>
<li>C → E: down the rod. Its length is not given and not needed, because it is parallel to T.</li></ul>
<p class="muted">Don't measure angles on a perspective drawing. Trust the written values.</p></section>
<section><h2>1–2 · Isolate 2+3, list the external actions</h2>
<div class="tzs">${T("ch→3","E",[["0","0"],["0","0"],["−T","0"]],false)}${T("ut→2","B",[["0","0"],["0","0"],["−F","0"]],false)}${T("1→2","A",[["Ax","0"],["Ay","M"],["Az","N"]],false)}</div>
<p>Pivot of axis x ⇒ L = 0.</p></section>
<section><h2>3 · All moments at A</h2>
<h3>Load</h3><p>M<sub>A</sub>(ch→3) = M<sub>E</sub> + AE ∧ T, with M<sub>E</sub> = 0.</p>
${table(["Step","Along","Distance"],[["A → O","x","+0.1"],["O → H","y","+0.12·cos 30"],["H → D","z","+0.12·sin 30"],["D → C","x","+0.06"],["C → E","z","−rod (irrelevant)"]])}
<p>${V(["0.16","0.12·cos30","(any)"],"∧",["0","0","−T"],"=",["−0.12·cos30·T","+0.16·T","0"],"=",["−10.4 N·m","+16 N·m","0"])}</p>
<h3>Foot</h3><p>M<sub>A</sub>(ut→2) = M<sub>B</sub> + AB ∧ F, with M<sub>B</sub> = 0 and AB = (0.1 ; −0.2 ; 0).</p>
<p>${V(["0.1","−0.2","0"],"∧",["0","0","−F"],"=",["+0.2 F","+0.1 F","0"])}</p>
<div class="tzs">${T("ch→3","A",[["0","−0.104 T"],["0","+0.16 T"],["−T","0"]],false)}${T("ut→2","A",[["0","0.2 F"],["0","0.1 F"],["−F","0"]],false)}${T("1→2","A",[["Ax","0"],["Ay","M"],["Az","N"]],false)}</div></section>
<section><h2>4 · PFS at A</h2>
${table(["","Equation","Result"],[["Force x","Ax = 0","Ax = 0"],["Force y","Ay = 0","Ay = 0"],["Force z","−T − F + Az = 0","Az = T + F ≈ 152 N"],["Moment x","−0.104 T + 0.2 F + 0 = 0","<b>F ≈ 52 N</b>"],["Moment y","0.16 T + 0.1 F + M = 0","M ≈ −21.2 N·m"],["Moment z","N = 0","N = 0"]])}
<div class="key"><p>The moment about x, the pivot's free axis, is the see-saw: <b>F × 0.2 = T × 0.104 ⇒ F ≈ 52 N</b>.</p></div>
<div class="tzs">${T("ut→2","B",[["0","0"],["0","0"],["−52","0"]])}${T("1→2","A",[["0","0"],["0","−21.2"],["152","0"]])}</div></section>`});

// liaison symbols (side views, A red = one body, B blue = the other)
const S = (inner) => `<svg viewBox="0 0 160 90" role="img">${inner}</svg>`;
const A = 'stroke="var(--cA)" stroke-width="3" fill="none"', B = 'stroke="var(--cB)" stroke-width="3" fill="none"';
const SYM = [
  ["Pivot", S(`<path d="M10 45 H150 M44 30 V60 M116 30 V60" ${B}/><rect x="52" y="30" width="56" height="30" ${A} fill="var(--sheet)"/>`)],
  ["Pivot glissant", S(`<path d="M10 45 H150" ${B}/><rect x="52" y="30" width="56" height="30" ${A}/>`)],
  ["Glissière", S(`<rect x="10" y="38" width="140" height="14" ${B}/><rect x="52" y="26" width="56" height="38" ${A}/>`)],
  ["Hélicoïdale", S(`<path d="M10 45 H150" ${B}/><rect x="48" y="26" width="64" height="38" ${A}/><path d="M56 37 l8 16 l8 -16 l8 16 l8 -16 l8 16 l8 -16" ${B}/>`)],
  ["Rotule", S(`<path d="M80 45 L150 45" ${B}/><circle cx="80" cy="45" r="16" ${B}/><path d="M68 20 A28 28 0 0 0 68 70 M68 45 H10" ${A}/>`)],
  ["Appui plan", S(`<path d="M20 52 H140 M80 52 V84" ${A}/><path d="M20 40 H140 M80 40 V8" ${B}/>`)],
  ["Linéaire annulaire", S(`<path d="M10 45 H64 M96 45 H150" ${B}/><circle cx="80" cy="45" r="14" ${B}/><rect x="52" y="28" width="56" height="34" ${A}/>`)],
  ["Ponctuelle", S(`<path d="M20 60 H140 M80 60 V86" ${A}/><circle cx="80" cy="46" r="12" ${B}/><path d="M80 34 V6" ${B}/>`)],
];
page("liaisons.html",{title:"Liaisons : la méthode",eyebrow:"Modélisation · Fiche",
  lede:"From a technical drawing to a kinematic diagram in four steps: classes, joints, graph, schema.",
  prev:["robot.html","Robot 6 axes"],next:["casse_ecrou.html","Casse-écrou"],
  body:`<section><h2>1 · Classes d'équivalence</h2>
<p>An equivalence class is <b>a group of parts that never move relative to each other</b>: screwed, pinned, welded or pressed together. You treat each class as one solid.</p>
<p><b>How to find them:</b> make the mechanism work and ask, for each pair of parts, “can one move relative to the other?” If not, same class.</p>
<div class="key warn"><p>Classic traps: screws, pins, keys and bushings go with the part they are <b>fixed to</b>, not with the part they touch. A lever that slides in its hole is its own class.</p></div></section>
<section><h2>2 · Types de liaisons</h2>
<p>A joint describes <b>which of the 6 movements</b> (3 translations Tx, Ty, Tz and 3 rotations Rx, Ry, Rz) remain possible between two classes.</p>
${table(["Liaison","Allowed movements","DOF","Example"],[
 ["Encastrement","none","0","welded parts"],["<b>Pivot</b>","1 rotation","1","door hinge"],["<b>Glissière</b>","1 translation","1","drawer"],
 ["<b>Hélicoïdale</b>","rotation + translation linked by the pitch","1","screw in a nut"],["Pivot glissant","1 rotation + 1 translation, same axis","2","shaft in a plain bore"],
 ["Rotule","3 rotations","3","joystick"],["Appui plan","2 translations + 1 rotation","3","box on a table"],["Linéaire annulaire","3 rotations + 1 translation","4","ball in a tube"],
 ["Linéaire rectiligne","2 rotations + 2 translations","4","cylinder on a plane, gear teeth"],["Ponctuelle","3 rotations + 2 translations","5","ball on a plane"]])}
<p class="muted">In statics, each allowed movement gives a 0 in the joint's torseur and each blocked one gives an unknown (see <a href="torseurs.html">Torseurs</a>).</p></section>
<section><h2>3 · Graphe des liaisons</h2>
<p>One circle per class, one line per pair of classes in contact, with the joint's name and axis written on the line. Look at its shape: a closed loop means the classes constrain each other; an open branch is a part that only hangs off one class, like a lever.</p></section>
<section><h2>4 · Schéma cinématique minimal</h2>
<p>The simplest drawing of the mechanism: each class is a line in its own colour, each joint is its standard symbol, placed where it really is. “Minimal” means one joint per pair of classes in contact.</p>
<div class="sym">${SYM.map(([n,s])=>`<figure>${s}<figcaption>${n}</figcaption></figure>`).join("")}</div>
<p class="muted" style="margin-top:12px">The fixed frame (bâti) is drawn with a hatched ground line. A small triangle under a joint means that joint is held by the frame. Two bars on a shaft either side of a rectangle mean it cannot slide (pivot); without the bars it can (pivot glissant).</p></section>`});

// interactive pages: add doctype + a back link
function inter(dir, f, next){
  let src = fs.readFileSync(path.join(ROOT,dir,f),"utf8");
  const nav = `<nav style="max-width:1040px;margin:0 auto 14px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font:600 .85rem 'Barlow Semi Condensed',system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase">
<a href="home.html" style="color:var(--accent);text-decoration:none">← ${SITE}</a>${next?`<a href="${next[0]}" style="color:var(--accent);text-decoration:none">${next[1]} →</a>`:""}</nav>`;
  src = src.replace('<div class="wrap">', nav + '\n<div class="wrap">');
  fs.writeFileSync(path.join(OUT,f), `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head><body>\n${src}\n</body></html>`);
}
inter("SI_torseurs", "suspension.html", ["robot.html","Robot 6 axes"]);
inter("SI_torseurs", "robot.html", ["liaisons.html","Liaisons : la méthode"]);
const INTER = EX.slice(6);
INTER.forEach(([f],i)=>inter("SI_liaisons", f, INTER[i+1]));
console.log(fs.readdirSync(OUT).join("\n"));
