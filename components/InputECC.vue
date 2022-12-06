<template>
  <div class="flex flex-row w-1/2 pb-4 mx-auto">
    <div class="flex flex-col w-1/3 px-4 text-center">
      <div class="my-1 grow">
        <label class="mr-2">a =</label>
        <input
          class="w-24 px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="curve.a"
        />
      </div>
      <div class="my-1 grow">
        <label class="mr-2">b =</label>
        <input
          class="w-24 px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="curve.b"
        />
      </div>
      <div class="my-1 grow">
        <label class="mr-2">p =</label>
        <input
          class="w-24 px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="curve.p"
        />
      </div>
    </div>

    <div class="w-2/3 mt-2">
      <p>Sehingga ECC berbentuk :</p>
      <MathJax class="block my-4 text-2xl" :latex="eccFormula(curve)"></MathJax>
    </div>
  </div>
  <div class="border"></div>
</template>

<script setup lang="ts">
import { MathJax } from "mathjax-vue3";

const curve = useCurve();

const eccFormula = (curve: Curve) =>
  `$$y^2 = x^3 + ${curve.a ? (curve.a === 1 ? "" : curve.a) : "a"}x + ${
    curve.b ?? "b"
  } \\pmod {${curve.p ?? "p"}}$$`;
</script>
