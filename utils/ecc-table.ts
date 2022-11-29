import { create, all } from "mathjs";

const math = create(all);

export function generateTable(curve: Curve): EllipticCurveData[] {
  let data: EllipticCurveData[] = [];

  let quadraticMods = generateQuadraticMod(curve.p);
  console.log("qmods", quadraticMods);

  let quadraticResidues = quadraticMods
    .splice(0, curve.p / 2)
    .map((qm) => qm.residue);

  console.log("qres", quadraticResidues);

  for (let i = 1; i < curve.p; i++) {
    let calc = math.evaluate(`${i}^3+${curve.a}*${i}+${curve.b}`);
    let r = 1;

    data.push({
      x: i,
      curve_calc: calc,
      after_mod: math.mod(calc, curve.p),
      r_value: r,
      is_qr: r === 1 ? "yes" : "no",
      y: [0],
    });
  }

  console.log("tabel", data);
  return data;
}

function generateQuadraticMod(p: number): QuadraticResidue[] {
  let quadraticMods: QuadraticResidue[] = [];

  for (let i = 0; i < p; i++) {
    quadraticMods.push({
      number: i,
      residue: math.mod(math.evaluate(`${i}^2`), p),
    });
  }
  return quadraticMods;
}
