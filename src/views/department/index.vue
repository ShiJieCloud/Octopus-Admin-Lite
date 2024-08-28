<script setup lang="ts">

import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { getDepartmentListApi } from '@/api/interface/department'
import { useThemeStore } from '@/stores/modules/theme'
import { ElMessage } from 'element-plus'

const { themeConfig } = useThemeStore()

const searchForm = reactive({
  title: '',
  status: null,
  startDate: '',
  endDate: ''
})

// 搜索表单
const formContainerRef = ref<HTMLElement | null>(null)

const tableHeaderButRef = ref()

const departmentData = ref()

// 表格高度
const tableHeight = ref<number>(0)

// departmentDialogConfig
const departmentDialogConfig = reactive({
  isVisible: false,
  title: '新增部门',
  width: 700
})

const departmentForm = ref({
  id: null,
  name: '',
  parentId: null,
  sort: null,
  status: true,
  remark: ''
})

const handleOpenDepartmentDialog = (isAdd: boolean, department: any) => {
  departmentDialogConfig.isVisible = true
  if(isAdd) {
    departmentDialogConfig.title = '新增部门'
    departmentForm.value.parentId = department?.parentId
  } else {
    departmentDialogConfig.title = '编辑部门'
    departmentForm.value = Object.assign(department)
  }
}

// 获取部门数据
const getDepartmentData = async () => {
  departmentData.value = await getDepartmentListApi(searchForm)
}

// 调用API新增部门
const handleAddDepartment = () => {
  departmentDialogConfig.isVisible = false
  ElMessage({
    message: '新增成功',
    type: 'success'
  })
}

// 调用API修改部门
const handleUpdateDepartment = () => {
  departmentDialogConfig.isVisible = false
  ElMessage({
    message: '修改成功',
    type: 'success'
  })
}

const departmentCascaderConfig = {
  expandTrigger: 'hover',
  checkStrictly: true,
  label: 'name',
  value: 'id'
}

// 如果屏幕小于1024，tableHeight - formHeight - 100；否则tableHeight - formHeight - 345
const updateTableHeight = () => {

  if (formContainerRef.value) {
    const formHeight = formContainerRef.value.offsetHeight
    const headerButHeight = tableHeaderButRef.value.offsetHeight

    const middleScreen = window.innerWidth < 1024
    let padding = middleScreen ? 190 : 255
    if (!themeConfig.showTabs && !middleScreen) {
      padding -= 40
    }
    tableHeight.value = window.innerHeight - formHeight - headerButHeight - padding
  }
}

watch(formContainerRef, updateTableHeight)
watch(tableHeaderButRef, updateTableHeight)

watch(() => themeConfig.showTabs, updateTableHeight)

onMounted(() => {
  getDepartmentData()
})

onMounted(() => {
  getDepartmentData()
  updateTableHeight()
  window.addEventListener('resize', updateTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
})
</script>

<template>
  <div>
    <div class="space-y-3">
      <div ref="formContainerRef">
        <el-card class="search-from">
          <el-form :model="searchForm" label-width="auto" status-icon>
            <el-row :gutter="12">
              <el-col :xs="24" :sm="8" :lg="5">
                <el-form-item label="部门名称" prop="title">
                  <el-input placeholder="请输入部门名称" clearable v-model="searchForm.title" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :lg="5">
                <el-form-item label="状态" prop="name">
                  <el-select v-model="searchForm.status" placeholder="请输入部门状态">
                    <el-option label="启用" value="1" />
                    <el-option label="禁用" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8" :lg="14">
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
      <el-card>
        <template #header>
          <div ref="tableHeaderButRef">
            <el-space wrap>
              <el-button type="primary" plain @click="handleOpenDepartmentDialog(true,null)">
                <svg-icon size="18px" name="add" class="mr-1" />
                新增部门
              </el-button>
              <el-button type="danger" plain>
                <svg-icon size="18px" name="delete" class="mr-1" />
                批量删除
              </el-button>
              <el-button plain>
                <svg-icon size="18px" name="expand-fold" class="mr-1" />
                展开/折叠
              </el-button>
            </el-space>
          </div>
        </template>
        <el-table
          ref="menuTableRef"
          row-key="id"
          highlight-current-row
          :data="departmentData"
          table-layout="auto"
          :height="tableHeight"
        >
          <el-table-column type="selection" width="0" />
          <el-table-column fixed prop="name" width="200" label="部门名称" />
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
              <el-tag :type="scope.row.status ? 'success' : 'danger'">
                {{ scope.row.status ? '正常' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="180" header-align="center" align="center" />
          <el-table-column prop="remark" label="备注" min-width="200" header-align="center" show-overflow-tooltip />
          <el-table-column label="操作" width="230" header-align="center" align="center">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="handleOpenDepartmentDialog(false,scope.row)">
                <svg-icon size="16px" name="edit" class="mr-1" />
                查看详情
              </el-button>
              <el-button link size="small" type="primary" @click="handleOpenDepartmentDialog(true,scope.row)">
                <svg-icon size="16px" name="add" class="mr-1" />
                新增
              </el-button>
              <el-popconfirm
                title="确定要删除吗?"
              >
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
      </el-card>
    </div>
    <el-dialog
      v-model="departmentDialogConfig.isVisible"
      :title="departmentDialogConfig.title"
      :width="departmentDialogConfig.width"
    >
      <el-form
        :model="departmentForm"
        label-width="auto"
        status-icon
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
            v-model="departmentForm.parentId"
            :options="departmentData"
            :props="departmentCascaderConfig"
            placeholder="请选择上级部门"
            clearable
            filterable
            style="width: 100%"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="departmentForm.name" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="departmentForm.sort" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="部门状态" prop="status">
          <el-switch
            v-model="departmentForm.status"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="departmentForm.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="departmentDialogConfig.isVisible = false">取消</el-button>
          <el-button type="primary"
                     @click="departmentDialogConfig.title == '新增部门' ? handleAddDepartment() : handleUpdateDepartment()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
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