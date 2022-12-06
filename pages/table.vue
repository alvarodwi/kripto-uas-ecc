<template>
  <div class="flex flex-row w-3/4 p-4 mx-auto">
    <!-- tabel -->
    <div class="w-2/3 mr-4">
      <h1 class="mt-4 text-3xl font-bold">ECC Table Generator</h1>

      <p class="mt-3">
        Dalam ECC, kita memerlukan suatu titik "pembangkit" <i>a</i> yang
        merupakan titik sembarang pada kurva eliptik.
      </p>
      <p>
        Untuk mempermudah pemilihan titik "pembangkit", kita bisa menggunakan
        tabel berikut :
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
      <table class="my-1 mb-4 border">
        <thead class="text-sm border-b">
          <tr>
            <th class="px-6 py-4 text-left text-gray-900">
              <i>x</i>
            </th>
            <th class="px-6 py-4 text-left text-gray-900">
              <MathJax :latex="xFormula(curve)"></MathJax>
            </th>
            <th class="px-6 py-4 text-left text-gray-900">
              <MathJax :latex="mFormula(curve)"></MathJax>
            </th>
            <th class="px-6 py-4 text-left text-gray-900">
              <MathJax :latex="rFormula"></MathJax>
            </th>
            <th class="px-6 py-4 text-left text-gray-900">
              QR({{ curve.p ? curve.p : "p" }})
            </th>
            <th class="px-6 py-4 text-left text-gray-900"><i>y</i></th>
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
            <td class="px-6 py-4 text-center text-gray-900">
              {{ data.r_value }}
            </td>
            <td class="px-6 py-4 text-center text-gray-900">
              {{ data.is_qr }}
            </td>
            <td class="px-6 py-4 text-center text-gray-900">
              {{ data.y.length === 0 ? "" : data.y }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- alpha -->
    <div class="w-1/3 pl-4 border-l" v-if="alphas.length > 0">
      <h1 class="mt-4 text-3xl font-bold">Possible α</h1>

      <p class="mt-3">
        Dari tabel disamping, kita bisa mengambil nilai α sembarang dari
        titik-titik yang ada pada kurva elliptik, yaitu :
      </p>
      <ul class="grid grid-flow-col grid-rows-4 mb-8 w-fit">
        <li v-for="alpha in alphas" class="p-2">
          ({{ alpha.x }}, {{ alpha.y }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { MathJax } from "mathjax-vue3";

// latex untuk tabel
const xFormula = (curve: Curve) =>
  `$$x^3 + ${curve.a ? (curve.a === 1 ? "" : curve.a) : "a"}x + ${
    curve.b ? curve.b : "b"
  }$$`;
const rFormula = "$$R^{(p-1)/2} \\equiv 1 \\bmod p $$";
const mFormula = (curve: Curve) => `$$\\pmod {${curve.p ?? "p"}} $$`;

const curve = useCurve();

const tableData: Ref<EllipticCurveData[]> = ref([]);
const alphas: Ref<Point[]> = ref([]);

function generate() {
  tableData.value = generateTable(curve.value);
  alphas.value = generateAlpha(tableData.value);
}

function reset() {
  tableData.value = [];
  alphas.value = [];
}
</script>
