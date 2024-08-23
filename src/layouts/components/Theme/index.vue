<script setup lang="ts" name="Theme">
import { useThemeStore } from '@/stores/modules/theme'
import { onMounted } from 'vue'

const { themeConfig, changeThemeColor } = useThemeStore()

onMounted(() => {
  // 在组件挂载到 DOM 后更新主题颜色
  changeThemeColor(themeConfig.themeColor)
})
</script>

<template>
  <div>
    <el-drawer v-model="themeConfig.showTheme" size="300">
      <template #header="{ titleId }">
        <span :id="titleId" class="theme-header"> 主题配置 </span>
      </template>

      <el-scrollbar>
        <div class="mr-4">
          <el-divider>布局样式</el-divider>
          <div class="layout-box">
            <el-tooltip effect="dark" content="经典布局" placement="top" :show-after="200">
              <div
                :class="['layout-item layout-classic', { 'is-active': themeConfig.layoutMode == 'classic' }]"
                @click="themeConfig.layoutMode='classic'"
              >
                <div class="layout-dark"></div>
                <div class="layout-container">
                  <div class="layout-light"></div>
                  <div class="layout-content"></div>
                </div>
                <svg-icon class="select-layout" name="tips" v-if="themeConfig.layoutMode == 'classic'" />
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="横向布局"
              placement="top"
              :show-after="200"
            >
              <div
                :class="['layout-item layout-transverse', { 'is-active': themeConfig.layoutMode == 'horizontal' }]"
                @click="themeConfig.layoutMode='horizontal'"
              >
                <div class="layout-dark"></div>
                <div class="layout-content"></div>
                <svg-icon class="select-layout" name="tips" v-if=" themeConfig.layoutMode == 'horizontal'" />
              </div>
            </el-tooltip>
          </div>

          <el-divider>主题风格</el-divider>
          <div class="switch-container">
            <div class="switch-box">
              <div class="switch-title">
                <span>主题颜色</span>
                <el-tooltip content="主题颜色" placement="top">
                  <svg-icon width="16px" height="16px" name="tips"></svg-icon>
                </el-tooltip>
              </div>
              <el-color-picker
                color-format="hex"
                v-model="themeConfig.themeColor"
                :predefine="themeConfig.predefineColors"
                @change="changeThemeColor"
              />
            </div>
            <div class="switch-box">
              <div class="switch-title">
                <span>暗黑主题</span>
                <el-tooltip content="暗黑主题" placement="top">
                  <svg-icon width="16px" height="16px" name="tips"></svg-icon>
                </el-tooltip>
              </div>
              <el-switch v-model="themeConfig.darkTheme" />
            </div>
            <div class="switch-box">
              <div class="switch-title">
                <span>灰色模式</span>
                <el-tooltip content="灰色模式" placement="top">
                  <svg-icon width="16px" height="16px" name="tips"></svg-icon>
                </el-tooltip>
              </div>
              <el-switch v-model="themeConfig.grayTheme" />
            </div>
          </div>

          <el-divider>界面设置</el-divider>
          <div class="switch-container">
            <div class="switch-box">
              <div class="switch-title">
                <span>菜单折叠</span>
                <el-tooltip content="菜单折叠，只在经典布局生效" placement="top">
                  <svg-icon width="16px" height="16px" name="tips"></svg-icon>
                </el-tooltip>
              </div>
              <el-switch v-model="themeConfig.menuCollapse" inline-prompt />
            </div>
            <div class="switch-box">
              <div class="switch-title">
                <span>面包屑</span>
                <el-tooltip content="面包屑隐藏" placement="top">
                  <svg-icon width="16px" height="16px" name="tips"></svg-icon>
                </el-tooltip>
              </div>
              <el-switch v-model="themeConfig.showBreadcrumb" inline-prompt />
            </div>
            <div class="switch-box">
              <div class="switch-title">
                <span>面包屑图标</span>
                <el-tooltip content="面包屑图标隐藏" placement="top">
                  <svg-icon width="16px" height="16px" name="tips"></svg-icon>
                </el-tooltip>
              </div>
              <el-switch v-model="themeConfig.showBreadcrumbIcon" inline-prompt />
            </div>
            <div class="switch-box">
              <div class="switch-title">
                <span>标签页</span>
                <el-tooltip content="标签页隐藏" placement="top">
                  <svg-icon width="16px" height="16px" name="tips"></svg-icon>
                </el-tooltip>
              </div>
              <el-switch v-model="themeConfig.showTabs" inline-prompt />
            </div>
            <div class="switch-box">
              <div class="switch-title">
                <span>标签页图标</span>
                <el-tooltip content="标签页图标隐藏" placement="top">
                  <svg-icon width="16px" height="16px" name="tips"></svg-icon>
                </el-tooltip>
              </div>
              <el-switch v-model="themeConfig.showTabsIcon" inline-prompt />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<style scoped lang="postcss">
.theme-header {
  @apply text-base font-bold flex items-center;
}

.switch-container {
  @apply flex-grow space-y-2;
}

.switch-box {
  @apply flex justify-between items-center w-full;
}

.switch-title {
  @apply flex gap-2 items-center;
}

:deep(.el-drawer__header) {
  @apply px-5 py-0 h-12 border-b-2 border-solid m-0;
  color: var(--el-text-color-regular);
  border-color: var(--el-border-color-light);
}

:deep(.el-drawer__title) {
  font-size: 20px;
}

:deep(.el-drawer__body) {
  @apply py-0 pr-0;
}

.layout-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 15px 0;

  .layout-item {
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    transition: all 0.2s;

    .layout-dark {
      background-color: var(--el-color-primary);
      border-radius: 3px;
    }

    .layout-light {
      background-color: var(--el-color-primary-light-5);
      border-radius: 3px;
    }

    .layout-content {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
    }

    .select-layout {
      position: absolute;
      right: 10px;
      bottom: 10px;
      fill: var(--el-color-primary);
      transition: all 0.2s;
    }

    &:hover {
      box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
    }
  }

  .is-active {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }

  .layout-classic {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .layout-dark {
      width: 20%;
    }

    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;

      .layout-light {
        height: 20%;
      }

      .layout-content {
        height: 67%;
      }
    }
  }

  .layout-transverse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;

    .layout-dark {
      height: 20%;
    }

    .layout-content {
      height: 67%;
    }
  }
}
</style>