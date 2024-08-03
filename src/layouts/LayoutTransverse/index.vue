<script setup lang="ts">

import Logo from '@/layouts/components/Logo/index.vue'
import Main from '@/layouts/components/Main/index.vue'
import TabBar from '@/layouts/components/TabBar/index.vue'
import Footer from '@/layouts/components/Footer/index.vue'
</script>

<template>
  <div class="layout-container">
    <el-container>
      <el-container>
        <el-header>
          <Logo />
        </el-header>
        <tab-bar class="tab-container" />
        <el-main>
          <Main />
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="postcss">
.layout-container {
  @apply w-screen h-screen;

  .el-aside {
    @apply bg-amber-300 h-full;
    width: var(--os-layout-aside-width);
  }

  .el-container {
    @apply bg-amber-400 h-full w-full;

    .tab-container {
      height: var(--os-layout-tab-height);
    }

    .el-header {
      @apply bg-amber-500 w-full p-0;
      height: var(--os-layout-header-height);

      .menu-vertical{
        width: calc(100vw - var(--os-layout-aside-width));
        height: var(--os-layout-header-height);
      }

      .user-profile{
        width: var(--os-layout-aside-width);
      }
    }

    .el-main {
      @apply bg-amber-600 h-full;
    }

    .el-footer {
      @apply bg-amber-700;
      height: var(--os-layout-footer-height);
    }
  }
}

</style>