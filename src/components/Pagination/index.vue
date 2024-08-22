<template>
  <div class="pagination-container">
    <el-pagination
      :small="small"
      :background="background"
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      :layout="layout"
      :pager-count="pagerCount"
      :total="total"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, onUnmounted, ref } from 'vue'

const emits = defineEmits(['pageChange', 'update:page', 'update:size'])

//计算属性-currentPage
const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emits('update:page', val)
  }
})
// const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

//计算属性-pageSize
const pageSize = computed({
  get() {
    return props.size
  },
  set(val) {
    emits('update:size', val)
  }
})

//组件参数
const props = defineProps({
  //当前页数
  page: {
    type: Number,
    default: 1
  },
  //每页条数
  size: {
    type: Number,
    default: 10
  },
  //是否使用小型分页样式
  small: {
    type: Boolean,
    default: false
  },
  //是否为分页按钮添加背景色
  background: {
    type: Boolean,
    default: true
  },
  //组件布局，子组件名用逗号分隔
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  //设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
  pagerCount: {
    type: Number,
    default: 5
  },
  //总条目数
  total: {
    type: Number,
    required: true
  },
  //每页显示个数选择器的选项设置
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  //class悬浮样式(left / right)
  float: {
    type: String,
    default: 'right'
  }
})

//每页显示条数改变
const handleSizeChange = (size: number) => {
  emits('update:size', size)
  emits('pageChange')
}

//页数改变
const handleCurrentChange = (page: number) => {
  emits('update:page', page)
  emits('pageChange')
}

// 监听屏幕变化适应组件
const isSmallScreen = ref(false)

const layout = computed(() => {
  return isSmallScreen.value ? 'prev, pager, next' : props.layout
})

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<style lang="scss" scoped>
.pagination-container {
  float: right; // 默认值
  margin: 15px 0;
  background-color: #ffffff;

  // 若需动态绑定 float
  &.float-left {
    float: left;
  }
  &.float-right {
    float: right;
  }
}
</style>