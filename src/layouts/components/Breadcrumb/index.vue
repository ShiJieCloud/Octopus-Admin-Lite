<script setup lang="ts" name="Breadcrumb">
import { useThemeStore } from '@/stores/modules/theme'

const { themeConfig } = useThemeStore()
</script>

<template>
  <!-- 面包屑 -->
  <el-breadcrumb v-show="themeConfig.showBreadcrumb" class="breadcrumb-container" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.components && { name: item.name }"
      class="flex items-center w-auto text-nowrap"
    >
      <template #default>
        <span class="flex items-center gap-1">
          <svg-icon v-show="themeConfig.showBreadcrumbIcon" v-if="item.meta.icon" :name="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </span>
      </template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="postcss">
.breadcrumb-container {
  display: flex;
  flex-wrap: nowrap; /* 防止换行 */
  overflow: hidden; /* 横向滚动溢出处理 */
  padding-right: 12px;
  line-height: normal;
}
</style>