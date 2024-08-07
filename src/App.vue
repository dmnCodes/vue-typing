<script setup lang="ts">
// import VueTyping from '/dist/vue-typing'
import VueTyping from '/lib/dmnTyping.vue'
</script>

<template>
  <header></header>

  <main>
    <VueTyping :sentences="['Welcome!', ' It`s My Website', ' I`m dmnCodes!']" loop>
      <template #before></template>
      <template #after></template>
    </VueTyping>
  </main>
</template>

<style scoped></style>
