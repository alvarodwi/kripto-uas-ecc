import { create, all } from "mathjs";

export const math = create(all);
const curve = useCurve();

export const printPoint = (p: Point) => `(${p.x}, ${p.y})`;

export function invmod(a: number, b: number) {
  a = math.mod(a, b);
  if (math.equal(b, 0)) throw new Error("Divisor must be non zero");
  let res: any = math.xgcd(a, b);
  res = res.valueOf();
  let [gcd, inv] = res;
  if (!math.equal(gcd, 1)) return NaN;
  inv = math.mod(inv, b);
  if (math.smaller(inv, 0)) inv = math.add(inv, b);
  return inv;
}

export function curveAddition(p: Point, q: Point): Point {
  let lambda = 0;

  if (p.x === q.x && p.y === q.y) {
    let quantifier = math.mod(
      math.evaluate(`3*${p.x}^2 + ${curve.value.a}`),
      curve.value.p
    );
    let divider = invmod(math.evaluate(`2*${p.y}`), curve.value.p);
    lambda = math.mod(math.evaluate(`${quantifier}*${divider}`), curve.value.p);
  } else {
    let quantifier = math.mod(math.evaluate(`${q.y} - ${p.y}`), curve.value.p);
    let divider = invmod(math.evaluate(`${q.x} - ${p.x}`), curve.value.p);
    lambda = math.mod(math.evaluate(`${quantifier}*${divider}`), curve.value.p);
  }

  let x3 = math.mod(math.evaluate(`${lambda}^2-${p.x}-${q.x}`), curve.value.p);
  let y3 = math.mod(
    math.evaluate(`${lambda}*(${p.x}-${x3}) - ${p.y}`),
    curve.value.p
  );

  return {
    x: x3,
    y: y3,
  };
}

export function nCurveAddition(n: number, c: Point): Point {
  let temp: Point = c;
  for (let i = 1; i < n; i++) {
    temp = curveAddition(temp, c);
  }
  return temp;
}

export function curveSubtract(p: Point, q: Point): Point {
  q.y = math.mod(-q.y, curve.value.p);

  return curveAddition(p, q);
}

export function generateTable(curve: Curve): EllipticCurveData[] {
  let data: EllipticCurveData[] = [];

  let quadraticMods = generateQuadraticMod(curve.p);
  let quadraticResidues = quadraticMods
    .map((qm) => qm.residue)
    .splice(0, curve.p / 2);

  for (let i = 1; i < curve.p; i++) {
    let curve_calc = math.evaluate(`${i}^3+${curve.a}*${i}+${curve.b}`);
    let after_mod = math.mod(curve_calc, curve.p);
    let r = quadraticResidues.includes(after_mod);
    let y_pos = quadraticResidues.indexOf(after_mod) + 1;

    data.push({
      x: i,
      curve_calc: curve_calc,
      after_mod: after_mod,
      r_value: r ? 1 : curve.p - 1,
      is_qr: r ? "yes" : "no",
      y: r ? [y_pos, curve.p - y_pos] : [],
    });
  }

  return data;
}

export function generateAlpha(ecData: EllipticCurveData[]): Point[] {
  let points: Point[] = [];

  for (let i = 0; i < ecData.length; i++) {
    if (ecData[i].y.length == 0) {
      continue;
    }
    points.push(<Point>{ x: ecData[i].x, y: ecData[i].y[0] });
    points.push(<Point>{ x: ecData[i].x, y: ecData[i].y[1] });
  }

  return points;
}

export function generateQuadraticMod(p: number): QuadraticResidue[] {
  let quadraticMods: QuadraticResidue[] = [];

  for (let i = 1; i < p; i++) {
    quadraticMods.push({
      number: i,
      residue: math.mod(math.evaluate(`${i}^2`), p),
    });
  }
  return quadraticMods;
}
