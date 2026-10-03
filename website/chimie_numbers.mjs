// Numbers shared by the English and French worked solutions (computed once, formatted per language).
export default function (CH) {
  const n36 = 36 / 18, V50 = .050, m50 = 789 * V50, nSalt = 5.85 / 58.5;
  const sug = {m: 5.0, M: 342}, nSug = sug.m / sug.M, Nsug = nSug * CH.NA;
  const mEt = 789 * .1, nEt = mEt / 46, NEt = nEt * CH.NA;
  const nB = 3 / 24, mCO2 = nB * 44, mO2 = nB * 32, NB = nB * CH.NA;
  const CmCa = .080, CCa = CmCa / 40.1, nCaB = CCa * 1.5, mCaB = CmCa * 1.5;
  const nCu = 12.7 / 63.5, VCu = 12.7 / 8960;
  const Mg = {NaCl: 58.5, glc: 180, cu: 159.5};
  const m1 = .1 * .25 * 58.5, n3 = .5 * .01, nCuSO4 = 2.5 / 159.5, CCuSO4 = nCuSO4 / .5;
  const nCO2 = .072 / 24.1, mCaCO3 = nCO2 * 100.1, pCaCO3 = mCaCO3 / 1.2 * 100;
  const stdC = [1.00, 2.00, 5.00, 8.00, 10.0].map(x => x * 1e-3), stdA = [0.010, 0.019, 0.045, 0.082, 0.103];
  const ptsT = stdC.map((x, i) => ({x, y: stdA[i]}));
  const kT = CH.fit0(ptsT), fitT = CH.fit(ptsT);
  const CsT = .035 / kT, CmsT = CsT * 63.5, gkgT = CmsT * 1.00 / .5000;
  const mnC = [1, 2, 3, 4, 5].map(x => x * 1e-4), mnA = [0.25, 0.47, 0.73, 0.95, 1.19], kMn = CH.fit0(mnC.map((x, i) => ({x, y: mnA[i]})));
  const Cmn = .62 / kMn, Cmn2 = .29 / kMn;
  const naC = [1, 2, 3, 4, 5].map(x => x * 1e-3), naS = [0.125, 0.255, 0.378, 0.508, 0.630], kNa = CH.fit0(naC.map((x, i) => ({x, y: naS[i]})));
  const CNa = .390 / kNa, CNa0 = CNa * 50;
  const mCuFlask = CmsT * 1.00;
  const eC = [1.0, 0.5, 0.4, 0.2, 0.1], eA = [1.625, 0.786, 0.702, 0.349, 0.208];     // blue-drink sheet (E133), C_m in mg/L
  const ptsE = eC.map((x, i) => ({x, y: eA[i]})), fitE = CH.fit(ptsE), kE = fitE.slope, k0E = CH.fit0(ptsE);   // kE = 1.5744 = slope of the spreadsheet trendline
  const myE = eA.reduce((a, b) => a + b) / eA.length, r2E = 1 - eA.reduce((t, a, i) => t + (a - kE * eC[i]) ** 2, 0) / eA.reduce((t, a) => t + (a - myE) ** 2, 0);
  const CbE = .832 / kE, CbE0 = .832 / k0E, CbE2 = (.832 - fitE.b) / fitE.slope, dailyE = 10 * 70;
  return {eC, eA, ptsE, kE, k0E, fitE, r2E, CbE, CbE0, CbE2, dailyE, n36, V50, m50, nSalt, sug, nSug, Nsug, mEt, nEt, NEt, nB, mCO2, mO2, NB, CmCa, CCa, nCaB, mCaB, nCu, VCu, m1, n3, nCuSO4, CCuSO4, nCO2, mCaCO3, pCaCO3, stdC, stdA, ptsT, kT, fitT, CsT, CmsT, gkgT, mnC, mnA, kMn, Cmn, Cmn2, naC, naS, kNa, CNa, CNa0, mCuFlask};
}
