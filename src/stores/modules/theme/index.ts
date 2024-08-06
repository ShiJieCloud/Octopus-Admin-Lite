import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { ThemeConfig } from './types'
import { ElMessage } from 'element-plus'
import { getDarkColor, getLightColor } from '@/utils/Color'

// theme store
export const useThemeStore = defineStore(
  'theme',
  () => {
    const themeConfig = reactive<ThemeConfig>({
      showThemeConfig: false,
      darkThemeEnabled: false,
      layoutMode: 'classic',
      themePrimaryColor: '#409eff',
      predefineColors: ['#409eff']
    })

    // 切换显示状态的方法
    const toggleThemeConfig = () => {
      themeConfig.showThemeConfig = !themeConfig.showThemeConfig
    }

    // 黑暗主题切换
    watch(() => themeConfig.darkThemeEnabled, () => {
      const html = document.documentElement as HTMLElement
      if (themeConfig.darkThemeEnabled) {
        html.setAttribute('class', 'dark')
      } else {
        html.removeAttribute('class')
      }
      changeThemeColor(themeConfig.themePrimaryColor)
    })

    // 添加预定义颜色
    function addPredefineColor(color) {
      console.log('color', color)
      const predefineColors = themeConfig.predefineColors
      // 查找元素的索引
      const index = predefineColors.indexOf(color)

      if (index !== -1) {
        // 使用 splice 方法删除该元素
        predefineColors.splice(index, 1)
      }
      if (themeConfig.predefineColors.length === 10) {
        themeConfig.predefineColors.pop() // 删除队列中的第一个元素
      }
      themeConfig.predefineColors.unshift(color)
    }

    // 修改主题颜色
    const changeThemeColor = (color) => {
      if (!color) {
        color = '#409eff'
        ElMessage({ type: 'success', message: `主题颜色已重置为 ${color}` })
      }
      themeConfig.themePrimaryColor = color
      addPredefineColor(color)
      // 计算主题颜色变化
      document.documentElement.style.setProperty('--el-color-primary', color)
      document.documentElement.style.setProperty(
        '--el-color-primary-dark-2',
        themeConfig.darkThemeEnabled ? `${getLightColor(color, 0.2)}` : `${getDarkColor(color, 0.3)}`
      )
      for (let i = 1; i <= 9; i++) {
        const primaryColor = themeConfig.darkThemeEnabled ? `${getDarkColor(color, i / 10)}` : `${getLightColor(color, i / 10)}`
        document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
      }
    }

    return {
      themeConfig,
      toggleThemeConfig,
      changeThemeColor
    }
  },
  {
    persist: true
  })