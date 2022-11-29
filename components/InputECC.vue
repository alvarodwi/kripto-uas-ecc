<script setup>
const curve = useCurve();
</script>

<template>
  <p>Input nilai p : <input type="text" v-model="curve.p" /></p>
  <p>Input nilai a : <input type="text" v-model="curve.a" /></p>
  <p>Input nilai b : <input type="text" v-model="curve.b" /></p>
</template>
