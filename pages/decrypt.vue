<template>
  <div class="w-1/2 p-4 mx-auto mt-4">
    <h1 class="mt-4 text-3xl font-bold">ECC Decrypt</h1>

    <p class="mt-3">
      Elliptic Curve Cryptography merupakan kriptografi asimetris, yang
      membutuhkan sebuah titik pembangkit α dan dua kunci (private-public) Misal
      kita namakan kunci enkripsi <i>q</i> dan kunci dekripsi <i>r</i>.
    </p>

    <div class="my-1">
      <p class="my-1">Rumus dekripsi adalah</p>
      <MathJax :latex="decryptFormula"></MathJax>
    </div>

    <p class="mt-4 border-t">
      Berikut kalkulator untuk memudahkan perhitungannya :
    </p>

    <div class="flex flex-col w-3/4 grid-cols-2 mt-2">
      <div class="my-1 grow">
        <label class="mr-2">α =</label>
        <select v-model="crypt.alpha">
          <option v-for="alpha in alphas" :value="alpha">
            ({{ alpha.x }}, {{ alpha.y }})
          </option>
        </select>
      </div>

      <div class="my-1 grow">
        <label class="mr-2">r =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="crypt.r"
        />
      </div>

      <div class="flex flex-row my-1 grow">
        <label class="mr-2">y1 (x,y) =</label>
        <div class="flex flex-row">
          <input
            class="w-16 px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
            type="text"
            v-model.number="crypt.ct[0].x"
          />
          <input
            class="w-16 px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
            type="text"
            v-model.number="crypt.ct[0].y"
          />
        </div>
      </div>

      <div class="flex flex-row my-1 grow">
        <label class="mr-2">y2 (x,y) =</label>
        <div class="flex flex-row">
          <input
            class="w-16 px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
            type="text"
            v-model.number="crypt.ct[1].x"
          />
          <input
            class="w-16 px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
            type="text"
            v-model.number="crypt.ct[1].y"
          />
        </div>
      </div>

      <div class="col-span-2">
        <button
          v-on:click="decrypt"
          class="px-3 py-2 mt-4 text-xs font-semibold text-gray-700 border border-green-300 border-solid rounded-lg hover:text-gray-900 hover:border-green-600"
        >
          Decrypt
        </button>
        <button
          v-on:click="clear"
          class="px-3 py-2 mt-4 ml-2 text-xs font-semibold text-gray-700 border border-red-300 border-solid rounded-lg hover:text-gray-900 hover:border-red-600"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- enkripsi -->
    <div class="mt-4 mr-4 border-t" v-if="showResult">
      <h3 class="mt-4 mb-1 text-lg font-bold">Dekripsi</h3>

      <p>Dekripsi ECC membutuhkan kunci <i>r</i></p>

      <div class="my-1">
        <label class="mr-2"
          >r.y1 = {{ crypt.r }}{{ printPoint(crypt.ct[0]) }} =
        </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(crypt.r, crypt.ct[0]))"
          readonly
        />
      </div>

      <div class="my-1">
        <label class="mr-2">y2 - r.y1 = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="
            printPoint(
              curveSubtract(crypt.ct[1], nCurveAddition(crypt.r, crypt.ct[0]))
            )
          "
          readonly
        />
      </div>

      <p class="my-1 mt-4">
        Sehingga ditemukan PT =
        {{
          printPoint(
            curveSubtract(crypt.ct[1], nCurveAddition(crypt.r, crypt.ct[0]))
          )
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { MathJax } from "mathjax-vue3";

// latex untuk rumus enkripsi
const decryptFormula = "$$(p_1, p_2) = y_2 - r.y_1$$";

const curve = useCurve();
const showResult = ref(false);

const alphas: Ref<Point[]> = ref(generateAlpha(generateTable(curve.value)));
const crypt: Ref<Crypt> = ref(<Crypt>{
  alpha: alphas.value[0],
  q: 1,
  r: 1,
  pt: {},
  ct: [
    { x: 1, y: 1 },
    { x: 1, y: 1 },
  ],
});

watch(curve.value, () => {
  alphas.value = generateAlpha(generateTable(curve.value));
  crypt.value.alpha = alphas.value[0];
});

watch(crypt.value, () => {
  clear();
});

function decrypt() {
  showResult.value = true;
}

function clear() {
  showResult.value = false;
}
</script>
