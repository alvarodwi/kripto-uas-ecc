<script setup>
const curve = useCurve();
</script>

<template>
  <div class="pb-4 border-b">
    <div class="flex flex-col w-full px-4">
      <div class="my-1 grow">
        <label class="mr-2">Input nilai a :</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model="curve.a"
        />
      </div>
      <div class="my-1 grow">
        <label class="mr-2">Input nilai b :</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model="curve.b"
        />
      </div>
      <div class="my-1 grow">
        <label class="mr-2">Input nilai p :</label>
        <input
          class="px-4 py-2 m-0 text-sm font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-900 focus:bg-white focus:border-green-600 focus:outline-none"
          type="text"
          v-model="curve.p"
        />
      </div>
    </div>

    <div class="px-4 mt-2">
      <p>
        Sehingga ECC berbentuk :
        <span class="font-medium">
          y^2 = x^3 +
          {{ curve.a ? (curve.a === 1 ? "" : curve.a) : "a" }}x +
          {{ curve.b ? curve.b : "b" }} (mod {{ curve.p ? curve.p : "p" }})
        </span>
      </p>
    </div>
  </div>
</template>
