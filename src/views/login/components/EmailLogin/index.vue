<script setup lang="ts">

import { reactive } from 'vue'
import { useLoginStore } from '@/stores/modules/login'

const { setLoginMode } = useLoginStore()

const emailLoginForm = reactive({
  email: '',
  verifyCode: ''
})

// 响应式数据
const sendVerifyCodeConfig = reactive({
  isLoading: false,
  text: '获取验证码',
  isDisabled: false,
  countdown: 0
})

// 发送验证码的方法
const getVerifyCode = () => {
  if (sendVerifyCodeConfig.countdown > 0) return // 如果倒计时还在进行中，则不执行

  sendVerifyCodeConfig.isLoading = true
  sendVerifyCodeConfig.isDisabled = true
  sendVerifyCodeConfig.text = '发送中...'

  startCountdown()

  sendVerifyCodeConfig.isLoading = false
}

// 启动倒计时的方法
const startCountdown = () => {
  sendVerifyCodeConfig.countdown = 60
  sendVerifyCodeConfig.text = `${sendVerifyCodeConfig.countdown}s后重新获取`

  const interval = setInterval(() => {
    sendVerifyCodeConfig.countdown--

    if (sendVerifyCodeConfig.countdown <= 0) {
      clearInterval(interval)
      sendVerifyCodeConfig.text = '获取验证码'
      sendVerifyCodeConfig.isDisabled = false
    } else {
      sendVerifyCodeConfig.text = `${sendVerifyCodeConfig.countdown}s后重新获取`
    }

  }, 1000)
}
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      label-width="auto"
      status-icon
      size="large"
      v-model="emailLoginForm"
    >
      <el-form-item prop="email">
        <el-input placeholder="邮箱" v-model="emailLoginForm.email">
          <template #prefix>
            <svg-icon name="email" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <div class="flex justify-between gap-3">
          <el-input placeholder="验证码" maxlength="6" v-model="emailLoginForm.verifyCode">
            <template #prefix>
              <svg-icon name="verify-code" />
            </template>
          </el-input>
          <el-button plain @click="getVerifyCode" :loading="sendVerifyCodeConfig.isLoading" :disabled="sendVerifyCodeConfig.isDisabled">
            {{sendVerifyCodeConfig.text}}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" type="primary" size="default">
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" plain size="default" @click="setLoginMode('classic')">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="postcss">

</style>