<script setup lang="ts">

</script>

<template>
  <el-breadcrumb separator="/" class="breadcrumb-container">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>management</el-breadcrumb-item>
    <el-breadcrumb-item>list</el-breadcrumb-item>
    <el-breadcrumb-item>detail</el-breadcrumb-item>
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