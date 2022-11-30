<script setup lang="ts">
const curve = useCurve();
</script>

<template>
  <h1 class="mt-4 text-3xl font-bold">ECC Table Generator</h1>

  <p class="mt-3">
    Dalam ECC, kita memerlukan suatu titik "pembangkit" <i>a</i> yang merupakan
    titik sembarang pada kurva eliptik.
  </p>
  <p>
    Untuk mempermudah pemilihan titik "pembangkit", kita bisa menggunakan tabel
    berikut :
  </p>

  <button
    v-on:click="generate"
    class="px-3 py-2 mt-4 text-xs font-semibold text-gray-700 border border-green-300 border-solid rounded-lg hover:text-gray-900 hover:border-green-600"
  >
    Generate
  </button>
  <button
    v-on:click="reset"
    class="px-3 py-2 mt-4 ml-2 text-xs font-semibold text-gray-700 border border-red-300 border-solid rounded-lg hover:text-gray-900 hover:border-red-600"
  >
    Reset
  </button>
  <table class="my-1">
    <thead class="border-b">
      <tr>
        <th class="px-6 py-4 font-medium text-left text-gray-900">x</th>
        <th class="px-6 py-4 font-medium text-left text-gray-900">
          x^3 + {{ curve.a ? (curve.a === 1 ? "" : curve.a) : "a" }}x +
          {{ curve.b ? curve.b : "b" }}
        </th>
        <th class="px-6 py-4 font-medium text-left text-gray-900">
          mod {{ curve.p ? curve.p : "p" }}
        </th>
        <th class="px-6 py-4 font-medium text-left text-gray-900">
          R^(p-1)/2 === 1 mod p
        </th>
        <th class="px-6 py-4 font-medium text-left text-gray-900">
          QR({{ curve.p ? curve.p : "p" }})
        </th>
        <th class="px-6 py-4 font-medium text-left text-gray-900">y</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td
          class="px-6 py-4 text-center"
          v-if="tableData.length == 0"
          colspan="6"
        >
          Empty Table
        </td>
      </tr>
      <tr class="border-b" v-for="data in tableData">
        <td class="px-6 py-4 text-center text-gray-900">{{ data.x }}</td>
        <td class="px-6 py-4 text-center text-gray-900">
          {{ data.curve_calc }}
        </td>
        <td class="px-6 py-4 text-center text-gray-900">
          {{ data.after_mod }}
        </td>
        <td class="px-6 py-4 text-center text-gray-900">{{ data.r_value }}</td>
        <td class="px-6 py-4 text-center text-gray-900">{{ data.is_qr }}</td>
        <td class="px-6 py-4 text-center text-gray-900">
          {{ data.y.length === 0 ? "" : data.y }}
        </td>
      </tr>
    </tbody>
  </table>

  <p class="mt-3">
    Dari tabel diatas, kita bisa menggunakan nilai <i>a</i> berikut :
  </p>
  <ul v-for="alpha in alphas">
    <li class="">({{ alpha.x }}, {{ alpha.y }})</li>
  </ul>
</template>

<script lang="ts">
import { create, all, xgcd } from "mathjs";

const math = create(all);
const curve = useCurve();

function generateTable(curve: Curve): EllipticCurveData[] {
  let data: EllipticCurveData[] = [];

  let quadraticMods = generateQuadraticMod(curve.p);
  console.log("qmods", quadraticMods);

  let quadraticResidues = quadraticMods
    .map((qm) => qm.residue)
    .splice(0, curve.p / 2);

  console.log("qres", quadraticResidues);

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

function generateAlpha(ecData: EllipticCurveData[]): Point[] {
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

function generateQuadraticMod(p: number): QuadraticResidue[] {
  let quadraticMods: QuadraticResidue[] = [];

  for (let i = 1; i < p; i++) {
    quadraticMods.push({
      number: i,
      residue: math.mod(math.evaluate(`${i}^2`), p),
    });
  }
  return quadraticMods;
}

export default {
  data(): {
    tableData: EllipticCurveData[];
    alphas: Point[];
  } {
    return {
      tableData: [],
      alphas: [],
    };
  },
  methods: {
    generate() {
      this.tableData = generateTable(curve.value);
      this.alphas = generateAlpha(this.tableData);
    },
    reset() {
      this.tableData = [];
      this.alphas = [];
    },
  },
};
</script>
