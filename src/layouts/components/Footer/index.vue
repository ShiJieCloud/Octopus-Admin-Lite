<script setup lang="ts">
const app_title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="footer-container">
    <!-- 左侧：公司名称或标志 -->
    <div class="flex-content">
      <img src="@/assets/images/logo.svg" alt="logo" />
      <span class="logo-title">{{ app_title }}</span>
    </div>
    <!-- 中间：导航链接 -->
    <div class="flex-content service-content">
      <RouterLink to="about">关于我们</RouterLink>
      <a href="#contact">联系我们</a>
      <a href="#privacy-policy">隐私政策</a>
      <a href="#terms-of-service">服务条款</a>
    </div>
    <!-- 右侧：版权信息 -->
    <div class="text-right text-sm">&copy; 2024 Octopus. 保留所有权利.</div>
  </div>
</template>

<style scoped lang="postcss">
.footer-container{
  @apply flex items-center justify-between w-full;
  @apply select-none;
  height: var(--os-layout-footer-height);

  .flex-content{
    @apply flex items-center gap-2;

    &.service-content{
      @apply flex justify-center gap-1 text-sm text-gray-400;
    }

    .logo-title {
      @apply font-bold subpixel-antialiased;
      @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500;
    }
  }

  img{
    @apply size-6;
  }
}
</style>