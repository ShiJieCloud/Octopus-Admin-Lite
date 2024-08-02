<script setup lang="ts"></script>

<template>
  <div class="layout-container">
    <el-container>
      <el-aside>Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="postcss">
.layout-container {
  @apply w-screen h-screen;

    .el-aside {
      @apply bg-amber-300 w-60 h-full;
    }

    .el-container {
      @apply bg-amber-400 h-full w-full;

      .el-header {
        @apply bg-amber-500 h-14;
      }

      .el-main {
        @apply bg-amber-600 h-full;
      }

      .el-footer {
        @apply bg-amber-700 h-10;
      }
    }
}
</style>