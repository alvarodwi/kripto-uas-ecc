<template>
  <div class="p-4">
    <h1 class="mt-4 text-3xl font-bold">ECC Decrypt</h1>

    <p class="mt-3">
      Elliptic Curve Cryptography merupakan kriptografi asimetris, yang
      membutuhkan sebuah titik pembangkit α dan dua kunci (private-public)
    </p>
    <p>
      Misal kita namakan kunci enkripsi <i>q</i> dan kunci dekripsi <i>r</i>.
      Maka proses dekripsi bisa dilakukan seperti di-bawah ini :
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
        <label class="mr-2">r =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="r"
        />
      </div>

      <div class="my-1 grow">
        <label class="mr-2">y1 =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="y1.x"
        />
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="y1.y"
        />
      </div>

      <div class="my-1 grow">
        <label class="mr-2">y2 =</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="y2.x"
        />
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model.number="y2.y"
        />
      </div>
    </div>

    <!-- enkripsi -->
    <div class="mr-4">
      <h3 class="mt-4 mb-1 text-lg font-bold">Dekripsi</h3>

      <p>Enkripsi ECC membutuhkan kunci <i>r</i></p>

      <div>
        <label class="mr-2">r.y1 = {{ r }}{{ printPoint(y1) }} = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(nCurveAddition(r, y1))"
          readonly
        />
      </div>

      <div>
        <label class="mr-2">y2 - r.y1 = </label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          :value="printPoint(curveSubtract(y2, nCurveAddition(r, y1)))"
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

const r: Ref<number> = ref(1);

const y1: Ref<Point> = ref(<Point>{ x: 1, y: 1 });
const y2: Ref<Point> = ref(<Point>{ x: 1, y: 1 });

const alphas: Ref<Point[]> = ref(generateAlpha(generateTable(curve.value)));
const alpha: Ref<Point> = ref(alphas.value[0]);

function curveSubtract(p: Point, q: Point): Point {
  console.log(
    "test",
    -q.y,
    invmod(-q.y, curve.value.p),
    math.mod(-q.y, curve.value.p)
  );
  q.y = math.mod(-q.y, curve.value.p);

  console.log("test", q.x, q.y);

  return curveAddition(p, q);
}
</script>
