<script setup lang="ts">
import { type Component, computed } from 'vue'
import LayoutClassic from '@/layouts/LayoutClassic/index.vue'
import LayoutTransverse from '@/layouts/LayoutHorizontal/index.vue'

// 定义布局模式与对应的组件类型
const layoutMode: Record<string, Component> = {
  classic: LayoutClassic,   // 经典布局
  horizontal: LayoutTransverse  // 横向布局
}

// 计算属性，根据具体逻辑返回所选布局的组件
const mode = computed(() => layoutMode['horizontal'])
</script>

<template>
  <!-- 根据 layout 的值渲染不同的布局样式 -->
  <component :is="mode" />
</template>

<style scoped lang="postcss">
</style>