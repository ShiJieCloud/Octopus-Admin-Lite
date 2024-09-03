<script setup lang="ts" name="User">

import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { getDepartmentListApi } from '@/api/interface/department'
import { useThemeStore } from '@/stores/modules/theme'
import { getUserListApi } from '@/api/interface/user'
import { getRoleListApi } from '@/api/interface/role'

const { themeConfig } = useThemeStore()

const filterDepartmentText = ref()

const departmentTreeRef = ref()

const departmentData = ref()

const roleData = ref()

const departmentTreeProps = {
  children: 'children',
  label: 'name',
  value: 'id'
}

const queryUserForm = reactive({
  departmentId: '',
  name: '',
  code: '',
  status: null,
  createDate: ''
})

// 表格高度
const tableHeight = ref<number>(0)

const formContainerRef = ref<HTMLElement | null>(null)

const tableHeaderButRef = ref()

const userData = ref()

// 分页表单
const pageForm = reactive({
  pageNum: 1,
  pageSize: 10,
  currentPage: 1,
  total: 0
})

const userDialogConfig = reactive({
  visible: false,
  title: '新增用户',
  width: 600
})

const defaultUserForm = {
  id: null,
  name: '',
  phone: '',
  email: '',
  avatar: '',
  gender: null,
  departmentId: null,
  positionId: null,
  roles: [],
  status: true,
  remark: ''
}

const userForm = ref({ ...defaultUserForm })

// 重置表单的方法
const resetUserForm = () => {
  userForm.value = { ...defaultUserForm }
}

// 处理对话框关闭事件
const handleBeforeClose = (done) => {
  resetUserForm()
  done()
}

const handleAddUser = () => {
  userDialogConfig.visible = true
  userDialogConfig.title = '新增用户'
}

const handleUpdateUser = (row: any) => {
  userForm.value = { ...row }
  userDialogConfig.visible = true
  userDialogConfig.title = '编辑用户'
}

const getUserData = async () => {
  userData.value = await getUserListApi()
}

const getRoleData = async () => {
  roleData.value = await getRoleListApi(filterDepartmentText)
  console.log(roleData.value)
}

// 获取部门数据
const getDepartmentData = async () => {
  departmentData.value = await getDepartmentListApi(filterDepartmentText)
}

const filterDepartment = (value: string, data: any) => {
  if (!value) return true
  return data.name.includes(value)
}

if (window.innerWidth < 678) {
  userDialogConfig.width = 350
} else {
  userDialogConfig.width = 600
}

// 如果屏幕小于1024，tableHeight - formHeight - 100；否则tableHeight - formHeight - 345
const updateTableHeight = () => {

  if (formContainerRef.value) {
    const formHeight = formContainerRef.value.offsetHeight
    const headerButHeight = tableHeaderButRef.value.offsetHeight

    const middleScreen = window.innerWidth < 1024
    let padding = middleScreen ? 250 : 315
    if (!themeConfig.showTabs && !middleScreen) {
      padding -= 40
    }
    tableHeight.value = window.innerHeight - formHeight - headerButHeight - padding
  }
}

watch(() => filterDepartmentText.value, (val) => {
  departmentTreeRef.value!.filter(val)
})

watch(formContainerRef, updateTableHeight)
watch(tableHeaderButRef, updateTableHeight)

watch(() => themeConfig.showTabs, updateTableHeight)

onMounted(() => {
  getRoleData()
  getUserData()
  getDepartmentData()
  updateTableHeight()
  window.addEventListener('resize', updateTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
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
        <el-card class="search-from" shadow="never">
          <el-form :model="queryUserForm" label-width="auto" status-icon>
            <el-row :gutter="12">
              <el-col :xs="24" :sm="12" :lg="8" :xl="5">
                <el-form-item label="用户名称" prop="name">
                  <el-input placeholder="请输入用户名称" clearable v-model="queryUserForm.name" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="8" :xl="5">
                <el-form-item label="用户状态" prop="name">
                  <el-select v-model="queryUserForm.status" placeholder="请输入用户状态">
                    <el-option label="启用" value="true" />
                    <el-option label="禁用" value="false" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8" :xl="14">
                <el-form-item class="float-right">
                  <el-space>
                    <el-button type="primary">
                      <svg-icon name="Search" class="mr-1" />
                      查询
                    </el-button>
                    <el-button>
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
      <div class="table-box">
        <el-card shadow="never">
          <template #header>
            <div ref="tableHeaderButRef">
              <el-space wrap>
                <el-button type="primary" plain @click="handleAddUser">
                  <svg-icon size="18px" name="add" class="mr-1" />
                  新增
                </el-button>
                <el-button type="danger" plain>
                  <svg-icon size="18px" name="delete" class="mr-1" />
                  删除
                </el-button>
              </el-space>
            </div>
          </template>
          <el-table
            ref="departmentTableRef"
            row-key="id"
            highlight-current-row
            :data="userData"
            table-layout="auto"
            :height="tableHeight"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="name" width="120" label="用户" />
            <el-table-column prop="avatar" width="100" class-name="item-center" label="头像">
              <template #default="scope">
                <div class="flex items-center w-7 h-7 rounded-full overflow-hidden">
                  <el-image :src="scope.row.avatar" preview-teleported :preview-src-list="[scope.row.avatar]" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gender" width="100" label="性别">
              <template #default="scope">
                <el-tag v-if="scope.row.gender != null" type="primary">{{ scope.row.gender == 1 ? '男' : '女' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="phone" width="150" label="手机号码" />
            <el-table-column prop="email" width="250" label="邮箱" />
            <el-table-column
              prop="status"
              label="状态"
              width="100"
              header-align="center"
              align="center"
              filter-placement="bottom-end"
            >
              <template #default="scope">
                <el-switch
                  v-model="scope.row.status"
                  inline-prompt
                  active-text="启用"
                  inactive-text="禁用"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                />
              </template>
            </el-table-column>
            <el-table-column prop="createTime" show-overflow-tooltip label="注册时间" min-width="150" header-align="center" align="center" />
            <el-table-column label="操作" fixed="right" width="180" header-align="center" align="center">
              <template #default="scope">
                <div class="flex items-center gap-3">
                  <div>
                    <el-button link size="small" type="primary" @click="handleUpdateUser(scope.row)">
                      <svg-icon size="16px" name="edit" class="mr-1" />
                      修改
                    </el-button>
                  </div>
                  <el-popconfirm
                    title="确定要删除吗?"
                  >
                    <template #reference>
                      <el-button link size="small" type="danger">
                        <svg-icon size="16px" name="delete" class="mr-1 ml-0" />
                        删除
                      </el-button>
                    </template>
                  </el-popconfirm>
                  <el-dropdown>
                    <svg-icon size="16px" name="more" />
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>上传头像</el-dropdown-item>
                        <el-dropdown-item>重置密码</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
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
    <el-dialog
      v-model="userDialogConfig.visible"
      :title="userDialogConfig.title"
      :width="userDialogConfig.width"
      :before-close="handleBeforeClose"
    >
      <div>
        <el-form :model="userForm" label-width="auto">
          <el-row :gutter="12">
            <el-col :xs="24" :sm="12">
              <el-form-item label="用户名">
                <el-input v-model="userForm.name" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="手机号码">
                <el-input v-model="userForm.phone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :xs="24" :sm="12">
              <el-form-item label="邮箱">
                <el-input v-model="userForm.email" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="性别">
                <el-radio-group v-model="userForm.gender">
                  <el-radio :value="1">男</el-radio>
                  <el-radio :value="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="所属部门">
            <el-tree-select
              v-model="userForm.departmentId"
              :highlight-current="true"
              :data="departmentData"
              :props="departmentTreeProps"
              :render-after-expand="false"
            />
          </el-form-item>
          <el-form-item label="角色权限">
            <el-select
              v-model="userForm.roles"
              placeholder="请选择角色"
              clearable
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="3"
            >
              <el-option
                v-for="item in roleData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="userForm.remark" type="textarea" />
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="userForm.status" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="userDialogConfig.visible = false">取消</el-button>
          <el-button type="primary" @click="userDialogConfig.visible = false"> 确认</el-button>
        </div>
      </template>
    </el-dialog>
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

:deep(.el-form-item__content) {
  @apply flex;
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