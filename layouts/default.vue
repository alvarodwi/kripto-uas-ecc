<template>
  <div class="w-full px-4">
    <nav
      class="w-full gap-4 p-4 mb-4 text-lg font-semibold text-center text-gray-700 border-b cursor-pointer hover:text-gray-900"
    >
      <NuxtLink to="/" class="pr-4 hover:underline n-link-base"> Home</NuxtLink>
      <NuxtLink to="/table" class="px-4 hover:underline n-link-base"
        >Table</NuxtLink
      >
      <NuxtLink to="/ecc" class="px-4 hover:underline n-link-base">
        ECC
      </NuxtLink>
    </nav>

    <InputECC />

    <slot />
  </div>
</template>
