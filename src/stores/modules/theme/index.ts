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
      showTheme: false,
      darkTheme: false,
      grayTheme: false,
      layoutMode: 'classic',
      themeColor: '#409eff',
      predefineColors: ['#409eff'],
      menuCollapse: false,
      showBreadcrumbIcon: true,
      showBreadcrumb: true
    })

    // 切换显示状态的方法
    const toggleThemeConfig = () => {
      themeConfig.showTheme = !themeConfig.showTheme
    }

    // 黑暗主题切换
    watch(() => themeConfig.darkTheme, () => {
      const html = document.documentElement as HTMLElement
      if (themeConfig.darkTheme) {
        html.setAttribute('class', 'dark')
      } else {
        html.removeAttribute('class')
      }
      changeThemeColor(themeConfig.themeColor)
    })

    watch(() => themeConfig.grayTheme, () => {
      if (themeConfig.grayTheme) {
        document.documentElement.dataset.theme = 'gray'
      } else {
        document.documentElement.dataset.theme = ''
      }
    })

    // 添加预定义颜色
    function addPredefineColor(color: string) {
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
    const changeThemeColor = (color: string) => {
      if (!color) {
        color = '#409eff'
        ElMessage({ type: 'success', message: '主题颜色已重置' })
      }
      addPredefineColor(color)
      // 计算主题颜色变化
      document.documentElement.style.setProperty('--el-color-primary', color)
      document.documentElement.style.setProperty(
        '--el-color-primary-dark-2',
        themeConfig.darkTheme ? `${getLightColor(color, 0.2)}` : `${getDarkColor(color, 0.3)}`
      )
      for (let i = 1; i <= 9; i++) {
        const primaryColor = themeConfig.darkTheme ? `${getDarkColor(color, i / 10)}` : `${getLightColor(color, i / 10)}`
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