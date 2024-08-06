import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ThemeConfig } from './types'

// theme store
export const useThemeStore = defineStore(
  'theme',
  () => {
    const themeConfig = reactive<ThemeConfig>({
      showThemeConfig: false,
      mode: 'light',
      layoutMode: 'classic'
    })

    // 切换显示状态的方法
    const toggleThemeConfig = () => {
      console.log(themeConfig.showThemeConfig)
      themeConfig.showThemeConfig = !themeConfig.showThemeConfig
    }

    return {
      themeConfig,
      toggleThemeConfig
    }
  },
  {
    persist: true
  })