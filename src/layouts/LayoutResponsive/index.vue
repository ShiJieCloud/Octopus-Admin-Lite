<script setup lang="ts">

import Logo from '@/layouts/components/Logo/index.vue'
import Main from '@/layouts/components/Main/index.vue'
import { ref } from 'vue'

import { useThemeStore } from '@/stores/modules/theme'

const { themeConfig } = useThemeStore()

const navDrawer = ref(false)
const translateShow = ref(false)
</script>

<template>
  <div class="layout-responsive">
    <el-container>
      <el-header class="flex items-center justify-between">
        <Logo />
        <div class="header-menu">
          <!-- 搜索按钮 -->
          <svg-icon width="24px" height="24px" class="cursor-pointer" name="Search" />

          <!-- 用户信息 -->
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                     @click="navDrawer = !navDrawer" />

          <el-drawer v-model="navDrawer" size="100%">
            <template #header>
              <Logo />
            </template>
            <div class="nav-container ">
              <a href="#">个人中心</a>
              <el-divider />
              <div>
                  <span class="flex items-center justify-between" @click="translateShow = !translateShow">
                    翻译
                    <svg-icon name="Earth"></svg-icon>
                  </span>
                <!-- 语言列表 -->
                <transition name="fade">
                  <div v-show="translateShow" id="language-list" class="language-list mt-2">
                    <ul>
                      <li class="p-2 hover:bg-gray-200">英语</li>
                      <li class="p-2 hover:bg-gray-200">中文</li>
                      <li class="p-2 hover:bg-gray-200">西班牙语</li>
                      <!-- 添加更多语言 -->
                    </ul>
                  </div>
                </transition>
              </div>
              <el-divider />
              <div class="nav-theme-switch">
                <span>暗黑主题</span>
                <el-switch v-model="themeConfig.darkThemeEnabled" size="large" />
              </div>
              <el-divider />
              <span>退出登录</span>
            </div>
          </el-drawer>
        </div>
      </el-header>
      <div class="w-full tab-container">Menu</div>
      <el-main>
        <Main />
      </el-main>
    </el-container>

  </div>
</template>

<style scoped lang="postcss">
.layout-responsive {
  @apply w-screen h-screen;

  .el-container {
    @apply h-full w-full;

    .el-header {
      @apply w-full pl-3 pr-3 flex;
      height: var(--os-layout-header-height);
      @apply border-b border-solid overflow-hidden;
      border-color: var(--el-border-color-light);

      .header-menu {
        @apply flex items-center justify-between gap-2;
      }
    }

    .tab-container {
      background-color: var(--el-bg-color);

    }

    .el-main {
      @apply h-full p-3;
      background-color: var(--el-bg-color-page);
    }
  }
}

:deep(.el-drawer__header) {
  @apply px-3 py-0 h-[55px] border-b-2 border-solid m-0;
  color: var(--el-text-color-regular);
  border-color: var(--el-border-color-light);
}

:deep(.el-drawer__title) {
  font-size: 20px;
}

:deep(.el-drawer__body) {
  @apply py-0 px-8;
}

:deep(.el-drawer__close-btn) {
  @apply text-3xl;
}

.nav-container {
  margin: 0 auto;
  padding: 24px 0 96px;
  max-width: 18rem;
}

.nav-theme-switch {
  @apply flex items-center justify-between rounded-md;
}

/* 添加动画效果 */
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.logo-title {
  @apply text-lg font-bold subpixel-antialiased;
  @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500;
}
</style>