<script setup lang="ts">
const app_title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="footer-container">
    <!-- 左侧：公司名称或标志 -->
    <div class="flex-content">
      <svg-icon class="size-6" name="logo" />
      <span class="logo-title">{{ app_title }}</span>
    </div>
    <!-- 中间：导航链接 -->
    <div class="flex-content service-content">
      <a href="about">关于我们</a>
      <a href="#contact">联系我们</a>
      <a href="#privacy-policy">隐私政策</a>
      <a href="#terms-of-service">服务条款</a>
    </div>
    <!-- 右侧：版权信息 -->
    <div class="text-right">&copy; 2024 Octopus. 保留所有权利.</div>
  </div>
</template>

<style scoped lang="postcss">
.footer-container{
  @apply flex items-center justify-between w-full;
  @apply select-none text-xs;
  height: var(--os-layout-footer-height);

  .flex-content{
    @apply flex items-center gap-2;

    &.service-content{
      @apply flex justify-center gap-1  text-gray-400;
    }

    .logo-title {
      @apply font-bold subpixel-antialiased text-sm;
      @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500;
    }
  }
}
</style>