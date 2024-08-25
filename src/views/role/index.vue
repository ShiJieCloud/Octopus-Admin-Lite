<script setup lang="ts" name="Role">
import { useThemeStore } from '@/stores/modules/theme'
import { reactive, ref, watch } from 'vue'
import { getRoleListApi } from '@/api/interface/role'

const { themeConfig } = useThemeStore()

const searchForm = reactive({
  title: '',
  status: null,
  startDate: '',
  endDate: ''
})

const roleData = ref()

// 搜索表单
const formContainerRef = ref<HTMLElement | null>(null)

// 表格高度
const tableHeight = ref<number>(0)

// 分页表单
const pageForm = reactive({
  pageNum: 1,
  pageSize: 10,
  currentPage: 1,
  total: 0
})

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

// 搜索菜单
const searchRole = async () => {
  // 调用 getMenuListApi
  roleData.value = await getRoleListApi(searchForm)
  pageForm.total = roleData.value.length
}

// 重置搜索表单
const resetSearchForm = () => {
  searchForm.title = ''
  searchForm.status = null
  searchForm.startDate = ''
  searchForm.endDate = ''
}

// 如果屏幕小于1024，tableHeight - formHeight - 100；否则tableHeight - formHeight - 345
const updateTableHeight = () => {
  if (formContainerRef.value) {
    const formHeight = formContainerRef.value.offsetHeight
    const middleScreen = window.innerWidth < 1024
    let padding = middleScreen ? 285 : 350
    if (!themeConfig.showTabs && !middleScreen) {
      padding -= 40
    }
    tableHeight.value = window.innerHeight - formHeight - padding
  }
}

watch(formContainerRef, updateTableHeight)

watch(() => themeConfig.showTabs, updateTableHeight)

</script>

<template>
  <div>
    <div class="space-y-3">
      <div ref="formContainerRef">
        <el-card class="search-from">
          <el-form :model="searchForm" label-width="auto" status-icon>
            <el-row :gutter="12">
              <el-col :xs="24" :sm="12" :lg="5">
                <el-form-item label="角色名称" prop="title">
                  <el-input placeholder="请输入角色名称" clearable v-model="searchForm.title" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="5">
                <el-form-item label="状态" prop="name">
                  <el-select v-model="searchForm.status" placeholder="请输入角色状态">
                    <el-option label="正常" value="1" />
                    <el-option label="禁用" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="16" :lg="9">
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
              <el-col :xs="24" :sm="8" :lg="5">
                <el-form-item class="float-right">
                  <el-space>
                    <el-button type="primary" @click="searchRole">
                      <svg-icon name="Search" class="mr-1" />
                      查询
                    </el-button>
                    <el-button @click="resetSearchForm">
                      <svg-icon name="reset" class="mr-1" />
                      重置
                    </el-button>
                  </el-space>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <el-card>
        <template #header>
            <el-button type="primary" plain>
              <svg-icon size="18px" name="add" class="mr-1" />
              新增
            </el-button>
            <el-button type="danger" plain>
              <svg-icon size="18px" name="delete" class="mr-1" />
              删除
            </el-button>
        </template>
        <el-table
          ref="menuTableRef"
          row-key="id"
          highlight-current-row
          :data="roleData"
          :height="tableHeight"
          table-layout="auto"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column fixed prop="name" label="角色名称" />
          <el-table-column prop="permissionCode" label="权限字符" />
          <el-table-column prop="sort" label="排序" min-width="80" header-align="center" align="center" />
          <el-table-column
            prop="status"
            label="状态"
            min-width="100"
            header-align="center"
            align="center"
            filter-placement="bottom-end"
          >
            <template #default="scope">
              <el-switch v-model="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="180" header-align="center" align="center" />
          <el-table-column prop="updateTime" label="修改时间" min-width="180" header-align="center" align="center" />
          <el-table-column label="操作" min-width="200" header-align="center" align="center">
            <template #default="scope">
              <el-button link size="small" type="primary" >
                <svg-icon size="16px" name="edit" class="mr-1" />
                修改
              </el-button>
              <el-popconfirm title="确定要删除吗?" >
                <template #reference>
                  <el-button link size="small" type="danger">
                    <svg-icon size="16px" name="delete" class="mr-1" />
                    删除
                  </el-button>
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
          <Pagination
            :page="pageForm.currentPage"
            :size="pageForm.pageSize"
            :total="pageForm.total"
          />
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