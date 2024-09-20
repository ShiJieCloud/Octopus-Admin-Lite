<script setup lang="ts">

import { reactive } from 'vue'
import { useUserStore } from '@/stores/modules/user'

const { setLoginMode } = useUserStore()

const resetPasswordForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  verifyCode: '',
  agreeTerms: false
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
      v-model="resetPasswordForm"
    >
      <el-form-item prop="username">
        <el-input placeholder="用户名" clearable v-model="resetPasswordForm.username">
          <template #prefix>
            <svg-icon name="user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input placeholder="手机号码" v-model="resetPasswordForm.phone">
          <template #prefix>
            <svg-icon name="phone" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <div class="flex justify-between gap-3">
          <el-input placeholder="短信验证码" maxlength="6" v-model="resetPasswordForm.verifyCode">
            <template #prefix>
              <svg-icon name="verify-code" />
            </template>
          </el-input>
          <el-button plain @click="getVerifyCode" :loading="sendVerifyCodeConfig.isLoading" :disabled="sendVerifyCodeConfig.isDisabled">
            {{sendVerifyCodeConfig.text}}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" show-password clearable v-model="resetPasswordForm.password">
          <template #prefix>
            <svg-icon name="password" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="确认密码" type="password" show-password clearable v-model="resetPasswordForm.confirmPassword">
          <template #prefix>
            <svg-icon name="password" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" type="primary" size="default">
          确认重置
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