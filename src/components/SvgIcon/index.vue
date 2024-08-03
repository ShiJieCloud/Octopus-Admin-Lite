<template>
  <svg :class="iconClass" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SvgProps {
  name: string // 图标的名称 ==> 必传
  prefix?: string // 图标的前缀 ==> 非必传（默认为"icon"）
  iconClass?: string // 图标的类名 ==> 非必传
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: 'icon',
  iconClass: () => 'size-5'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped lang="scss">

</style>