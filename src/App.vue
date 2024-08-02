<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    {{ title }}
  </h1>
</template>

<style scoped lang="scss">
/* SCSS */
div {
  font: 2em sans-serif;
  h1 {
    color: $color;
  }
}
</style>
