<script setup lang="ts" name="Menu">

import { onMounted, reactive, ref } from 'vue'
import { getMenuListApi } from '@/api/interface/menu'
import { ElMessage } from 'element-plus'

// 搜索表单
const searchFormLoading = ref(false)
const searchForm = reactive({
  title: '',
  status: null,
  startDate: '',
  endDate: ''
})

// 重置搜索表单
const resetSearchForm = () => {
  searchForm.title = ''
  searchForm.status = null
  searchForm.startDate = ''
  searchForm.endDate = ''
}

// 禁用截止日期之前的所有日期
const startDateDisabledDate = (date: Date) => {
  const endDate = searchForm.endDate
  if (!endDate) return false
  return date.getTime() > new Date(endDate).getTime()
}

// 禁用起始日期之后的所有日期
const endDateDisabledDate = (date: Date) => {
  const startDate = searchForm.startDate
  if (!startDate) return false
  return date.getTime() < new Date(startDate).getTime()
}

// 菜单数据
const menuData = ref()

// 搜索菜单
const searchMenu = async () => {
  // 调用 getMenuListApi
  searchFormLoading.value=true
  menuData.value = await getMenuListApi(searchForm)
  searchFormLoading.value = false
}

onMounted(() => {
  searchMenu()
})

// 筛选菜单状态
const filterStatus = (value: number, row) => {
  console.log(value)
  console.log(row.status)
  return row.status === value
}

// 删除菜单
const handleDeleteMenu = (menuId: any) => {
  console.log(menuId)
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
}
</script>

<template>
  <div>
    <div class="space-y-3">
      <div ref="formContainerRef">
        <el-card class="search-from">
          <el-form :model="searchForm" label-width="auto" status-icon>
            <el-row :gutter="12">
              <el-col :xs="24" :sm="12" :lg="5">
                <el-form-item label="菜单名称" prop="title">
                  <el-input placeholder="请输入菜单名称" clearable v-model="searchForm.title" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="5">
                <el-form-item label="状态" prop="name">
                  <el-select v-model="searchForm.status" placeholder="请输入菜单状态">
                    <el-option label="正常" value="1" />
                    <el-option label="禁用" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="18" :lg="10">
                <el-form-item label="创建日期">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="起始日期"
                      style="width: 100%"
                      v-model="searchForm.startDate"
                      :disabled-date="startDateDisabledDate"
                    />
                  </el-col>
                  <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="截止日期"
                      style="width: 100%"
                      v-model="searchForm.endDate"
                      :disabled-date="endDateDisabledDate"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :lg="4">
                <el-form-item class="float-right">
                  <el-button type="primary" @click="searchMenu" :loading="searchFormLoading"> 查询 </el-button>
                  <el-button @click="resetSearchForm"> 重置 </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <el-card>
        <template #header>
          <div>
            <el-button type="primary" plain>新增菜单</el-button>
            <el-button type="danger" plain>批量删除</el-button>
            <el-button plain>展开/折叠</el-button>
          </div>
        </template>
        <el-table
          ref="menuTableRef"
          row-key="id"
          highlight-current-row
          :data="menuData"
          table-layout="auto"

        >
          <el-table-column type="selection" width="55" />
          <el-table-column fixed prop="title" label="菜单" />
          <el-table-column prop="icon" label="图标" min-width="100" header-align="center" align="center">
            <template #default="scope">
              <div class="w-full flex justify-center">
                <svg-icon :name="scope.row.icon"></svg-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            min-width="100"
            header-align="center"
            align="center"
            :filters="[
              { text: '正常', value: 1 },
              { text: '禁用', value: 0 }
            ]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
          >
            <template #default="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '正常' : '禁用'  }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" min-width="80" header-align="center" align="center" />
          <el-table-column prop="name" label="路由名称" min-width="150" />
          <el-table-column prop="path" label="路由地址" min-width="150" show-overflow-tooltip />
          <el-table-column prop="component" label="组件路径" min-width="150" show-overflow-tooltip />
          <el-table-column prop="createTime" label="创建时间" min-width="180" header-align="center" align="center" />
          <el-table-column label="操作" min-width="200" header-align="center" align="center" >
            <template #default="scope">
              <el-button link size="small" type="primary"> 修改 </el-button>
              <el-button link size="small" type="primary"> 新增 </el-button>
              <el-popconfirm
                title="确定要删除吗?"
                @confirm="handleDeleteMenu(scope.row.id)"
              >
                <template #reference>
                  <el-button link size="small" type="danger"> 删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>

          <template #empty>
            <div class="flex items-center justify-center h-100%">
              <el-empty />
            </div>
          </template>
        </el-table>
        <template #footer>

        </template>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="postcss">
:deep(.search-from .el-card__body) {
  padding-bottom: 0;
}

:deep(.el-card__footer) {
  padding: 0 12px 0 0;
}
</style>