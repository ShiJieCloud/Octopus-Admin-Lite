<script setup lang="ts">
import PhoneLogin from './components/PhoneLogin/index.vue'
import ClassicLogin from './components/ClassicLogin/index.vue'
import EmailLogin from './components/EmailLogin/index.vue'
import QRCodeLogin from './components/QRCodeLogin/index.vue'
import Registration from './components/RegistrationForm/index.vue'
import ResetPassword from './components/ResetPassword/index.vue'
import UserAgreement from './components/UserAgreement/index.vue'
import { useUserStore } from '@/stores/modules/user'

import { computed } from 'vue'

const loginModeMap = {
  phone: PhoneLogin,
  classic: ClassicLogin,
  email: EmailLogin,
  qrCode: QRCodeLogin,
  registration: Registration,
  resetPassword: ResetPassword
}

const { loginConfig, setLoginMode } = useUserStore()

// 直接使用 loginMode 来创建计算属性
const mode = computed(() => loginModeMap[loginConfig.loginMode])

const app_title = import.meta.env.VITE_APP_TITLE
</script>
<template>
  <div class="login-container">
    <el-row class="w-full h-full">
      <el-col :xs="0" :sm="0" :md="14">
        <div class="w-full h-full bg-contain bg-center bg-[url('@/assets/images/login.svg')] bg-no-repeat" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="10">
        <div class="w-full h-full justify-center items-center flex">
          <div class="w-[360px] space-y-6">
            <div class="flex-col flex items-center justify-center space-y-3">
              <svg-icon size="48px" name="logo" />
              <span class="logo-title">{{ app_title }}</span>
            </div>
            <transition name="fade">
              <component :is="mode" />
            </transition>

            <div v-show="loginConfig.loginMode === 'classic'" class="flex items-center justify-between">
              <el-button @click="setLoginMode('phone')">手机登录</el-button>
              <el-button @click="setLoginMode('qrCode')">二维码登录</el-button>
              <el-button @click="setLoginMode('email')">邮箱登录</el-button>
            </div>

            <el-divider v-show="loginConfig.loginMode == 'classic'">
              <span class="text-xs text-gray-400">第三方登录</span>
            </el-divider>

            <div v-show="loginConfig.loginMode == 'classic'" class="flex items-center justify-between">
              <el-link :underline="false" href="/register">
                <svg-icon name="qq" />
              </el-link>
              <el-link :underline="false" href="/register">
                <svg-icon name="weixin" />
              </el-link>
              <el-link :underline="false" href="/register">
                <svg-icon name="github" />
              </el-link>
              <el-link :underline="false" href="/register">
                <svg-icon name="gitee" />
              </el-link>
              <el-link :underline="false" href="/register">
                <svg-icon name="gitcode" />
              </el-link>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <UserAgreement />
  </div>
</template>
<style scoped lang="postcss">
/* SCSS */
.login-container {
  @apply w-screen h-screen;

  .logo-title {
    @apply text-3xl font-bold subpixel-antialiased;
    @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500;
  }
}

/* 定义弹性向上移动的动画 */
@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 过渡类 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-active {
  transition: opacity 0s ease, transform 0s ease;
}

/* 自定义动画效果 */
.fade-enter-active {
  animation: slide-up 0.3s ease forwards;
}
</style>
