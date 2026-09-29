# Torseur : pédale de commande (control pedal)

Sheets: `docs/pedale.jpeg`, `docs/pedale2.jpeg`.

Pedal 2 turns on frame 1 through a **pivot of axis x** at **A**. The foot pushes
down at **B** with F (unknown). Rod 3 (pivot at C) pulls down at **E** with
**T = 10 daN = 100 N**. Goal: F and the action of the pivot at A.

It is a see-saw: the foot pushes down on one side of the axis to lift the rod
on the other side.

Axes: z up, y horizontal toward C, x along the pivot axis.

## Geometry (reading the figure)

- A → O: 100 mm along x.
- O → B: 200 mm along −y (B on the left).
- Arm OD = 120 mm (the "120" dimension is parallel to the arm), tilted **30°**
  from the horizontal (arc labelled 30° at H).
  Triangle O–H–D: OH = 0.12·cos30 ≈ 0.104 m (horizontal), HD = 0.12·sin30 = 0.06 m.
- D → C: 60 mm along x (pin). C is at the same height as D; in the perspective
  view it only *looks* close to the y axis.
- C → E: down the rod (length not given, not needed: parallel to T).

Don't measure angles on a perspective drawing – trust the written values.

## 1–2) Isolate 2+3, list external actions

```
            ⎧  0  0 ⎫              ⎧  0  0 ⎫              ⎧ Ax  0 ⎫
{τ ch→3} =  ⎨  0  0 ⎬   {τ ut→2} = ⎨  0  0 ⎬   {τ 1→2} =  ⎨ Ay  M ⎬
          E ⎩ −T  0 ⎭            B ⎩ −F  0 ⎭            A ⎩ Az  N ⎭
```

Pivot of axis x ⇒ L = 0.

## 3) All moments at A

**Load:** M_A(ch→3) = M_E + AE ∧ T, M_E = 0.

AE (walk A → O → H → D → C → E):

| Step | Along | Distance |
|---|---|---|
| A → O | x | +0.1 |
| O → H | y | +0.12·cos30 |
| H → D | z | +0.12·sin30 |
| D → C | x | +0.06 |
| C → E | z | −rod (irrelevant) |

AE = (0.16 ; 0.12·cos30 ; …)

```
| 0.16       |   |  0 |   | −0.12cos30·T |   | −10.4 N·m |
| 0.12·cos30 | ∧ |  0 | = | +0.16·T      | = | +16 N·m   |
| (any)      |   | −T |   |  0           |   |  0        |
```

**Foot:** M_A(ut→2) = M_B + AB ∧ F, M_B = 0, AB = (0.1 ; −0.2 ; 0).

```
| 0.1  |   |  0 |   | (−0.2)(−F) |   | +0.2 F |
| −0.2 | ∧ |  0 | = | −0.1(−F)   | = | +0.1 F |
| 0    |   | −F |   |  0         |   |  0     |
```

**Frame:** already at A ⇒ (0 ; M ; N).

```
            ⎧  0   −0.104 T ⎫              ⎧  0   0.2 F ⎫             ⎧ Ax  0 ⎫
{τ ch→3} =  ⎨  0   +0.16 T  ⎬   {τ ut→2} = ⎨  0   0.1 F ⎬   {τ 1→2} = ⎨ Ay  M ⎬
          A ⎩ −T    0       ⎭            A ⎩ −F    0    ⎭           A ⎩ Az  N ⎭
```

## 4) PFS at A

| | Equation | Result |
|---|---|---|
| Force x | Ax = 0 | Ax = 0 |
| Force y | Ay = 0 | Ay = 0 |
| Force z | −T − F + Az = 0 | Az = T + F ≈ 152 N |
| Moment x | −0.104 T + 0.2 F + 0 = 0 | **F ≈ 52 N** |
| Moment y | 0.16 T + 0.1 F + M = 0 | M ≈ −21.2 N·m |
| Moment z | N = 0 | N = 0 |

The moment about x (the pivot's free axis) is the see-saw:
**F × 0.2 = T × 0.104 ⇒ F ≈ 52 N**.

```
            ⎧  0    0 ⎫              ⎧ 0     0    ⎫
{τ ut→2} =  ⎨  0    0 ⎬   {τ 1→2} =  ⎨ 0   −21.2  ⎬
          B ⎩ −52   0 ⎭            A ⎩ 152    0   ⎭
```
