<script setup lang="ts">

import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { UsernameLoginParams } from '@/api/interface/user/type'
import { FormInstance, FormRules } from 'element-plus'

const { loginConfig, setLoginMode, loginByUsername } = useUserStore()

const loginFormRef = ref<FormInstance>()

const loginForm = reactive<UsernameLoginParams>({
  username: 'zhangwei',
  password: '12345678',
  verificationCode: '123456',
  rememberMe: false
})

// 表单验证
const loginFormRules = reactive<FormRules<UsernameLoginParams>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  verificationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' }
  ]
})

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await loginFormRef.value.validate((valid) => {
    if (valid) {
      loginByUsername(loginForm)
    }
  })
}

</script>

<template>
  <div>
    <el-form
      ref="loginFormRef"
      label-width="auto"
      status-icon
      size="large"
      :model="loginForm"
      :rules="loginFormRules"
    >
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="用户名:admin"
          clearable
        >
          <template #prefix>
            <svg-icon name="user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="密码:12345678"
          type="password"
          show-password
          clearable
        >
          <template #prefix>
            <svg-icon name="password" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verificationCode" class="mb-2">
        <div class="flex justify-between gap-3">
          <el-input
            v-model="loginForm.verificationCode"
            placeholder="验证码:123456"
          >
            <template #prefix>
              <svg-icon name="verify-code" />
            </template>
          </el-input>
          <el-button plain>
            图片验证码
          </el-button>
        </div>
      </el-form-item>
      <el-form-item class="mb-2">
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
        <el-button class="w-full" type="primary" size="default" :loading="loginConfig.isLoading"
                   @click="handleLogin(loginFormRef)">
          登录
        </el-button>
        <div class="register-link">
          <el-link :underline="false" type="primary" href="javascript:;" @click="setLoginMode('resetPassword')">
            忘记密码?
          </el-link>
          <el-link class="text-md" :underline="false" type="primary" href="javascript:;"
                   @click="setLoginMode('registration')">
            还没有账号？去注册
          </el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="postcss">
.register-link {
  display: flex;
  width: 100%;
  line-height: 2;
  justify-content: space-between;
}

</style>