import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { userLoginApi } from '@/api/interface/user'
import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    const userToken = ref()
    // 用户信息
    const userInfo = ref()

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
          userInfo.value = data.userInfo
          userToken.value = data.token
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

    // 退出登录
    const logout = () => {
      userInfo.value = null
      userToken.value = null
      // 跳转到登录页
      router.push({ name: 'login' })
    }

    return {
      userToken,
      userInfo,
      loginConfig,
      setLoginMode,
      toggleVisibleUserAgreement,
      toggleVisiblePrivacyPolicy,
      loginByUsername,
      logout
    }
  },
  {
    persist: true
  }
)