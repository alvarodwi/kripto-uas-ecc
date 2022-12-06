<template>
  <div class="w-1/2 mx-auto">
    <h1 class="mt-4 text-3xl font-bold">Elliptic Curve Cryptography</h1>

    <p class="mt-3">
      ECC merupakan sebuah pendekatan public-key cryptography yang memanfaatkan
      struktur aljabar dari kurva eliptik pada finite field.
    </p>

    <p class="mt-3">
      Kurva eliptik sendiri adalah kurva dengan bentuk umum persamaan :
    </p>
    <MathJax class="block w-full my-2" :latex="eccFormula()"></MathJax>

    <p class="mt-3">
      ECC memungkinkan penggunaan key yang lebih kecil dibanding algoritma
      public key lainnya, untuk menyediakan tingkat keamanan yang setara,
      sehingga dapat dikatakan bahwa algoritma ini lebih kuat.
    </p>

    <p class="mt-3 italic font-semibold">
      “One of the most powerful, but least understood in use today”
    </p>
  </div>
</template>

<script setup>
import { MathJax } from "mathjax-vue3";

const eccFormula = () => `$$y^2 = x^3 + ax + b \\pmod {p}$$`;
</script>
