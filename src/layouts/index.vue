<script setup lang="ts" name="Layout">
import { type Component, computed, onMounted, onUnmounted, ref, watch } from 'vue'
import LayoutClassic from '@/layouts/LayoutClassic/index.vue'
import LayoutHorizontal from '@/layouts/LayoutHorizontal/index.vue'
import LayoutResponsive from '@/layouts/LayoutResponsive/index.vue'
import Theme from '@/layouts/components/Theme/index.vue'
import LockScreen from '@/layouts/components/LockScreen/index.vue'

import { useThemeStore } from '@/stores/modules/theme'

const { themeConfig } = useThemeStore()

// 定义布局模式与对应的组件类型
const layoutMode: Record<string, Component> = {
  classic: LayoutClassic,   // 经典布局
  horizontal: LayoutHorizontal,  // 横向布局
  responsive: LayoutResponsive  // 响应式布局
}

// 布局模式
const layMode = ref(themeConfig.layoutMode)

// 监听主题配置模式
watch(() => themeConfig.layoutMode, (newMode) => {
  layMode.value = newMode
})

// 计算属性，根据具体逻辑返回所选布局的组件
const mode = computed(() => layoutMode[layMode.value])

// 响应式布局，切换布局模式
const updateMode = () => {
  if (window.innerWidth < 1024) {
    layMode.value = 'responsive'
  } else {
    layMode.value = themeConfig.layoutMode
  }
}

onMounted(() => {
  // 初始更新
  updateMode()
  window.addEventListener('resize', updateMode)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMode)
})
</script>

<template>
  <!-- 根据 mode 的值渲染不同的布局样式 -->
  <LockScreen v-if="themeConfig.lockScreen" />
  <component :is="mode" />
  <Theme />
</template>

<style scoped lang="postcss">
</style>