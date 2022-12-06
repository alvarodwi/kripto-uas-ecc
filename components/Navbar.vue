<template>
  <nav
    class="w-full gap-4 p-4 mb-4 text-lg font-semibold text-center text-gray-700 border-b cursor-pointer hover:text-gray-900"
  >
    <NuxtLink to="/" class="pr-4 hover:underline n-link-base"> Home</NuxtLink>
    <NuxtLink to="/table" class="px-4 hover:underline n-link-base"
      >Table</NuxtLink
    >
    <NuxtLink to="/encrypt" class="px-4 hover:underline n-link-base">
      Encrypt
    </NuxtLink>
    <NuxtLink to="/decrypt" class="px-4 hover:underline n-link-base">
      Decrypt
    </NuxtLink>
    <NuxtLink to="/tool" class="px-4 hover:underline n-link-base">
      Tools
    </NuxtLink>
  </nav>
</template>
