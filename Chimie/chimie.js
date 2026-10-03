// Shared chemistry core: constants, species table, number formatting/parsing, the conversion map, calibration chart.
// Loaded by the interactive pages in the browser and imported by website/build.mjs (Node) for the static pages.
(function (g) {
"use strict";
const NA = 6.02e23, VM = 24.0;
const AT = {H:1.0, C:12.0, N:14.0, O:16.0, Na:23.0, Cl:35.5, S:32.0, K:39.1, Mn:54.9, Cu:63.5, Ca:40.1, Hg:200.6};
const CH = {NA, VM, AT, dec: "."};

// ---------- species ----------
const subs = s => s.replace(/(\d+)/g, "<sub>$1</sub>");
const mk = (id, name, form, comp, state, rho, solute) => {
  const M = Math.round(Object.entries(comp).reduce((s, [a, n]) => s + AT[a] * n, 0) * 10) / 10;
  return {id, name, form, html: subs(form), comp, state, M, solute: !!solute,
          rho: state === "g" ? M / VM : rho,                       // g/L ; for a gas rho = M / Vm
          atoms: Object.values(comp).reduce((a, b) => a + b, 0)};
};
CH.species = [
  mk("H2O", "eau", "H2O", {H:2, O:1}, "l", 1000),
  mk("C2H6O", "éthanol", "C2H6O", {C:2, H:6, O:1}, "l", 789, true),
  mk("Hg", "mercure", "Hg", {Hg:1}, "l", 13534),
  mk("C6H12O6", "glucose", "C6H12O6", {C:6, H:12, O:6}, "s", 1540, true),
  mk("C12H22O11", "saccharose", "C12H22O11", {C:12, H:22, O:11}, "s", 1590, true),
  mk("NaCl", "chlorure de sodium", "NaCl", {Na:1, Cl:1}, "s", 2160, true),
  mk("KMnO4", "permanganate de potassium", "KMnO4", {K:1, Mn:1, O:4}, "s", 2700, true),
  mk("CuSO4", "sulfate de cuivre(II)", "CuSO4", {Cu:1, S:1, O:4}, "s", 3600, true),
  mk("Cu", "cuivre", "Cu", {Cu:1}, "s", 8960),
  mk("O2", "dioxygène", "O2", {O:2}, "g"),
  mk("N2", "diazote", "N2", {N:2}, "g"),
  mk("CO2", "dioxyde de carbone", "CO2", {C:1, O:2}, "g"),
  mk("H2", "dihydrogène", "H2", {H:2}, "g"),
  mk("CH4", "méthane", "CH4", {C:1, H:4}, "g"),
];
CH.sp = Object.fromEntries(CH.species.map(s => [s.id, s]));

// ---------- numbers ----------
const SUP = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
const UNSUP = Object.fromEntries(Object.entries(SUP).map(([a, b]) => [b, a]));
const dp = s => CH.dec === "." ? s : s.replace(".", CH.dec);
CH.sci = (x, sig = 3) => {
  if (x === 0) return "0";
  let e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e), s = m.toFixed(sig - 1);
  if (Math.abs(parseFloat(s)) >= 10) { e++; s = (m / 10).toFixed(sig - 1); }
  return dp(s) + "×10" + String(e).split("").map(c => SUP[c]).join("");
};
CH.fmt = (x, sig = 3) => {
  if (!isFinite(x)) return "—";
  if (x === 0) return "0";
  const a = Math.abs(x);
  if (a >= 1e5 || a < 1e-3) return CH.sci(x, sig);
  const r = Number(x.toPrecision(sig)), e = Math.floor(Math.log10(Math.abs(r)));
  return dp(r.toFixed(Math.max(0, sig - 1 - e)));
};
CH.parse = s => {
  if (s == null) return NaN;
  s = String(s).trim().toLowerCase().replace(/\s+/g, "").replace(/[−–]/g, "-").replace(/,/g, ".");
  s = s.replace(/[×x*·]10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/, (m, sp) => "e" + [...sp].map(c => UNSUP[c]).join(""));
  s = s.replace(/[×x*·]10\^?\(?([+-]?[0-9]+)\)?/, "e$1");
  return /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/.test(s) ? parseFloat(s) : NaN;
};
CH.close = (user, ans, tol = 0.02) => isFinite(user) && Math.abs(user - ans) <= tol * Math.abs(ans);

// ---------- SVG helpers ----------
const ns = "http://www.w3.org/2000/svg";
CH.sym = (base, sub) => sub ? `${base}<tspan dy="4" font-size="70%">${sub}</tspan><tspan dy="-4"> </tspan>` : base;

// ---------- the conversion map ----------
const COLX = [10, 210, 410, 610], ROWY = [8, 122, 236], NW = 130, NH = 76;
const NODES = {
  Vesp: {sym: ["V", "esp"], name: "volume de l'espèce", unit: "L", c: 0, r: 1},
  m:    {sym: ["m", ""],    name: "masse",              unit: "g", c: 1, r: 1},
  n:    {sym: ["n", ""],    name: "quantité de matière", unit: "mol", c: 2, r: 1, hub: true},
  N:    {sym: ["N", ""],    name: "nombre d'entités",   unit: "", c: 3, r: 1},
  Vgaz: {sym: ["V", "gaz"], name: "volume du gaz",      unit: "L", c: 2, r: 0},
  Vsol: {sym: ["V", "sol"], name: "volume de la solution", unit: "L", c: 0, r: 2, param: true},
  Cm:   {sym: ["C", "m"],   name: "conc. massique", unit: "g/L", c: 1, r: 2},
  C:    {sym: ["C", ""],    name: "conc. molaire",  unit: "mol/L", c: 2, r: 2},
};
CH.NODES = NODES;
const EDGES = [
  {id: "Vesp-m", a: "Vesp", b: "m", lab: ["ρ", ""]},
  {id: "m-n", a: "m", b: "n", lab: ["M", ""]},
  {id: "n-N", a: "n", b: "N", lab: ["N", "A"]},
  {id: "n-Vgaz", a: "n", b: "Vgaz", lab: ["V", "m"]},
  {id: "m-Cm", a: "m", b: "Cm", lab: ["÷ V", "sol"]},
  {id: "n-C", a: "n", b: "C", lab: ["÷ V", "sol"]},
  {id: "Cm-C", a: "Cm", b: "C", lab: ["M", ""]},
];
CH.EDGES = EDGES;
const box = k => ({x: COLX[NODES[k].c], y: ROWY[NODES[k].r]});
CH.mapSVG = (opts = {}) => {
  const out = [`<svg class="cmap" viewBox="0 0 760 330" role="img" aria-label="Carte des formules : la quantité de matière n au centre, reliée à m, N, V du gaz et C">`];
  for (const e of EDGES) {
    const A = box(e.a), B = box(e.b);
    let x1, y1, x2, y2, lx, ly, anchor;
    if (A.y === B.y) {               // horizontal
      const [L, R] = A.x < B.x ? [A, B] : [B, A];
      x1 = L.x + NW + 5; x2 = R.x - 5; y1 = y2 = A.y + NH / 2; lx = (x1 + x2) / 2; ly = y1 - 8; anchor = "middle";
    } else {                          // vertical
      const [T, Bo] = A.y < B.y ? [A, B] : [B, A];
      x1 = x2 = A.x + NW / 2; y1 = T.y + NH + 4; y2 = Bo.y - 4; lx = x1 + 9; ly = (y1 + y2) / 2 + 5; anchor = "start";
    }
    const hd = A.y === B.y ? `M${x1 + 9} ${y1 - 5} L${x1} ${y1} L${x1 + 9} ${y1 + 5} M${x2 - 9} ${y2 - 5} L${x2} ${y2} L${x2 - 9} ${y2 + 5}`
                            : `M${x1 - 5} ${y1 + 9} L${x1} ${y1} L${x1 + 5} ${y1 + 9} M${x2 - 5} ${y2 - 9} L${x2} ${y2} L${x2 + 5} ${y2 - 9}`;
    out.push(`<g class="ce" data-e="${e.id}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><path class="hd" d="${hd}"/><text x="${lx}" y="${ly}" text-anchor="${anchor}" class="el">${CH.sym(e.lab[0], e.lab[1])}</text></g>`);
  }
  const V = box("Vsol"), Cm = box("Cm");        // V_sol feeds the concentrations (parameter, dashed)
  out.push(`<line class="param" x1="${V.x + NW + 4}" y1="${V.y + NH / 2}" x2="${Cm.x - 4}" y2="${Cm.y + NH / 2}"/>`);
  for (const [k, n] of Object.entries(NODES)) {
    const {x, y} = box(k);
    out.push(`<g class="cn${n.hub ? " hub" : ""}${n.param ? " prm" : ""}" data-id="${k}" tabindex="0" role="button" aria-label="${n.name}">
<rect x="${x}" y="${y}" width="${NW}" height="${NH}" rx="6"/>
<text x="${x + 10}" y="${y + 24}" class="ns">${CH.sym(n.sym[0], n.sym[1])}${n.unit ? ` <tspan class="nu">(${n.unit})</tspan>` : ""}</text>
<text x="${x + 10}" y="${y + 42}" class="nn">${n.name}</text>
<text x="${x + 10}" y="${y + 66}" class="cv" id="v-${k}">${opts.values ? "" : ""}</text></g>`);
  }
  out.push(`<text x="610" y="262" class="lg">ρ, M : propres à l'espèce</text><text x="610" y="282" class="lg">N<tspan dy="4" font-size="70%">A</tspan><tspan dy="-4"> = 6,02×10²³ mol⁻¹</tspan></text><text x="610" y="302" class="lg">V<tspan dy="4" font-size="70%">m</tspan><tspan dy="-4"> = 24,0 L/mol (gaz)</tspan></text>`);
  out.push("</svg>");
  return out.join("\n");
};

// ---------- conversion engine (n is the hub) ----------
// moves[a>b] = {to, form, f(v), sub(v)} ; text built as "form = substitution = result unit"
CH.moves = (sp, Vsol) => {
  const M = sp.M, rho = sp.rho, F = CH.fmt;
  const mv = (form, f, sb, unit) => ({form, f, sub: sb, unit});
  return {
    "Vesp>m": mv("m = ρ × V<sub>esp</sub>", v => rho * v, v => `${F(rho)} × ${F(v)}`, "g"),
    "m>Vesp": mv("V<sub>esp</sub> = m / ρ", v => v / rho, v => `${F(v)} / ${F(rho)}`, "L"),
    "m>n": mv("n = m / M", v => v / M, v => `${F(v)} / ${F(M)}`, "mol"),
    "n>m": mv("m = n × M", v => v * M, v => `${F(v)} × ${F(M)}`, "g"),
    "n>N": mv("N = n × N<sub>A</sub>", v => v * NA, v => `${F(v)} × ${CH.sci(NA, 3)}`, ""),
    "N>n": mv("n = N / N<sub>A</sub>", v => v / NA, v => `${F(v)} / ${CH.sci(NA, 3)}`, "mol"),
    "n>Vgaz": mv("V = n × V<sub>m</sub>", v => v * VM, v => `${F(v)} × ${F(VM)}`, "L"),
    "Vgaz>n": mv("n = V / V<sub>m</sub>", v => v / VM, v => `${F(v)} / ${F(VM)}`, "mol"),
    "m>Cm": mv("C<sub>m</sub> = m / V<sub>sol</sub>", v => v / Vsol, v => `${F(v)} / ${F(Vsol)}`, "g/L"),
    "Cm>m": mv("m = C<sub>m</sub> × V<sub>sol</sub>", v => v * Vsol, v => `${F(v)} × ${F(Vsol)}`, "g"),
    "n>C": mv("C = n / V<sub>sol</sub>", v => v / Vsol, v => `${F(v)} / ${F(Vsol)}`, "mol/L"),
    "C>n": mv("n = C × V<sub>sol</sub>", v => v * Vsol, v => `${F(v)} × ${F(Vsol)}`, "mol"),
    "Cm>C": mv("C = C<sub>m</sub> / M", v => v / M, v => `${F(v)} / ${F(M)}`, "mol/L"),
    "C>Cm": mv("C<sub>m</sub> = C × M", v => v * M, v => `${F(v)} × ${F(M)}`, "g/L"),
  };
};
CH.available = sp => {
  const a = ["m", "n", "N"];
  if (sp.state === "g") a.push("Vgaz"); else a.push("Vesp");
  if (sp.solute) a.push("Cm", "C");
  return a;
};
// BFS from `known` ; returns {id: {val, steps:[{from,to,form,sub,unit,val}]}}
CH.solve = (sp, known, x, Vsol) => {
  const av = new Set(CH.available(sp)), mv = CH.moves(sp, Vsol);
  const res = {[known]: {val: x, steps: []}}, q = [known];
  while (q.length) {
    const a = q.shift();
    for (const key in mv) {
      const [s, t] = key.split(">");
      if (s !== a || !av.has(t) || res[t]) continue;
      const m = mv[key], val = m.f(res[a].val);
      res[t] = {val, steps: res[a].steps.concat([{from: s, to: t, form: m.form, sub: m.sub(res[a].val), unit: m.unit, val, edge: [s, t]}])};
      q.push(t);
    }
  }
  return res;
};
CH.stepText = st => `${st.form} = ${st.sub} = <b>${CH.fmt(st.val)}${st.unit ? " " + st.unit : ""}</b>`;

// ---------- least squares + calibration chart ----------
CH.fit0 = pts => { const sxy = pts.reduce((s, p) => s + p.x * p.y, 0), sxx = pts.reduce((s, p) => s + p.x * p.x, 0); return sxy / sxx; };
CH.fit = pts => {
  const n = pts.length, mx = pts.reduce((a, p) => a + p.x, 0) / n, my = pts.reduce((a, p) => a + p.y, 0) / n;
  const sl = pts.reduce((s, p) => s + (p.x - mx) * (p.y - my), 0) / pts.reduce((s, p) => s + (p.x - mx) ** 2, 0);
  const b = my - sl * mx, sst = pts.reduce((s, p) => s + (p.y - my) ** 2, 0), ssr = pts.reduce((s, p) => s + (p.y - (sl * p.x + b)) ** 2, 0);
  return {slope: sl, b, r2: 1 - ssr / sst};
};
const nice = (max, n = 5) => { const raw = max / n, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p; const s = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10; return s * p; };
// opts: pts[{x,y,label}], k, b (line y=k x+b), xmax, ymax (data units), xs (x display scale), xl, yl, ydec, probe{y, x}
CH.calibSVG = o => {
  const W = 560, H = 360, l = 62, r = 18, t = 16, bt = 50, pw = W - l - r, ph = H - t - bt;
  const xmax = o.xmax, ymax = o.ymax, X = x => l + x / xmax * pw, Y = y => t + ph - y / ymax * ph;
  const xs = o.xs || 1, xstep = nice(xmax * xs, 5) / xs, ystep = nice(ymax, 6), f = CH.fmt;
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Courbe d'étalonnage"}">`;
  for (let x = 0; x <= xmax * 1.0001; x += xstep) s += `<line class="gr" x1="${X(x)}" y1="${t}" x2="${X(x)}" y2="${t + ph}"/><text class="tk" x="${X(x)}" y="${t + ph + 16}" text-anchor="middle">${f(x * xs, 2)}</text>`;
  for (let y = 0; y <= ymax * 1.0001; y += ystep) s += `<line class="gr" x1="${l}" y1="${Y(y)}" x2="${l + pw}" y2="${Y(y)}"/><text class="tk" x="${l - 8}" y="${Y(y) + 4}" text-anchor="end">${y.toFixed(ystep < 0.01 ? 3 : ystep < 0.1 ? 2 : ystep < 1 ? 1 : 0)}</text>`;
  s += `<path class="ax" d="M${l} ${t} V${t + ph} H${l + pw}"/>`;
  s += `<text class="al" x="${l + pw / 2}" y="${H - 8}" text-anchor="middle">${o.xl}</text><text class="al" transform="translate(14 ${t + ph / 2}) rotate(-90)" text-anchor="middle">${o.yl}</text>`;
  if (o.k != null) { const x2 = Math.min(xmax, (ymax - (o.b || 0)) / o.k); s += `<line class="fit" x1="${X(0)}" y1="${Y(o.b || 0)}" x2="${X(x2)}" y2="${Y(o.k * x2 + (o.b || 0))}"/>`; }
  if (o.probe) {
    const px = X(o.probe.x), py = Y(o.probe.y);
    s += `<path class="probe" d="M${l} ${py} H${px} V${t + ph}"/><circle class="pp" cx="${px}" cy="${py}" r="4.5"/><text class="pl" x="${px + 8}" y="${t + ph - 8}">${f(o.probe.x * xs, 3)}</text><text class="pl" x="${l + 6}" y="${py - 6}">${f(o.probe.y, 3)}</text>`;
  }
  for (const p of o.pts || []) s += `<g class="pt"><path d="M${X(p.x) - 5} ${Y(p.y)} h10 M${X(p.x)} ${Y(p.y) - 5} v10"/>${p.label ? `<text x="${X(p.x) + 7}" y="${Y(p.y) + 16}">${p.label}</text>` : ""}</g>`;
  return s + "</svg>";
};

g.CH = CH;
})(typeof window !== "undefined" ? window : globalThis);
