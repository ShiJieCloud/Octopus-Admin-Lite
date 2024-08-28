<script setup lang="ts" name="OSMenu">

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
        <el-icon size="22px">
          <svg-icon name="home" />
        </el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-sub-menu index="/permission">
        <template #title>
          <el-icon size="22px">
            <svg-icon name="permission" />
          </el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/permission/user">
          <el-icon size="22px">
            <svg-icon name="user" />
          </el-icon>
          <template #title>
            <span>用户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/permission/department">
          <el-icon size="22px">
            <svg-icon name="post-tree" />
          </el-icon>
          <template #title>
            <span>部门管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/permission/menu">
          <el-icon size="22px">
            <svg-icon name="post-tree" />
          </el-icon>
          <template #title>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/permission/role">
          <el-icon size="22px">
            <svg-icon name="role" />
          </el-icon>
          <template #title>
            <span>角色管理</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/about">
        <el-icon size="22px">
          <svg-icon name="about" />
        </el-icon>
        <template #title>
          <span>关于项目</span>
        </template>
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