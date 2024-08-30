<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import { getDepartmentListApi } from '@/api/interface/department'

const filterDepartmentText = ref()

const departmentTreeRef = ref()

const departmentData = ref()

const departmentTreeProps = {
  children: 'children',
  label: 'name',
  value: 'id'
}

// 获取部门数据
const getDepartmentData = async () => {
  departmentData.value = await getDepartmentListApi(filterDepartmentText)
}

const filterDepartment = (value: string, data: any) => {
  if (!value) return true
  return data.name.includes(value)
}

watch(() => filterDepartmentText.value, (val) => {
  departmentTreeRef.value!.filter(val)
})

onMounted(() => {
  getDepartmentData()
})

</script>

<template>
  <div class="position-component">
    <div class="filter-container">
      <div class="input-container">
        <el-input
          v-model="filterDepartmentText"
          placeholder="请输入部门名称"
        />
        <svg-icon class="cursor-pointer" size="28px" name="more" />
      </div>
      <el-divider />
      <div class="department-container">
        <el-tree
          ref="departmentTreeRef"
          class="filter-tree"
          :data="departmentData"
          :props="departmentTreeProps"
          :filter-node-method="filterDepartment"
        />
      </div>
    </div>
    <div class="post-container">部门岗位</div>
  </div>
</template>

<style scoped lang="postcss">
.position-component {
  @apply flex gap-3 h-full w-full;

  .filter-container {
    @apply rounded h-full w-full p-3;
    display: none;
    background-color: var(--el-bg-color);

    .input-container{
      @apply flex items-center gap-2;
      height: 32px;
    }

    .el-divider--horizontal{
      margin: 12px 0;
    }

    .department-container{
      @apply w-full overflow-auto;
      height: calc(100% - 32px - 24px);
    }
  }

  .post-container {
    @apply flex-1 rounded p-3;
    transition: transform 0.3s;
    background-color: var(--el-bg-color);
  }
}

@media (min-width: 768px) {
  .position-component {

    .filter-container{
      display: block;
      width: var(--os-layout-department-width);
      transition: transform 0.3s;
    }
    .post-container {
      width: calc(100% - var(--os-layout-department-width));
      transition: transform 0.3s;
    }
  }

}
</style>
