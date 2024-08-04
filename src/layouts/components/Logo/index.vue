<script setup lang="ts">

const app_title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="logo-container">
    <svg-icon class="size-8" name="logo" />
    <span class="logo-title">{{ app_title }}</span>
  </div>
</template>

<style scoped lang="postcss">
.logo-container {
  @apply flex items-center justify-center;
  height: var(--os-layout-logo-height);
  width: var(--os-layout-aside-width);

  .logo-title {
    @apply text-lg font-bold subpixel-antialiased;
    @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500;
  }
}
</style>