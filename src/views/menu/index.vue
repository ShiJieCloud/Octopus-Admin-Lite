<script setup lang="ts" name="Menu">

import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { getMenuListApi } from '@/api/interface/menu'
import { ElMessage } from 'element-plus'
import { useThemeStore } from '@/stores/modules/theme'

const { themeConfig } = useThemeStore()

// 菜单数据
const menuData = ref()

// 搜索表单
const formContainerRef = ref<HTMLElement | null>(null)

const searchForm = reactive({
  title: '',
  status: null,
  startDate: '',
  endDate: ''
})

// 表格高度
const tableHeight = ref<number>(0)

// 分页表单
const pageForm = reactive({
  pageNum: 1,
  pageSize: 10,
  currentPage: 1,
  total: 0
})

// 菜单表单
const menuDialog = reactive({
  visible: false,
  width: 600,
  title: '添加菜单',
  menuForm: {
    id: null,
    parentId: null,
    title: '',
    type: 0,
    name: '',
    icon: '',
    sort: 1,
    route: '',
    component: '',
    isLink: false,
    status: true
  }
})

// icon
const iconData = ref([])

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

// 搜索菜单
const searchMenu = async () => {
  // 调用 getMenuListApi
  menuData.value = await getMenuListApi(searchForm)
  pageForm.total = menuData.value.length
}

// 删除菜单
const handleDeleteMenu = (menuId: any) => {
  console.log(menuId)
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

watch(formContainerRef, updateTableHeight)

watch(() => themeConfig.showTabs, updateTableHeight)

// 切换页
const handleUpdatePage = (pageNum: number) => {
  pageForm.pageNum = pageNum
  pageForm.currentPage = pageNum
}

// 修改页大小
const handleUpdatePageSize = (size: number) => {
  pageForm.pageSize = size
}

// 重置菜单表单
const resetMenuDialogForm = () => {
  menuDialog.menuForm = {
    id: null,
    parentId: null,
    title: '',
    type: 0,
    name: '',
    icon: '',
    sort: 1,
    route: '',
    component: '',
    isLink: false,
    status: true
  }
}

// 添加菜单
const addMenu = (menuId: any) => {
  menuDialog.title = '新增菜单'
  menuDialog.visible = true
  menuDialog.menuForm.parentId = menuId
}

// 修改菜单
const updateMenu = (menu: any) => {
  menuDialog.title = '修改菜单'
  menuDialog.visible = true
  menuDialog.menuForm = { ...menu }
}

// 取消
const handleCancel = () => {
  resetMenuDialogForm()
  menuDialog.visible = false
}

// 调用新增/修改API
const handleAddOrUpdateMenu = () => {
  console.log(menuDialog.menuForm)
  menuDialog.visible = false
}

// 生成Icon
iconData.value = Array.from({ length: 1 }).map(() => ({
  id: 1,
  value: 'about',
  label: 'About'
}))

// 递归转换函数
const transformMenuData = (items) => {
  return items.map(item => ({
    id: item.id,
    label: item.title,
    value: item.id,
    icon: item.icon,
    children: item.children ? transformMenuData(item.children) : [] // 递归处理子项
  }))
}

// 转换计算属性
const selectMenuData = computed(() => {
  // 主根节点
  const root = {
    id: 0,
    label: '主根目',
    value: 0,
    icon: 'user',
    children: transformMenuData(menuData.value) // 递归处理子项
  }

  return [root] // 返回一个包含主根节点的数组
})

const findItemById = (items, id) => {
  return items.find(item => item.id === id) || items.flatMap(item => findItemById(item.children, id)).find(Boolean)
}

if (window.innerWidth < 678) {
  menuDialog.width = 350
} else {
  menuDialog.width = 600
}

onMounted(() => {
  searchMenu()
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
                    <el-button type="primary" @click="searchMenu">
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
          <el-space wrap>
            <el-button type="primary" plain @click="addMenu(null)">
              <svg-icon size="18px" name="add" class="mr-1" />
              新增菜单
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
        </template>
        <el-table
          ref="menuTableRef"
          row-key="id"
          highlight-current-row
          :data="menuData"
          table-layout="auto"
          :height="tableHeight"
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
            filter-placement="bottom-end"
          >
            <template #default="scope">
              <el-tag :type="scope.row.status ? 'success' : 'danger'">
                {{ scope.row.status ? '正常' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" min-width="80" header-align="center" align="center" />
          <el-table-column prop="name" label="路由名称" min-width="150" />
          <el-table-column prop="path" label="路由地址" min-width="150" show-overflow-tooltip />
          <el-table-column prop="component" label="组件路径" min-width="150" show-overflow-tooltip />
          <el-table-column prop="createTime" label="创建时间" min-width="180" header-align="center" align="center" />
          <el-table-column label="操作" min-width="200" header-align="center" align="center">
            <template #default="scope">
              <el-button link size="small" type="primary" @click="updateMenu(scope.row)">
                <svg-icon size="16px" name="edit" class="mr-1" />
                查看详情
              </el-button>
              <el-button link size="small" type="primary" @click="addMenu(scope.row.id)">
                <svg-icon size="16px" name="add" class="mr-1" />
                新增
              </el-button>
              <el-popconfirm
                title="确定要删除吗?"
                @confirm="handleDeleteMenu(scope.row.id)"
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
        <template #footer>
          <Pagination
            :page="pageForm.currentPage"
            :size="pageForm.pageSize"
            :total="pageForm.total"
            @update:page="handleUpdatePage"
            @update:size="handleUpdatePageSize"
          />
        </template>
      </el-card>
    </div>
    <el-dialog
      v-model="menuDialog.visible"
      :title="menuDialog.title"
      :width="menuDialog.width"
      @close="handleCancel"
    >
      <el-form
        ref="ruleFormRef"
        :model="menuDialog.menuForm"
        label-width="auto"
        status-icon
      >
        <el-form-item label="上级菜单" prop="parentId">
          <el-tree-select
            v-model="menuDialog.menuForm.parentId"
            :data="selectMenuData"
            node-key="id"
            :clearable="true"
            placeholder="选择上级菜单"
            :render-after-expand="false"
            :fit-input-width="true"
            :check-strictly="true"
          >
            <template #label="{ label,value }">
              <div class="flex items-center gap-1">
                <svg-icon size="16px" :name="findItemById(selectMenuData,value).icon" />
                <span>{{ label }}</span>
              </div>
            </template>
            <template #default="{ data }">
              <div class="flex items-center gap-1">
                <svg-icon size="16px" :name="data.icon" />
                <span>{{ data.label }}</span>
              </div>
            </template>
            <template #empty>
              <el-empty />
            </template>
          </el-tree-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="menuDialog.menuForm.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="menuDialog.menuForm.type">
            <el-radio :value="0">目录</el-radio>
            <el-radio :value="1">菜单</el-radio>
            <el-radio :value="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="menuDialog.menuForm.type != 2" label="菜单图标" prop="icon">
          <el-select v-model="menuDialog.menuForm.icon" placeholder="点击选择图标">
            <el-option
              v-for="item in iconData"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
              <div class="flex items-center gap-1">
                <svg-icon width="16" height="16" :name="item.value" />
                <span>{{ item.label }}</span>
              </div>
            </el-option>
            <template #label="{ label, value }">
              <div class="flex items-center gap-1">
                <svg-icon width="16" height="16" :name="value" />
                <span>{{ label }}</span>
              </div>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="显示排序" prop="sort">
          <el-input-number
            v-model="menuDialog.menuForm.sort"
            controls-position="right"
            :min="1"
            :max="10"
          />
        </el-form-item>
        <el-form-item v-show="menuDialog.menuForm.type != 2" prop="name">
          <template #label>
            <el-tooltip placement="top">
              <div class="flex items-center gap-1">
                <svg-icon width="16" height="16" name="about" />
                <span>路由名称</span>
              </div>
              <template #content>
                访问的路由名称
              </template>
            </el-tooltip>
          </template>
          <el-input v-model="menuDialog.menuForm.name" />
        </el-form-item>
        <el-form-item v-show="menuDialog.menuForm.type != 2" prop="route">
          <template #label>
            <el-tooltip placement="top">
              <div class="flex items-center gap-1">
                <svg-icon width="16" height="16" name="about" />
                <span>路由地址</span>
              </div>
              <template #content>
                访问的路由地址，如：
                <el-text type="primary">user</el-text>
                ，如外链地址需要以
                <el-text type="primary">http(s)://</el-text>
                开头
              </template>
            </el-tooltip>
          </template>
          <el-input v-model="menuDialog.menuForm.route" autocomplete="off" />
        </el-form-item>
        <el-form-item v-show="menuDialog.menuForm.type == 1" prop="component">
          <template #label>
            <el-tooltip placement="top">
              <div class="flex items-center gap-1">
                <svg-icon width="16" height="16" name="about" />
                <span>组件路径</span>
              </div>
              <template #content>
                组件路径，如（
                <el-text type="primary">/user/index</el-text>
                ）
              </template>
            </el-tooltip>
          </template>
          <el-input v-model="menuDialog.menuForm.component" />
        </el-form-item>
        <el-form-item v-show="menuDialog.menuForm.type != 2" prop="link">
          <template #label>
            <el-tooltip placement="top">
              <div class="flex items-center gap-1">
                <svg-icon width="16" height="16" name="about" />
                <span>是否外链</span>
              </div>
              <template #content>
                外链的路由地址需要以
                <el-text type="primary">http(s)://</el-text>
                开头
              </template>
            </el-tooltip>
          </template>
          <el-radio-group v-model="menuDialog.menuForm.isLink">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="status">
          <template #label>
            <el-tooltip placement="top">
              <div class="flex items-center gap-1">
                <svg-icon width="16" height="16" name="about" />
                <span>菜单状态</span>
              </div>
              <template #content>
                <el-text type="danger">禁用</el-text>
                菜单无法访问
              </template>
            </el-tooltip>
          </template>
          <el-switch
            v-model="menuDialog.menuForm.status"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="正常"
            inactive-text="禁用"
            inline-prompt
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleAddOrUpdateMenu">确认</el-button>
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