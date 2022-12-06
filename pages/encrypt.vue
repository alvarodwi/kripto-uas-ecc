<template>
  <div class="w-1/2 p-4 mx-auto mt-4">
    <h1 class="mt-4 text-3xl font-bold">ECC Encrypt</h1>

    <p class="mt-3">
      Elliptic Curve Cryptography merupakan kriptografi asimetris, yang
      membutuhkan sebuah titik pembangkit α dan dua kunci (private-public) Misal
      kita namakan kunci enkripsi <i>q</i> dan kunci dekripsi <i>r</i>.
    </p>

    <div class="my-1">
      <p class="my-1">Rumus enkripsi adalah</p>
      <MathJax :latex="encryptFormula"></MathJax>
      <MathJax :latex="y1Formula"></MathJax>
      <MathJax :latex="y2Formula"></MathJax>
    </div>

    <p class="mt-4 border-t">
      Berikut kalkulator untuk memudahkan perhitungannya :
    </p>

    <div class="grid w-3/4 grid-cols-2 mt-2 grid-flow-cols">
      <div class="col-span-2 my-1 grow">
        <label class="mr-2">α =</label>
        <select
          class="px-2 py-2 m-0 text-sm font-normal text-gray-700 bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:border-green-600 focus:outline-none"
          v-model="crypt.alpha"
        >
          <option v-for="alpha in alphas" :value="alpha">
            ({{ alpha.x }}, {{ alpha.y }})
          </option>
        </select>
      </div>

      <div class="my-1 grow">
        <label class="mr-2">q =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="crypt.q"
        />
      </div>

      <div class="my-1 grow">
        <label class="mr-2">r =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="crypt.r"
        />
      </div>

      <div class="col-span-2 my-1 mt-4">
        Sementara itu, plaintext yang akan di-enkripsi adalah :
      </div>

      <div class="my-1 grow">
        <label class="mr-2">p1 =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="crypt.pt.x"
        />
      </div>

      <div class="my-1 grow">
        <label class="mr-2">p2 =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="crypt.pt.y"
        />
      </div>

      <div class="col-span-2">
        <button
          v-on:click="encrypt"
          class="px-3 py-2 mt-4 text-xs font-semibold text-gray-700 border border-green-300 border-solid rounded-lg hover:text-gray-900 hover:border-green-600"
        >
          Encrypt
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
      <h3 class="mt-2 mb-1 text-xl font-bold">Enkripsi</h3>

      <p class="my-1">Enkripsi ECC membutuhkan kunci <i>q</i> dan <i>r</i></p>

      <div class="my-1">
        <label class="mr-2">qα = {{ crypt.q }}α = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(crypt.q, crypt.alpha))"
          readonly
        />
      </div>

      <div class="my-1">
        <label class="mr-2">rα = {{ crypt.r }}α = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(crypt.r, crypt.alpha))"
          readonly
        />
      </div>

      <div class="my-1">
        <label class="mr-2"
          >q.(rα) = {{ crypt.q
          }}{{ printPoint(nCurveAddition(crypt.r, crypt.alpha)) }} =
        </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="
            printPoint(
              nCurveAddition(crypt.q, nCurveAddition(crypt.r, crypt.alpha))
            )
          "
          readonly
        />
      </div>

      <p class="my-1 mt-4">Sehingga ditemukan y1 dan y2</p>

      <div class="my-1">
        <label class="mr-2">y1 = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(crypt.q, crypt.alpha))"
          readonly
        />
      </div>

      <div class="my-1">
        <label class="mr-2">y2 = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="
            printPoint(
              curveAddition(
                crypt.pt,
                nCurveAddition(crypt.q, nCurveAddition(crypt.r, crypt.alpha))
              )
            )
          "
          readonly
        />
      </div>

      <div class="my-1">
        <p>
          Sehingga ditemukan CT = {
          {{ printPoint(nCurveAddition(crypt.q, crypt.alpha)) }},
          {{
            printPoint(
              curveAddition(
                crypt.pt,
                nCurveAddition(crypt.q, nCurveAddition(crypt.r, crypt.alpha))
              )
            )
          }}
          }
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { MathJax } from "mathjax-vue3";

// latex untuk rumus enkripsi
const encryptFormula = "$$CT = (y_1, y_2)$$";
const y1Formula = "$$y_1 = qα$$";
const y2Formula = "$$y_2 = (p_1,p_2) + q.(rα)$$";

const curve = useCurve();
const showResult = ref(false);

const alphas: Ref<Point[]> = ref(generateAlpha(generateTable(curve.value)));
const crypt: Ref<Crypt> = ref(<Crypt>{
  alpha: alphas.value[0],
  q: 1,
  r: 1,
  pt: { x: 1, y: 1 },
  ct: [],
});

watch(curve.value, () => {
  alphas.value = generateAlpha(generateTable(curve.value));
  crypt.value.alpha = alphas.value[0];
});

watch(crypt.value, () => {
  clear();
});

function encrypt() {
  showResult.value = true;
}

function clear() {
  showResult.value = false;
}
</script>
