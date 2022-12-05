<template>
  <div class="p-4">
    <h1 class="mt-4 text-3xl font-bold">ECC Encrypt</h1>

    <p class="mt-3">
      Elliptic Curve Cryptography merupakan kriptografi asimetris, yang
      membutuhkan sebuah titik pembangkit α dan dua kunci (private-public)
    </p>
    <p>
      Misal kita namakan kunci enkripsi <i>q</i> dan kunci dekripsi <i>r</i>.
      Maka proses enkripsi bisa dilakukan seperti di-bawah ini :
    </p>

    <div class="grid grid-flow-row grid-cols-3">
      <div class="my-1 grow">
        <label class="mr-2">α =</label>
        <select v-model="alpha">
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
          v-model.number="q"
        />
      </div>

      <div class="my-1 grow">
        <label class="mr-2">r =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="r"
        />
      </div>

      <div class="my-1 grow">
        <label class="mr-2">p1 =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="pt.x"
        />
      </div>

      <div class="my-1 grow">
        <label class="mr-2">p2 =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="pt.y"
        />
      </div>
    </div>

    <!-- enkripsi -->
    <div class="mr-4">
      <h3 class="mt-4 mb-1 text-lg font-bold">Enkripsi</h3>

      <p>Enkripsi ECC membutuhkan kunci <i>q</i> dan <i>r</i></p>

      <div>
        <label class="mr-2">qα = {{ q }}α = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(q, alpha))"
          readonly
        />
      </div>

      <div>
        <label class="mr-2">rα = {{ r }}α = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(r, alpha))"
          readonly
        />
      </div>

      <div>
        <label class="mr-2"
          >q.(rα) = {{ q }}{{ printPoint(nCurveAddition(r, alpha)) }} =
        </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(q, nCurveAddition(r, alpha)))"
          readonly
        />
      </div>

      <p>Sehingga ditemukan y1 dan y2</p>

      <div>
        <label class="mr-2">y1 = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(q, alpha))"
          readonly
        />
      </div>

      <div>
        <label class="mr-2">y2 = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="
            printPoint(
              curveAddition(pt, nCurveAddition(q, nCurveAddition(r, alpha)))
            )
          "
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
const curve = useCurve();

watch(curve.value, () => {
  alphas.value = generateAlpha(generateTable(curve.value));
  alpha.value = alphas.value[0];
});

const q: Ref<number> = ref(1);
const r: Ref<number> = ref(1);

const pt: Ref<Point> = ref(<Point>{ x: 1, y: 1 });

const alphas: Ref<Point[]> = ref(generateAlpha(generateTable(curve.value)));
const alpha: Ref<Point> = ref(alphas.value[0]);
</script>
