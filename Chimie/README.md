# Chimie: two courses

Source of the chemistry section of the website. Run `node website/build.mjs` to rebuild `website/dist`.

| Course | Pages |
|---|---|
| **1 · Dissolution et dilution** | formula map (course), conversion map, formula lab, worked examples, dissolution/dilution course, dilution lab, worked examples, exam *Sujet truffe, partie 1* (+ Q3), trainer |
| **2 · Dosage par étalonnage** | course, calibration lab, worked examples, exam *Sujet truffe, partie 2*, lab sheet *Sujet boisson bleue (E133)*, trainer |

## Where things live

- `chimie.js`: constants (N_A = 6.02×10²³, V_m = 24.0 L/mol), species table, number format/parse, the conversion map, calibration chart. Shared by the interactive pages and by the build.
- `chimie_quiz.js`: random question generators and the practice UI (hint + step-by-step solution for every question).
- `chimie.css`, `chimie_map.css`: styles (the second one is also appended to `site.css`).
- `*.html`: interactive pages (fragments, wrapped by `website/chimie_pages.mjs`).
- `website/chimie_pages.mjs`: build wiring (reading order, interactive-page wrapper, language loop). The written pages come in two twins: `chimie_en.mjs` (English, dot decimals) and `chimie_fr.mjs` (French, comma decimals, files named `*_fr.html`). All numbers come from `chimie_numbers.mjs`, computed once, never typed. Keep the two twins in step when editing. The interactive pages are French only.

## Notes

- The exam statement was transcribed from photos. The documents with the truffe criteria (limestone range, copper limit) and the absorption spectrum were not on the photographed pages: the final conclusions of Part 1 Q1 and Part 2 Q1/Q8 say what to compare, with the value to plug in left to the documents.
- Q7 of the exam can mean C_m of the soil solution (0.22 g/L) or g of Cu per kg of soil (0.44 g/kg); both are given.
