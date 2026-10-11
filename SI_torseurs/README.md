# SI – Statique : torseurs

Worked solutions and notes for the statics (torseur) exercises in `docs/`.

| Exercise | Sheets | Solution |
|---|---|---|
| Poignée de porte (door handle) | `docs/clanta.jpeg`, `docs/clanta2.jpeg` | [poignee_de_porte.md](poignee_de_porte.md) |
| Pédale de commande (control pedal) | `docs/pedale.jpeg`, `docs/pedale2.jpeg` | [pedale_de_commande.md](pedale_de_commande.md) |
| Suspension automobile (car suspension) | `docs/suspension.jpeg` | [suspension.html](suspension.html) (interactive, animated) |
| Robot 6 axes (6-axis robot) | `docs/robot.jpeg` | [robot.html](robot.html) (interactive, animated) |
| Pédale de frein (brake pedal, practice exercise) | — | [pedale_frein.html](pedale_frein.html) (statement, hints, hidden corrections) |
| Console portante de bateau (boat crane) | `docs/console.jpeg` | [console_bateau.html](console_bateau.html) (interactive, animated) |
| Portail battant motorisé (gate, practice exercise) | — | [portail.html](portail.html) (statement, hints, hidden corrections) |

## Key ideas

### A torseur = force column + moment column, written at a point

```
         ⎧ X   L ⎫
{τ}  =   ⎨ Y   M ⎬
       P ⎩ Z   N ⎭
        force  moment (force × distance), about point P
         (N)   (N·m)
```

- The **force** (resultant) makes things slide; it is the same at every point.
- The **moment** makes things turn; it depends on the point where it is written.
- A force applied at A has **zero moment at A** (lever arm = 0).

### Joints (liaisons parfaites): free ⇔ 0, blocked ⇔ unknown

| Motion along / about x | In the joint's torseur |
|---|---|
| translation free | X = 0 |
| translation blocked | X unknown |
| rotation free | L = 0 |
| rotation blocked | L unknown |

Pivot joint of axis y: `{Ex L ; Ey 0 ; Ez N}` (M = 0, rotation about y is free).

This rule is for **joints only**. A known force (user, weight, load) is
projected on the axes from the figure with cos/sin.

### Projecting a force

The **cos goes on the axis next to the angle**, the sin on the opposite one.
sin 30° = 0.5, cos 30° = √3/2 ≈ 0.866. Check: Fy² + Fz² = F².

### Moving a moment: the BABAR formula

**M_B = M_A + BA ∧ R**

- BA goes **from the new point to the old point**.
- Find BA by walking from B to A along the axes (any path gives the same vector).

### Cross product

(a ; b ; c) ∧ (d ; e ; f) = (b·f − c·e ; c·d − a·f ; a·e − b·d)

Cover a line, cross-multiply the two others. Physically:

- **size** = r · F · sin θ: only the part of the force perpendicular to the
  lever arm makes things turn;
- **direction** = the rotation axis (right-hand rule).

A distance parallel to the force gives no moment (e.g. the height of a point
does not matter for a vertical force).

### PFS (principe fondamental de la statique)

Isolated system in equilibrium ⇒ sum of external torseurs **written at the same
point** = 0 ⇒ 6 equations (3 forces, 3 moments).
