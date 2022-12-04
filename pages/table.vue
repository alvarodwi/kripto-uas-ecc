<template>
  <div class="flex flex-row p-4">
    <!-- tabel -->
    <div class="w-1/2 mr-4">
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
    <div class="w-1/2 pl-4 border-l" v-if="alphas.length > 0">
      <h1 class="mt-4 text-3xl font-bold">Kurva Eliptik</h1>

      <p class="mt-3">
        Dari tabel disamping, kita bisa mengambang nilai <i>a</i> sembarang dari
        titik-titik yang ada pada kurva elliptik, yaitu :
      </p>
      <ul class="grid grid-flow-col grid-rows-4 mb-8 w-fit">
        <li v-for="alpha in alphas" class="p-2">
          ({{ alpha.x }}, {{ alpha.y }})
        </li>
      </ul>

      <div class="mt-4">
        <p>
          Selain itu, dalam ECC kita juga akan melakukan penjumlahan titik dalam
          kurva, yang bisa dikerjakan melalui rumus berikut :
        </p>
        <p>misal P(x1,y1) dan Q(x2,y2) merupakan titik dalam kurva</p>
        <p>P + Q =</p>
        <p>x3 = λ^2 - x1 -x2</p>
        <p>y3 = λ(x1 - x3) - y1</p>
        <p>λ =</p>
        <p>(y2 - y1)/(x2 - x1) untuk P != Q</p>
        <p>(3x1^2 + a)/2y1 untuk P = Q</p>

        <!-- kalkulator -->
        <div class="mt-3 border-t">
          <h2 class="mt-3 text-3xl font-bold">Kalkulator P + Q</h2>
          <div class="flex flex-row w-full mt-2">
            <div class="w-1/3">
              <!-- form kalkulator -->
              <div class="my-1 grow">
                <label class="mr-2">P =</label>
                <select v-model="p">
                  <option v-for="alpha in alphas" :value="alpha">
                    ({{ alpha.x }}, {{ alpha.y }})
                  </option>
                </select>
              </div>
              <div class="my-1 grow">
                <label class="mr-2">Q =</label>
                <select v-model="q">
                  <option v-for="alpha in alphas" :value="alpha">
                    ({{ alpha.x }}, {{ alpha.y }})
                  </option>
                </select>
              </div>
            </div>
            <!-- output kalkulator -->
            <div class="w-2/3">
              <div class="my-2 grow">
                <label class="mr-2">P + Q = </label>
                <input
                  class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
                  type="text"
                  :value="printPoint(curveAddition(p, q))"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";

const curve = useCurve();

const tableData: Ref<EllipticCurveData[]> = ref([]);
const alphas: Ref<Point[]> = ref([]);
const p: Ref<Point> = ref(<Point>{});
const q: Ref<Point> = ref(<Point>{});

const printPoint = (p: Point) => `(${p.x}, ${p.y})`;

function generate() {
  tableData.value = generateTable(curve.value);
  alphas.value = generateAlpha(tableData.value);
  p.value = alphas.value[0];
  q.value = alphas.value[0];
}

function reset() {
  tableData.value = [];
  alphas.value = [];
}
</script>
