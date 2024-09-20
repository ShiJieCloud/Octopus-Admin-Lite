import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { userLoginApi } from '@/api/interface/user'
import router from '@/router'
import LocalStorageUtil from '@/utils/LocalStorage/LocalStorageUtil'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = reactive({
      token: LocalStorageUtil.getItem<string>('token') || ''
    })

    const loginConfig = reactive({
      loginMode: 'classic',
      isVisibleUserAgreement: false,
      isVisiblePrivacyPolicy: false,
      isLoading: false
    })

    // 设置登录模式
    const setLoginMode = (mode: string) => {
      loginConfig.loginMode = mode
    }

    const toggleVisibleUserAgreement = () => {
      loginConfig.isVisibleUserAgreement = !loginConfig.isVisibleUserAgreement
    }

    const toggleVisiblePrivacyPolicy = () => {
      loginConfig.isVisiblePrivacyPolicy = !loginConfig.isVisiblePrivacyPolicy
    }

    const loginByUsername = async (data: { username: string; password: string }) => {
      loginConfig.isLoading = true
      await userLoginApi(data)
        .then((data) => {
          userInfo.token = data.token
          LocalStorageUtil.setItem<string>('token', data.token)
          // 登录成功后跳转到命名路由 home
          router.push({ name: 'home' })
        })
        .catch((err) => {
          console.error('登录失败:', err.message)
        })
        .finally(
          () => {
            loginConfig.isLoading = false
          }
        )
    }

    return {
      userInfo,
      loginConfig,
      setLoginMode,
      toggleVisibleUserAgreement,
      toggleVisiblePrivacyPolicy,
      loginByUsername
    }
  },
  {
    persist: true
  }
)