<script setup lang="ts">

import Logo from '@/layouts/components/Logo/index.vue'
import Main from '@/layouts/components/Main/index.vue'
import TabBar from '@/layouts/components/TabBar/index.vue'
import Footer from '@/layouts/components/Footer/index.vue'
import Menu from '@/layouts/components/Menu/index.vue'
import { fullScreen } from '@/utils/FullScreen'
import { reactive } from 'vue'

import { useThemeStore } from '@/stores/modules/theme'

const {toggleThemeConfig} = useThemeStore()

const locales = reactive([
  {
    label: '中文',
    value: 'zh-CN'
  },
  {
    label: 'English',
    value: 'en-US'
  }
])
</script>

<template>
  <div class="layout-container">
    <el-container>
      <el-container>
        <el-header>
          <Logo />
          <Menu mode="horizontal" class="menu-horizontal" />
          <div class="header-menu">
            <!-- 语言转换 -->
            <el-dropdown :hide-on-click="false">
              <svg-icon name="Earth" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :key="index" v-for="(item, index) in locales">
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <!-- 搜索按钮 -->
            <svg-icon class="cursor-pointer" name="Search" />

            <!-- 皮肤按钮 -->
            <el-tooltip content="主题配置" placement="bottom">
              <svg-icon class="cursor-pointer" name="Theme" @click="toggleThemeConfig"/>
            </el-tooltip>

            <!-- 锁屏按钮 -->
            <el-tooltip content="锁屏" placement="bottom">
              <svg-icon class="cursor-pointer" name="Lock" />
            </el-tooltip>

            <!-- 全屏按钮 -->
            <el-tooltip content="全屏" placement="bottom">
              <svg-icon class="cursor-pointer" name="FullScreen" @click="fullScreen" />
            </el-tooltip>

            <!-- 用户信息 -->
            <el-dropdown>
              <div class="flex-gap-2">
                <el-tag type="primary">Admin</el-tag>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">
                    <template #default>
                      <div class="flex-gap-2">
                        <svg-icon name="User" />
                        <span>个人中心</span>
                      </div>
                    </template>
                  </el-dropdown-item>
                  <el-dropdown-item command="logout">
                    <template #default>
                      <div class="flex-gap-2">
                        <svg-icon name="Logout" />
                        <span>退出登录</span>
                      </div>
                    </template>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
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
    @apply h-full w-full;

    .tab-container {
      height: var(--os-layout-tab-height);
    }

    .el-header {
      @apply w-full pl-2 pr-2 flex;
      height: var(--os-layout-header-height);
      @apply border-b border-solid overflow-hidden;
      border-color: var(--el-border-color-light);

      .menu-horizontal{
        width: calc(100vw - var(--os-layout-aside-width) - var(--os-layout-header-menu-width));
        height: calc(var(--os-layout-header-height) - 20px);
      }

      .header-menu{
        @apply flex items-center justify-between;
        width: var(--os-layout-header-menu-width);

        .flex-gap-2 {
          @apply flex items-center gap-2;
        }
      }
    }

    .el-main {
      @apply h-full p-3;
      background-color:var(--el-bg-color-page);
    }

    .el-footer {
      height: var(--os-layout-footer-height);
    }
  }
}
</style>