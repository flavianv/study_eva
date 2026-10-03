// Numbers of the "problem" exercises (cake sheet + new problems in the same style). Shared by the EN and FR pages.
export default function (CH) {
  const NA = CH.NA, PI = Math.PI;
  // 1 · cake (the sheet)
  const cake = {};
  cake.Mchoc = 3e-22 * NA; cake.mChoc = 1.11 * cake.Mchoc;
  cake.nCO2 = 2.7e-2 * 11 / 10; cake.VCO2 = cake.nCO2 * 36.9; cake.Vfinal = .500 + cake.VCO2;
  cake.Vrect = 24 * 8.0 * 6.0 / 1000; cake.Vround = PI * 10 ** 2 * 6.0 / 1000;
  cake.Msugar = 12 * 12.0 + 22 * 1.00 + 11 * 16.0; cake.mSugar = .58 * cake.Msugar; cake.mFlour = 1.15 * 108.36; cake.mButter = 1.25e8 * 1e-6;
  // 2 · homemade lemonade (bicarbonate)
  const lem = {M: 23.0 + 1.00 + 12.0 + 3 * 16.0, m: 6.0}; lem.n = lem.m / lem.M; lem.V = lem.n * 24; lem.N = lem.n * NA; lem.head = 1.5 - 1.0;
  // 3 · mint syrup (dilution)
  const syr = {M: 342.0, Cm0: 6.0e2, F: 9, Vg: .25, cube: 5.0}; syr.C0 = syr.Cm0 / syr.M; syr.Cm = syr.Cm0 / syr.F; syr.C = syr.C0 / syr.F;
  syr.V0 = syr.Vg / syr.F; syr.Vw = syr.Vg - syr.V0; syr.m = syr.Cm * syr.Vg; syr.cubes = syr.m / syr.cube; syr.n = syr.m / syr.M; syr.N = syr.n * NA;
  // 4 · homemade saline (dissolution)
  const sal = {M: 23.0 + 35.5, Cm: 9.0, V: .500}; sal.m = sal.Cm * sal.V; sal.C = sal.Cm / sal.M; sal.n5 = sal.C * 5.0e-3; sal.N5 = sal.n5 * NA; sal.F = 10; sal.V0 = 100.0 / sal.F;
  // 5 · helium balloon
  const he = {V: 3.0, MHe: 4.00, Mair: 29.0, env: 2.0}; he.n = he.V / 24; he.N = he.n * NA; he.m = he.n * he.MHe; he.rho = he.MHe / 24; he.mAir = he.n * he.Mair; he.net = he.mAir - he.m - he.env;
  // 6 · copper sulfate: peach or melon (dosage)
  const bor = {C0: 1.00e-1, Vf: 50.0, V0: [5.0, 10.0, 20.0, 30.0, 40.0], A: [0.101, 0.203, 0.408, 0.604, 0.809], F: 5, Ad: 0.152, peach: 7.5e-2, melon: 1.5e-2, MCu: 63.5};
  bor.C = bor.V0.map(v => bor.C0 * v / bor.Vf); bor.pts = bor.C.map((x, i) => ({x, y: bor.A[i]})); bor.k = CH.fit0(bor.pts);
  bor.Cd = bor.Ad / bor.k; bor.Cx = bor.Cd * bor.F; bor.Cm = bor.Cx * bor.MCu;
  return {cake, lem, syr, sal, he, bor};
}
