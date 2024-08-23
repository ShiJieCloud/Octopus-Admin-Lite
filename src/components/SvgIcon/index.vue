<!-- src/components/SvgIcon.vue -->
<template>
  <svg :class="iconClass" :width="size" :height="size" :fill="color" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SvgProps {
  name: string // 图标的名称 ==> 必传
  prefix?: string
  size?: string
  color?: string
  iconClass?: string // 图标的类名 ==> 非必传
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: 'icon',
  size: '20px',
  color: 'currentColor',
  iconClass: ''
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped lang="scss">
</style>