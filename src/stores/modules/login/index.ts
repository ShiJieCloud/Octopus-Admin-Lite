import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore(
  'login',
  () => {

    // 登录模式
    const loginMode = ref('classic')

    // 设置登录模式
    const setLoginMode = (mode: string) => {
      loginMode.value = mode
    }

    return {
      loginMode,
      setLoginMode
    }
  },
  {
    persist: true
  }
)