<script setup lang="ts" name="Logo">

import { useThemeStore } from '@/stores/modules/theme'

const { themeConfig } = useThemeStore()

const app_title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <!-- logo 容器 -->
  <div class="logo-container" :class="{ fold: themeConfig.layoutMode!='horizontal' && !!themeConfig.menuCollapse }">
    <!--  logo 图标 -->
    <svg-icon size="32px" name="logo" />

    <!-- 应用标题，只在中等及以上屏幕尺寸上可见 -->
    <span v-show="themeConfig.layoutMode=='horizontal' || !themeConfig.menuCollapse" class="logo-title hidden md:block">{{ app_title }}</span>
  </div>
</template>

<style scoped lang="postcss">
.logo-container {
  @apply flex items-center;
  height: var(--os-layout-logo-height);
  width: var(--os-layout-aside-width);

  &.fold {
    width: var(--os-layout-aside-fold-width);
  }

  .logo-title {
    @apply text-lg font-bold subpixel-antialiased;
    @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500;
  }
}
</style>