<script setup>
// const curve = useCurve();
</script>

<template>
  <h1>ECC Table Generator</h1>
  <button
    v-on:click="
      generateTable({
        p: 31,
        a: 1,
        b: 13,
      })
    "
  >
    Generate
  </button>

  <p>
    Dalam ECC, kita memerlukan suatu titik "pembangkit" <i>a</i> yang merupakan
    titik sembarang pada kurva eliptik.
  </p>

  <p>
    Untuk mempermudah pemilihan titik "pembangkit", kita bisa menggunakan tabel
    berikut :
  </p>

  <table border="1">
    <thead>
      <!-- <tr>
        <th>x</th>
        <th>
          x^3 + {{ curve.a ? (curve.a === 1 ? "" : curve.a) : "a" }}x +
          {{ curve.b ? curve.b : "b" }}
        </th>
        <th>mod {{ curve.p ? curve.p : "p" }}</th>
        <th>R^(p-1)/2 === 1 mod p</th>
        <th>QR({{ curve.p ? curve.p : "p" }})</th>
        <th>y</th>
      </tr> -->
    </thead>
    <tbody>
      <tr>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
        <td>lorem</td>
      </tr>
    </tbody>
  </table>

  <p>Dari tabel diatas, kita bisa menggunakan nilai <i>a</i> berikut :</p>
</template>

<script>
export default {};
</script>
