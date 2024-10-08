<script setup lang="ts" name="TabBar">
import { useTabsStore } from '@/stores/modules/tabs'
import { useThemeStore } from '@/stores/modules/theme'

const { tabConfig, closeTab, closeLeftTabs, closeRightTabs, closeOtherTabs, closeAllTabs, handleClick } = useTabsStore()
const { themeConfig } = useThemeStore()

</script>

<template>
  <!-- Tab Bar -->
  <div class="tab-bar-container">
    <div class="tab-bar-box">
      <el-scrollbar>
        <el-tabs
          v-model="tabConfig.activeTab"
          tab-position="top"
          type="card"
          closable
          @tab-remove="closeTab"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="(item, index) in tabConfig.cacheTabs"
            :key="index"
            :name="item.name"
          >
            <template #label>
                <span class="flex items-center">
                  <el-icon v-show="themeConfig.showTabsIcon" size="18px" class="mr-1 fill-black">
                    <svg-icon :name="item.meta.icon" />
                  </el-icon>
                  <span>{{ item.meta.title }}</span>
                </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
    <div class="more-button">
      <el-dropdown trigger="click">
        <span>
          <svg-icon name="more" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeTab">
              <div class="flex items-center gap-0.5">
                <svg-icon size="18px" name="close" />
                关闭当前
              </div>
            </el-dropdown-item>
            <el-dropdown-item @click="closeLeftTabs">
              <div class="flex items-center gap-0.5">
                <svg-icon size="18px" name="arrow-left-double" />
                关闭左侧
              </div>
            </el-dropdown-item>
            <el-dropdown-item @click="closeRightTabs">
              <div class="flex items-center gap-0.5">
                <svg-icon size="18px" name="arrow-right-double" />
                关闭右侧
              </div>
            </el-dropdown-item>
            <el-dropdown-item @click="closeOtherTabs">
              <div class="flex items-center gap-0.5">
                <svg-icon size="18px" name="close-others" />
                关闭其他
              </div>
            </el-dropdown-item>
            <el-dropdown-item @click="closeAllTabs">
              <div class="flex items-center gap-0.5">
                <svg-icon size="18px" name="close-all" />
                关闭全部
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-bar-container {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--el-border-color-light);

  .tab-bar-box {
    display: flex;
    flex-grow: 1;
    margin-left: 8px;
    width: calc(100% - 60px);

    .tab-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .more-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--os-layout-tab-height);
    height: var(--os-layout-tab-height);
    border-left: 1px solid var(--el-border-color-light);

  }
}

:deep(.el-tabs) {
  .el-tabs__header {
    height: var(--os-layout-tab-height);
    padding: 0;
    margin: 0;
    border-bottom: none;

    .el-tabs__nav-wrap {
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          border: none;

          .el-tabs__item {
            height: calc(var(--os-layout-tab-height) - 2px);
            line-height: calc(var(--os-layout-tab-height) - 2px);
            border: none;
            position: relative; // 确保父元素是相对定位的

            &::before {
              content: '';
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 2px;
              background-color: transparent;
            }

            &.is-active {
              color: var(--el-color-primary);
              fill: var(--el-color-primary);

              &::before {
                background-color: var(--el-color-primary); // 改变背景色以显示下划线
              }
            }
          }
        }
      }
    }
  }
}
</style>