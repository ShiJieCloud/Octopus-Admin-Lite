<script setup lang="ts" name="Role">
import { useThemeStore } from '@/stores/modules/theme'
import { onMounted, reactive, ref, watch } from 'vue'
import { getRoleListApi } from '@/api/interface/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getMenuListApi } from '@/api/interface/menu'

const { themeConfig } = useThemeStore()

const searchForm = reactive({
  title: '',
  status: null,
  startDate: '',
  endDate: ''
})

const roleData = ref()

const menuData = ref()

// 搜索表单
const formContainerRef = ref<HTMLElement | null>(null)

const roleTableRef = ref()

// 表格高度
const tableHeight = ref<number>(0)

// 分页表单
const pageForm = reactive({
  pageNum: 1,
  pageSize: 10,
  currentPage: 1,
  total: 0
})

const roleDrawerConfig = reactive({
  visible: false,
  title: '',
  size: '500'
})

const roleForm = ref({
    id: null,
    name: '',
    permissionCode: '',
    sort: null,
    status: true,
    permissionList: '',
    remark: ''
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

const getMenuList = async () => {
  // 调用 getMenuListApi
  menuData.value = await getMenuListApi(searchForm)
}

// 重置搜索表单
const resetSearchForm = () => {
  searchForm.title = ''
  searchForm.status = null
  searchForm.startDate = ''
  searchForm.endDate = ''
}

// 重置roleDrawer.roleForm
const resetRoleForm = () => {
  roleForm.value.id = null
  roleForm.value.name = ''
  roleForm.value.permissionCode = ''
  roleForm.value.sort = null
  roleForm.value.status = true
  roleForm.value.permissionList = ''
  roleForm.value.remark = ''
  return true
}

// 新增角色
const addRole = () => {
  roleDrawerConfig.title = '新增角色'
  roleDrawerConfig.visible = true
  resetRoleForm()
}

// 修改角色
const handleUpdateRole = (row: any) => {
  roleDrawerConfig.title = '修改角色'
  roleDrawerConfig.visible = true
  Object.assign(roleForm.value, row)
}

// 删除角色
const handleDeleteRole = (roleId: number) => {
  // 调用删除接口
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
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

if (window.innerWidth < 678) {
  roleDrawerConfig.size = '100%'
} else {
  roleDrawerConfig.size = '500'
}

// 批量删除菜单
const batchDeleteRole = () => {
  const selectedRows = roleTableRef.value.getSelectionRows()
  if (selectedRows.length === 0) {
    ElMessage({
      message: '请选择要删除的菜单',
      type: 'warning'
    })
    return
  }
  ElMessageBox.confirm('确定要删除选中的角色吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 执行删除操作
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
  })
}

watch(formContainerRef, updateTableHeight)

watch(() => themeConfig.showTabs, updateTableHeight)

onMounted(() => {
  searchRole()
  getMenuList()
})
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
          <el-button type="primary" plain @click="addRole">
            <svg-icon size="18px" name="add" class="mr-1" />
            新增
          </el-button>
          <el-button type="danger" plain @click="batchDeleteRole">
            <svg-icon size="18px" name="delete" class="mr-1" />
            删除
          </el-button>
        </template>
        <el-table
          ref="roleTableRef"
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
              <el-button link size="small" type="primary" @click="handleUpdateRole(scope.row)">
                <svg-icon size="16px" name="edit" class="mr-1" />
                修改
              </el-button>
              <el-popconfirm title="确定要删除吗?" @confirm="handleDeleteRole(scope.row.id)">
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
    <el-drawer v-model="roleDrawerConfig.visible" :close="resetRoleForm" :size="roleDrawerConfig.size">
      <template #header>
        <h4>{{ roleDrawerConfig.title }}</h4>
      </template>
      <template #default>
        <el-form :model="roleForm" label-width="auto">
          <el-form-item label="角色名称">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="权限字符">
            <el-input v-model="roleForm.permissionCode" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="roleForm.sort" :min="1" :max="10" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch v-model="roleForm.status" />
          </el-form-item>
          <el-form-item label="菜单权限" prop="permissionList">
            <el-tree
              ref="treeRef"
              style="max-width: 600px"
              :data="menuData"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              class="w-full"
            >
              <template #default="{ data }">
                <div class="flex items-center gap-1">
                  <svg-icon size="16px" :name="data.icon" />
                  <span>{{ data.title }}</span>
                </div>
              </template>
            </el-tree>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="roleForm.remark" type="textarea" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="roleDrawerConfig.visible = !roleDrawerConfig.visible">取消</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </template>
    </el-drawer>
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