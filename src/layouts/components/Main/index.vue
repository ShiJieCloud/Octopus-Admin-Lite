<script setup lang="ts" name="Main">

</script>

<template>
  <!-- 使用 transition 组件为 router-view 添加过渡效果 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
/* 定义过渡的动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out; /* 设置动画持续时间为 0.5 秒 */
}
.fade-enter, .fade-leave-to {
  opacity: 0; /* 进入和离开时的透明度设为 0 */
}
</style>