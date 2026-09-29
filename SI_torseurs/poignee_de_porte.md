# Torseur : poignée de porte (door handle)

Sheets: `docs/clanta.jpeg` (Q1), `docs/clanta2.jpeg` (Q2–Q4).

A user pushes on the handle at **A** with ‖F‖ = 30 N. The handle turns on the
door through a **pivot joint of axis y** centred at **E** (middle of CD).
Goal: the mechanical action at E.

Axes: z up, y along the shaft (from D toward C), x along the lever arm (toward A).

Dimensions read from the figure (check on paper): elbow → A = 111.75 mm along x,
elbow → C = 37.75 mm along y, CD = 41.90 mm ⇒ CE = 20.95 mm.

## Q1 – Isolate the handle, list external actions

Two actions (weight neglected):

1. user → handle, at A
2. door → handle, at E (pivot of axis y)

F makes 30° with the vertical (α = 30°):

- Fy = F·sin 30° = +15 N
- Fz = −F·cos 30° ≈ −25.98 N (downward)
- Fx = 0 (F lies in the (y, z) plane on the figure)

```
                  ⎧    0       0 ⎫     ⎧   0      0 ⎫
{τ ut→poignée} =  ⎨  F·sin30   0 ⎬  =  ⎨  15      0 ⎬
                A ⎩ −F·cos30   0 ⎭   A ⎩ −25.98   0 ⎭
```

Moment zero: F is applied at A.

```
                    ⎧ Ex  L ⎫
{τ porte→poignée} = ⎨ Ey  0 ⎬      (M = 0: rotation about y is free)
                  E ⎩ Ez  N ⎭
```

5 unknowns: Ex, Ey, Ez, L, N.

## Q2 – All moments at E

M_E = M_A + EA ∧ F, with M_A = 0.

EA (walk E → C → elbow → A):

- x: 0.11175 m
- y: 0.02095 + 0.03775 = 0.0587 m
- z: 0

```
| 0.11175 |   |   0    |   x: 0.0587 × (−25.98) − 0 × 15   = −1.525
| 0.0587  | ∧ |  15    | = y: 0 × 0 − 0.11175 × (−25.98)    = +2.903
| 0       |   | −25.98 |   z: 0.11175 × 15 − 0.0587 × 0     = +1.676
```

| Component | Meaning |
|---|---|
| My = +2.903 N·m | turns the handle about the shaft |
| Mx = −1.525 N·m | tilts the shaft in the door |
| Mz = +1.676 N·m | swings the shaft left/right |

```
                   ⎧   0     −1.525 ⎫                      ⎧ Ex  L ⎫
{τ ut→poignée}  =  ⎨  15     +2.903 ⎬    {τ porte→poignée} = ⎨ Ey  0 ⎬
                 E ⎩ −25.98  +1.676 ⎭                    E ⎩ Ez  N ⎭
```

## Q3 – PFS

{τ ut→poignée}_E + {τ porte→poignée}_E = {0}

| | Equation | Result |
|---|---|---|
| Force x | 0 + Ex = 0 | Ex = 0 |
| Force y | F sin α + Ey = 0 | Ey = −15 N |
| Force z | −F cos α + Ez = 0 | Ez = +25.98 N |
| Moment x | −0.0587 F cos α + L = 0 | L = +1.525 N·m |
| Moment y | 0.11175 F cos α + 0 = 0 | **impossible** |
| Moment z | 0.11175 F sin α + N = 0 | N = −1.676 N·m |

The y equation (2.903 = 0) is impossible: the perfect pivot transmits no moment
about y, so the handle is **not** in static equilibrium – it turns. In a real
lock a return spring provides ≈ −2.9 N·m.

## Q4 – Final torseurs

```
                   ⎧   0     −1.525 ⎫                      ⎧   0      1.525 ⎫
{τ ut→poignée}  =  ⎨  15     +2.903 ⎬    {τ porte→poignée} = ⎨ −15       0    ⎬
                 E ⎩ −25.98  +1.676 ⎭                    E ⎩ 25.98   −1.676 ⎭
                     (N)     (N·m)                            (N)     (N·m)
```

## Corrections on the handwritten sheet

- Pivot torseur: M must be **0** (not L, M, N).
- F = (0 ; F sin α ; **−F cos α**): the z component is negative.
- EA on y: 58.7 mm (37.75 + 20.95), not 68.7 – check on paper.
- Units: stay in metres ⇒ moments in N·m; 111.75 × 25.98 = 2903, not 2503.
- Q3 moment on x: L **−** 0.0587 F cos α = 0; on y: **0** + 0.11175 F cos α = 0.
