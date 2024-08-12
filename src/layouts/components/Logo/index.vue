<script setup lang="ts">

const app_title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <!-- logo 容器 -->
  <div class="logo-container">
    <!--  logo 图标 -->
    <svg-icon width="32px" height="32px" name="logo" />

    <!-- 应用标题，只在中等及以上屏幕尺寸上可见 -->
    <span class="logo-title hidden md:block">{{ app_title }}</span>
  </div>
</template>

<style scoped lang="postcss">
.logo-container {
  @apply flex items-center;
  height: var(--os-layout-logo-height);
  width: var(--os-layout-aside-width);

  .logo-title {
    @apply text-lg font-bold subpixel-antialiased;
    @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500;
  }
}
</style>