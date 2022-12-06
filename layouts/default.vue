<template>
  <div class="w-full">
    <Navbar />

    <InputECC />

    <slot />
  </div>
</template>

<script setup>
import { initMathJax, renderByMathjax } from "mathjax-vue3";

function onMathJaxReady() {
  const el = document.getElementById("elementId");
  renderByMathjax(el);
}

initMathJax({}, onMathJaxReady);
</script>
