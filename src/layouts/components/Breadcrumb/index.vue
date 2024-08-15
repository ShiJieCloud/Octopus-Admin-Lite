<script setup lang="ts">

</script>

<template>
  <!-- 面包屑 -->
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.components && { name: item.name }"
      class="flex items-center w-auto text-nowrap"
    >
      <template #default>
        <span class="flex items-center gap-1">
          <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
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