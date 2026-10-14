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

for (const f of ["clanta.jpeg","clanta2.jpeg","pedale.jpeg","pedale2.jpeg","suspension.jpeg","robot.jpeg","console.jpeg","clim.jpeg","remonte_pente.jpeg","broyeur_1.jpeg","broyeur_2.jpeg"]) fs.copyFileSync(path.join(ROOT,"SI_torseurs/docs",f), path.join(OUT,"img",f));
fs.copyFileSync(path.join(HERE,"site.css"), path.join(OUT,"site.css"));

// ---------- pages ----------
const EX = [
  ["torseurs.html","Torseurs : l'essentiel","The five ideas you need for every statics exercise.","read","Fiche"],
  ["methode.html","Méthode : résoudre un exercice de statique","The 10-step method as a one-page cheat sheet, with the air-vent damper as a running example, a joint table and the usual traps.","read","Fiche"],
  ["poignee.html","Poignée de porte","Pivot of axis y, moving a moment with BABAR, and a PFS that has no solution.","sol","Corrigé"],
  ["pedale.html","Pédale de commande","A see-saw in 3D: find the foot force F and the action of the pivot.","sol","Corrigé"],
  ["suspension.html","Suspension automobile","Two-force members, a PFS on {4+6} then on arm 2: does the car sag less than 12 cm? Animated on the mechanism.","play","Interactif"],
  ["robot.html","Robot 6 axes","A PFS in 3D: the gripper, then the column on its base. Graph of joints, isolated systems and a 270 N·m tipping moment.","play","Interactif"],
  ["pedale_frein.html","Pédale de frein","Practice exercise like the suspension: two levers, a rod, a push-rod and a master-cylinder pressure to check. Hints and hidden corrections.","play","Entraînement"],
  ["console_bateau.html","Console portante de bateau","3D: ball joint and linear annular joint, the boat's weight, then the one moment equation that gives the cylinder force and its pressure.","play","Interactif"],
  ["portail.html","Portail battant motorisé","Practice exercise like the boat crane: ball joint, linear annular joint, the gate's weight, wind and a cylinder. Hints and hidden corrections.","play","Entraînement"],
  ["clim.html","Bouche de climatisation","3D: a damper on a ball joint and a linear annular joint of axis y, a two-force cylinder along x2, and one moment equation for the pressure.","play","Interactif"],
  ["remonte_pente.html","Remonte-pente","Plane statics with pulleys and cables, two-force bars (glisseurs), and which bar is in tension or compression. Following the teacher's correction.","play","Interactif"],
  ["broyeur.html","Broyeur","3D mechanism: graph, geometral figures, loop closure, the four joint torseurs, then from the mortar back to the motor to check the 5 N crushing force. Animated flywheel.","play","Interactif"],
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
  body:`<section><div class="sec-head"><h2>Statique : torseurs</h2><span class="muted">Actions mécaniques, déplacement de moments, PFS</span></div><div class="toc">${rows(EX.slice(0,12),1)}</div></section>
<section><div class="sec-head"><h2>Modélisation : liaisons mécaniques</h2><span class="muted">Classes d'équivalence, graphe, schéma cinématique</span></div><div class="toc">${rows(EX.slice(12),13)}</div></section>
${CHIM.home}
<section class="key"><p><b>How to use the interactive exercises.</b> Colour the parts into classes, move the slider to watch the mechanism, press <i>Vérifier</i>. The full answers sit at the bottom of each page, folded. Try first, then open them. In the chemistry trainers, every question has a hint and a step-by-step solution.</p></section>`});

page("torseurs.html",{title:"Torseurs : l'essentiel",eyebrow:"Statique · Fiche",
  lede:"A torseur describes a mechanical action: what it pushes (force) and what it turns (moment), written at one point.",next:["methode.html","Méthode"],
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


// ---------- cheat sheet: the method, with the air-vent damper as a running example ----------
const tz=(name,pt,f,m)=>T(name,pt,f.map((v,i)=>[v,m[i]]),false);
const Z3=["0","0","0"];
const MS=(n,title,rule,ex)=>`<section class="mstep"><h2><span class="mn">${n}</span>${title}</h2><div class="mgrid"><div class="rule">${rule}</div><div class="ex"><p class="exh">Exemple · bouche de climatisation</p>${ex}</div></div></section>`;
page("methode.html",{title:"Méthode : résoudre un exercice de statique",eyebrow:"Statique · Fiche méthode",
  lede:"Les 10 étapes, toujours dans le même ordre. À droite de chaque étape, le même exemple fil rouge : la bouche de climatisation (TD 22), où l'on cherche la pression p dans le vérin et où l'on vérifie p < 2 bar.",
  prev:["torseurs.html","Torseurs : l'essentiel"],next:["poignee.html","Poignée de porte"],
  body:`<section class="key"><p><b>En une phrase :</b> on isole un système, on écrit toutes les actions extérieures sous forme de torseurs <b>dans la même base</b>, on les ramène <b>au même point</b> avec BABAR, on écrit que leur somme est nulle (PFS), et on ne garde que les équations qui contiennent ce qu'on cherche.</p>
<p class="muted" style="margin-top:8px">Exemple fil rouge : le clapet 1 tient au mur par une rotule en A et une linéaire annulaire d'axe (O, y). L'air le pousse en M ; un vérin {2+3}, entre B (sur le clapet) et D (sur le mur), le retient. <a href="clim.html">Voir l'exercice complet.</a></p></section>
${MS(1,"Lire l'énoncé",`<ul><li><b>Ce qu'on cherche</b> : une force, une relation entrée-sortie, une exigence du cahier des charges.</li><li><b>Les bases et les angles</b> : depuis quel axe chaque angle est mesuré.</li><li><b>Les coordonnées des points</b> : repérer les <b>0</b>, ils simplifient tout.</li><li><b>Les hypothèses</b> : plan ou 3D, poids négligé ou non, liaisons parfaites.</li></ul>`,
 `<ul><li>On cherche <b>p</b>, et l'exigence est <b>p &lt; 2 bar</b>.</li><li>M (0 ; a ; −l), B (0 ; 2a+c ; d), D (−e ; 2a+c ; 0) : x<sub>M</sub> = x<sub>B</sub> = 0, et B, D ont le même y.</li><li>Problème en 3D, liaisons parfaites, poids du vérin négligé.</li></ul>`)}
${MS(2,"Graphe des liaisons",`<p>Un rond par pièce, un trait par liaison, avec son <b>type</b> et son <b>axe</b>. C'est la carte de « qui touche qui ».</p>`,
 `<p class="mono">0 —rotule A— 1<br>0 —linéaire annulaire (O, y)— 1<br>1 —rotule B— 2 —(intérieur du vérin)— 3 —rotule D— 0</p>`)}
${MS(3,"Choisir la stratégie",`<ul><li>Chercher les <b>pièces à deux actions</b> (deux liaisons, rien d'autre) : bielles, vérins, ressorts, barres. Leur force est portée par la droite qui joint les deux liaisons : une direction gratuite. On les isole <b>en premier</b>.</li><li>Trouver la pièce qui reçoit <b>l'entrée et la sortie</b> : c'est elle qu'on isole à la fin.</li></ul>`,
 `<ul><li>{2+3} n'a que deux rotules, en B et en D : la force du vérin est le long de <b>BD</b> (Q3).</li><li>Le clapet 1 reçoit l'air <b>et</b> le vérin : on l'isole pour relier p et F<sub>air</sub> (Q4).</li></ul>`)}
${MS(4,"Isoler et faire le B.A.M.E.",`<p>Entourer le système sur le graphe. Les actions extérieures sont :</p><ul><li>chaque <b>trait qui traverse la frontière</b> ;</li><li>les <b>charges</b> données (pression, vent, poussée…) ;</li><li>le <b>poids</b>, s'il n'est pas négligé.</li></ul><p>Les liaisons à l'intérieur ne s'écrivent pas.</p>`,
 `<p>On isole le clapet 1 :</p><ul><li>vérin en B ;</li><li>rotule en A ;</li><li>linéaire annulaire en O ;</li><li>air en M ;</li><li>poids en G.</li></ul>`)}
${MS(5,"Écrire chaque torseur à son point, dans la base 0",`<ul><li><b>Liaison</b> : mouvement libre ⇒ 0, mouvement bloqué ⇒ inconnue (tableau plus bas). Le moment est écrit au centre de la liaison.</li><li><b>Force connue penchée</b> : cos sur l'axe <b>depuis lequel on mesure l'angle</b>, sin sur l'autre, puis les signes.</li><li><b>Câble</b> : il tire toujours, le long du câble, en s'éloignant du système.</li><li><b>Résultat d'une question précédente</b> : changer le signe si on regarde l'autre pièce (action réciproque).</li></ul>`,
 `<div class="tzs">${tz("F<sub>0→1</sub>","A",["A<sub>x</sub>","A<sub>y</sub>","A<sub>z</sub>"],Z3)}${tz("F<sub>0→1</sub>","O",["O<sub>x</sub>","0","O<sub>z</sub>"],Z3)}</div>
 <p>Vérin : tan α = d / e, donc F<sub>2→1</sub> = p·S·x<sub>2</sub> = (p·S·cos α ; 0 ; p·S·sin α).</p>
 <div class="tzs">${tz("F<sub>2→1</sub>","B",["p·S·cos α","0","p·S·sin α"],Z3)}${tz("F<sub>air→1</sub>","M",["F<sub>air</sub>","0","0"],Z3)}</div>`)}
${MS(6,"Choisir le point et l'équation",`<ul><li><b>Le point</b> : là où il y a le plus d'inconnues (une liaison), pour que leurs moments disparaissent.</li><li><b>L'équation</b> : celle qui ne contient que ce qu'on cherche. Très souvent : le <b>moment autour de l'axe de rotation</b>, écrit en un point de cet axe.</li></ul>`,
 `<p>Le clapet tourne autour de (O, y) : on écrit le <b>moment en O, projeté sur y</b>.</p><ul><li>O : aucun moment en son centre.</li><li>A : sur l'axe y, donc rien autour de y.</li><li>Poids : vertical, et G sous l'axe, donc rien autour de y.</li></ul>`)}
${MS(7,"BABAR",`<p class="formula">M<sub>nouveau</sub> = M<sub>ancien</sub> + (nouveau → ancien) ∧ R</p><ul><li>Le vecteur va <b>du nouveau point vers l'ancien</b> : arrivée − départ.</li><li>Le vecteur et la force doivent être <b>dans la même base</b> : projeter d'abord, BABAR ensuite.</li><li>Une force a un moment nul à son propre point.</li></ul>${V(["a","b","c"],"∧",["d","e","f"],"=",["b·f − c·e","c·d − a·f","a·e − b·d"])}`,
 `<p>Air : OM = (0 ; a ; −l)</p><p>${V(["0","a","−l"],"∧",["F<sub>air</sub>","0","0"],"=",["0","−l·F<sub>air</sub>","−a·F<sub>air</sub>"])}</p>
 <p>Vérin : OB = (0 ; 2a+c ; d)</p><p>${V(["0","2a+c","d"],"∧",["p·S·cos α","0","p·S·sin α"],"=",["…","d·p·S·cos α","…"])}</p>`)}
${MS(8,"PFS : additionner ligne par ligne",`<p>Lignes de forces : somme des forces = 0. Lignes de moments : somme des moments = 0. Écrire <b>tous</b> les termes, zéros compris, puis justifier chaque terme qui disparaît.</p>`,
 `<p class="formula">−l·F<sub>air</sub> + d·p·S·cos α = 0</p><p class="muted">Les termes de A, O et du poids valent 0 sur y (étape 6).</p>`)}
${MS(9,"Résoudre",`<ul><li>Compter les inconnues et les équations.</li><li>Commencer par l'équation qui n'a <b>qu'une</b> inconnue, puis la remplacer dans les autres.</li><li>« (1) + (3) » veut dire « en utilisant (1) et (3) ».</li></ul>`,
 `<p class="formula">p = l·F<sub>air</sub> / (S·d·cos α)</p>`)}
${MS(10,"Conclure",`<ul><li><b>Unités SI</b> : cm → m ; mm² → m² (× 10⁻⁶) ; Pa → bar (÷ 10⁵).</li><li><b>Signes</b> : négatif = sens opposé à l'axe ; barre avec R &lt; 0 = tendue.</li><li><b>Comparer</b> à l'exigence et écrire une phrase claire.</li></ul>`,
 `<p>cos α = 30 / √(30² + 20²) ≈ 0,832 ; S = 20 cm² = 20 × 10⁻⁴ m²</p><p>p = 40 × 150 / (20 × 10⁻⁴ × 20 × 0,832) ≈ 180 300 Pa ≈ <b>1,8 bar</b></p><p><b>1,8 bar &lt; 2 bar : exigence satisfaite</b>, avec 0,2 bar de marge.</p>`)}
<section><h2>Torseurs des liaisons usuelles</h2><p class="muted">Écrits au centre de la liaison. Règle : mouvement libre ⇒ 0, mouvement bloqué ⇒ inconnue. L'axe de la liaison est pris selon x (adapter à l'axe réel).</p>
<div class="tzs">${tz("pivot (x)","A",["X","Y","Z"],["0","M","N"])}${tz("pivot glissant (x)","A",["0","Y","Z"],["0","M","N"])}${tz("glissière (x)","A",["0","Y","Z"],["L","M","N"])}</div>
<div class="tzs">${tz("rotule","A",["X","Y","Z"],Z3)}${tz("linéaire annulaire (x)","A",["0","Y","Z"],Z3)}${tz("encastrement","A",["X","Y","Z"],["L","M","N"])}</div>
<div class="tzs">${tz("appui plan (normale z)","A",["0","0","Z"],["L","M","0"])}${tz("ponctuelle (normale z)","A",["0","0","Z"],Z3)}${tz("pivot (z), problème plan","A",["X","Y","0"],Z3)}</div></section>
<section><h2>Pièges fréquents</h2>${table(["Piège","Exemple vu en TD"],[
 ["Une même lettre pour deux choses différentes","<b>L</b> point et longueur (remonte-pente) ; <b>D<sub>x</sub></b> de Q2 et de Q4 (pédale de frein)"],
 ["Oublier de changer le signe en changeant de pièce","D<sub>y</sub> et G<sub>y</sub> (pédale de frein)"],
 ["Une liaison qui glisse le long d'un axe n'a pas de force sur cet axe","pas de B<sub>z</sub> (console), pas de O<sub>y</sub> (bouche de clim)"],
 ["Un brin de câble est tangent : son bras de levier est le rayon","T × r, T′ × 2r (remonte-pente)"],
 ["Une force qui coupe l'axe de rotation n'a pas de moment autour de lui","le poids et les liaisons (bouche de clim)"],
 ["Parenthèses à la calculatrice","2250 / (π × 0,01²), pas 2250 / π × 0,01²"],
 ["Supposer égales deux inconnues avant de l'avoir montré","T et T′ (remonte-pente)"],
 ["Mélanger les bases dans BABAR","projeter dans la base 0 avant le produit vectoriel"]])}</section>
<section class="key warn"><p><b>Si le mécanisme bouge (cinématique) :</b> avant la statique, écrire la <b>fermeture géométrique</b> autour de la boucle du graphe (AB + BC + … = 0), la projeter sur les axes, et en tirer les positions (h, λ, angles). Voir le <a href="broyeur.html">broyeur</a>.</p></section>`});

page("poignee.html",{title:"Poignée de porte",eyebrow:"Statique · Corrigé",
  lede:"A user pushes on the handle at A with ‖F‖ = 30 N. The handle turns on the door through a pivot of axis y centred at E (middle of CD). Goal: the mechanical action at E.",
  prev:["methode.html","Méthode"],next:["pedale.html","Pédale de commande"],
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
  prev:["broyeur.html","Broyeur"],next:["casse_ecrou.html","Casse-écrou"],
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
inter("SI_torseurs", "robot.html", ["pedale_frein.html","Pédale de frein"]);
inter("SI_torseurs", "pedale_frein.html", ["console_bateau.html","Console portante de bateau"]);
inter("SI_torseurs", "console_bateau.html", ["portail.html","Portail battant motorisé"]);
inter("SI_torseurs", "portail.html", ["clim.html","Bouche de climatisation"]);
inter("SI_torseurs", "clim.html", ["remonte_pente.html","Remonte-pente"]);
inter("SI_torseurs", "remonte_pente.html", ["broyeur.html","Broyeur"]);
inter("SI_torseurs", "broyeur.html", ["liaisons.html","Liaisons : la méthode"]);
const INTER = EX.slice(13);
INTER.forEach(([f],i)=>inter("SI_liaisons", f, INTER[i+1]));
console.log(fs.readdirSync(OUT).join("\n"));
