<template>
  <div>
    <nav class="flex align-center gap-4 p-4">
      <NuxtLink to="/" class="n-link-base"> Home </NuxtLink>
      <NuxtLink to="/table" class="n-link-base"> Table </NuxtLink>
      <NuxtLink to="/ecc" class="n-link-base"> ECC </NuxtLink>
    </nav>

    <InputECC />

    <slot />
  </div>
</template>
