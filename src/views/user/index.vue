<script setup lang="ts" name="User">

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
          :highlight-current="true"
          :data="departmentData"
          :props="departmentTreeProps"
          :filter-node-method="filterDepartment"
        />
      </div>
    </div>
    <div class="position-container">
      <div class="search-container" ref="formContainerRef">

      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.position-component {
  @apply flex gap-3 h-full w-full;

  .filter-container {
    @apply rounded h-full w-full p-3 shadow;
    display: none;
    background-color: var(--el-bg-color);

    .input-container {
      @apply flex items-center gap-2;
      height: 32px;
    }

    .el-divider--horizontal {
      margin: 12px 0;
    }

    .department-container {
      @apply w-full overflow-auto;
      height: calc(100% - 32px - 24px);
    }
  }

  .position-container {
    @apply w-full h-full space-y-3;

    .search-container {
      @apply rounded shadow;
      background-color: var(--el-bg-color);
    }

    .position-table-box {
      @apply rounded shadow;
      background-color: var(--el-bg-color);
    }
  }
}

:deep(.search-from .el-card__body) {
  padding-bottom: 0;
}

:deep(.el-card__footer) {
  padding: 0 12px 0 0;
}

@media (min-width: 768px) {
  .position-component {

    .filter-container {
      display: block;
      width: var(--os-layout-department-width);
      transition: transform 0.3s;
    }

    .position-container {
      width: calc(100% - var(--os-layout-department-width) - 12px);
      transition: transform 0.3s;
    }
  }

}
</style>