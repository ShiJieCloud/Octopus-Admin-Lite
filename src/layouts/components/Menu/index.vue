<script setup lang="ts">

// 使用 props 来控制 `mode` 属性，切换菜单的显示模式（vertical | horizontal）
const props = defineProps<{
  mode?: 'vertical' | 'horizontal',
  collapse?: boolean
}>()
</script>

<template>
  <div class="menu-container">
    <el-menu
      class="os-menu"
      router
      :default-active="$route.path"
      :mode="props.mode"
      :collapse="props.collapse"
      :show-timeout="50"
      :hide-timeout="50"
    >
      <el-menu-item index="/home">
        <el-icon size="24px">
          <svg-icon name="Home" />
        </el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon size="24px">
          <svg-icon name="About" />
        </el-icon>
        <template #title>
          <span>关于项目</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>Navigator Four</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="postcss">
.menu-container {
  background-color: var(--el-menu-bg-color);

  .os-menu {
    @apply border-0;

    &.el-menu--horizontal {
      height: calc(var(--os-layout-logo-height) - 1px);
    }
  }
}
</style>