<template>
  <h1>ECC Table Generator</h1>

  <p>
    Dalam ECC, kita memerlukan suatu titik "pembangkit" <i>a</i> yang merupakan
    titik sembarang pada kurva eliptik. Untuk mempermudah pemilihan titik
    "pembangkit", kita bisa menggunakan tabel berikut :
  </p>

  <table border="1">
    <thead>
      <tr>
        <th>x</th>
        <th>x^3 + x + 6</th>
        <th>mod [ANGKA]</th>
        <th>R^(p-1)/2 === 1 mod p</th>
        <th>QR([ANGKA])</th>
        <th>y</th>
      </tr>
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
