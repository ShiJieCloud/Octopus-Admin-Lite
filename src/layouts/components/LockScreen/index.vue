<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme'
import { ElMessage } from 'element-plus'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { DateUtils } from '@/utils/date/DateUtils'

const { themeConfig, toggleLockScreen } = useThemeStore()

const lockPassword = ref()

const clock = reactive({
  today: '',
  weekday: '',
  time: ''
})

const getClock = () => {
  clock.today = DateUtils.getToday()
  clock.weekday = DateUtils.getWeekday()
  clock.time = DateUtils.getCurrentTime()
}

// 定时器引用
const timer = ref<number>()

// 定时器：每秒钟更新一次时间状态
onMounted(() => {
  getClock()
  timer.value = setInterval(getClock, 1000) as any
})

// 在组件销毁前清除定时器，避免内存泄漏
onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const passwordInput = ref(false)

const showInput = () => {
  passwordInput.value = !passwordInput.value
}

const checkPassword = (e) => {
  // 阻止表单默认提交行为
  e.preventDefault()
  if (lockPassword.value === '123456') {
    toggleLockScreen()
    ElMessage({
      message: '解锁成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '解锁失败，请重试',
      type: 'error'
    })
  }
  lockPassword.value = ''
}
</script>

<template>
    <div
      v-if="themeConfig.lockScreen"
      class="lock-screen"
      :class="{ 'lockScreen--inputVisible': passwordInput }"
    >
      <div class="w-full h-full flex flex-col items-center">
        <!-- 时间显示 -->
        <div class="clock-container text-center flex flex-col select-none" @click="showInput">
          <div class="time">
            <!-- 时间 -->
            <span>{{ clock.time }}</span>
          </div>
          <div class="space-x-5">
            <!-- 日期 -->
            <span>{{ clock.today }}</span>
            <!-- 星期 -->
            <span>{{ clock.weekday }}</span>
          </div>
        </div>

        <!-- 输入框 -->
        <el-form v-model="lockPassword" @submit.prevent class="max-w-[200px] input-container">
          <el-input
            class="blur-input"
            v-model="lockPassword"
            type="password"
            placeholder="请输入锁屏密码"
            @keyup.enter="checkPassword"
          />
        </el-form>
      </div>
    </div>
</template>

<style scoped lang="scss">

.lock-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* 半透明的深灰色背景 */
  backdrop-filter: blur(8px); /* 模糊背景 */
  z-index: 999; /* 确保在顶层显示 */
  display: block; /* 初始状态隐藏 */

  .clock-container {
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: 2px;
    transition: all 0.5s ease;
    margin-top: 10%;

    .time {
      font-size: 6rem; /* Assuming you meant text-6xl for font size */
      letter-spacing: 10px;
      text-shadow:
        0 0 20px var(--el-color-primary),
        0 0 10px rgba(0, 0, 0, 0.5);
      height: 120px;
    }
  }

  .input-container {
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
    opacity: 0;
    transform: translateY(50%);
  }

  &.lockScreen--inputVisible .clock-container {
    transform: translateY(-50%);
  }

  &.lockScreen--inputVisible .input-container {
    opacity: 1;
    transform: translateY(-100%);
  }
}
</style>