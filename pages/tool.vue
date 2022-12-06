<template>
  <div class="w-1/2 mx-auto mt-4">
    <h2 class="mt-3 text-3xl font-bold">Kalkulator P + Q</h2>

    <p class="mt-4">
      Di dalam pengerjaan ECC kita perlu melakukan penjumlahan titik dalam kurva
      eliptik, dengan formula berikut :
    </p>
    <p class="mt-4 mb-4">
      misalkan, P(x<sub>1</sub>,y<sub>1</sub>) dan
      Q(x<sub>2</sub>,y<sub>2</sub>) merupakan titik dalam kurva berlaku :
    </p>
    <MathJax class="block my-2 text-lg" :latex="pqFormula"></MathJax>
    <MathJax class="block my-2 mt-4 text-lg" :latex="lambdaFormula"></MathJax>

    <!-- kalkulator -->
    <div class="pt-4 mt-8 border-t">
      <p class="mt-2">
        Kalkulator berikut dapat membantu penghitungan operasi diatas
      </p>
      <div class="w-full my-1">
        <label class="w-2/5 mr-2">P =</label>
        <select
          class="px-2 py-2 m-0 text-sm font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:border-green-600 focus:outline-none"
          v-model="p"
        >
          <option v-for="alpha in alphas" :value="alpha">
            ({{ alpha.x }}, {{ alpha.y }})
          </option>
        </select>
      </div>
      <div class="my-1">
        <label class="mr-2">Q =</label>
        <select
          class="px-2 py-2 m-0 text-sm font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:border-green-600 focus:outline-none"
          v-model="q"
        >
          <option v-for="alpha in alphas" :value="alpha">
            ({{ alpha.x }}, {{ alpha.y }})
          </option>
        </select>
      </div>
      <div class="my-1">
        <label class="mr-2">P + Q = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(curveAddition(p, q))"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { MathJax } from "mathjax-vue3";

const curve = useCurve();

// latex untuk rumus elliptik
const pqFormula = `$$P + Q = \\begin{cases}
  x_3 = \\lambda^2 - x_1 - x_2\\\\
  y_3 = \\lambda(x_1 - x_3) - y_1
\\end{cases}$$`;

const lambdaFormula = `$$\\lambda = \\begin{cases}
  {3x_1^2 + a \\over 2y_1}&\\text{, utk } P = Q \\\\
  {y_2 - y_1 \\over x_2 - x_2}&\\text{, utk } P \\ne Q
\\end{cases}$$`;

const alphas: Ref<Point[]> = ref(generateAlpha(generateTable(curve.value)));
const p: Ref<Point> = ref(alphas.value[0]);
const q: Ref<Point> = ref(alphas.value[0]);

watch(curve.value, () => {
  alphas.value = generateAlpha(generateTable(curve.value));
  p.value = alphas.value[0];
  q.value = alphas.value[0];
});
</script>
