<script setup lang="ts">

import { reactive } from 'vue'
import { useLoginStore } from '@/stores/modules/login'
import { userLoginApi } from '@/api/interface/user'

const { setLoginMode } = useLoginStore()

const loginForm = reactive({
  username: 'zhangwei',
  password: '12345678',
  verifyCode: '123456',
  rememberMe: false
})

const handleLogin = async () => {
  const u = await userLoginApi(loginForm)
  console.log(u)
}

</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      label-width="auto"
      status-icon
      size="large"
      v-model="loginForm"
    >
      <el-form-item prop="username">
        <el-input placeholder="用户名:admin" clearable v-model="loginForm.username">
          <template #prefix>
            <svg-icon name="user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码:admin123" type="password" show-password clearable v-model="loginForm.password">
          <template #prefix>
            <svg-icon name="password" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode" class="mb-0">
        <div class="flex justify-between gap-3">
          <el-input placeholder="验证码:123456" maxlength="6" v-model="loginForm.verifyCode">
            <template #prefix>
              <svg-icon name="verify-code" />
            </template>
          </el-input>
          <el-button plain >
            图片验证码
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="flex items-center">
          <el-checkbox v-model="loginForm.rememberMe">
            <div class="flex items-center gap-1">
              <span>7天内免登录</span>
              <el-tooltip
                content="勾选并登录后，规定天数内无需输入用户名和密码会自动登入系统"
                placement="top"
              >
                <svg-icon size="14px" name="tips" />
              </el-tooltip>
            </div>
          </el-checkbox>

        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="w-full" type="primary" size="default" @click="handleLogin">
          登录
        </el-button>
        <div class="register-link">
          <el-link :underline="false" type="primary" href="/register">
            忘记密码?
          </el-link>
          <el-link class="text-md" :underline="false" type="primary" href="javascript:;" @click="setLoginMode('registration')">
            还没有账号？去注册
          </el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="postcss">
.register-link{
  display: flex;
  width: 100%;
  line-height: 2;
  justify-content: space-between;
}

</style>