//标签页
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useTabsStore = defineStore(
  'tabs',
  () => {
    const activeTab: any = ref('')
    const refresh = ref(true)
    const cacheTabs: any = ref([])

    //关闭选项卡,如果是最后一个，则跳转上一个，如果是中间，则跳转最后一个
    const closeTab = () => {
      const index = cacheTabs.value.findIndex((tab) => tab.name === activeTab.value)

      if (index !== -1) {
        cacheTabs.value.splice(index, 1)
        // 获取剩余的标签页数量
        const remainingTabs = cacheTabs.value.length

        if (remainingTabs > 0) {
          // 计算新的激活标签页的索引
          let newIndex = index // 默认跳转到当前位置

          if (index === remainingTabs) {
            // 如果关闭的是最后一个标签页，则跳转到前一个标签页
            newIndex = index - 1
          } else {
            // 如果关闭的是中间的标签页，则跳转到最后一个标签页
            newIndex = remainingTabs - 1
          }

          // 更新路由或者其他逻辑，这里假设 cacheTabs 是响应式对象，会自动更新视图
          router.push({ name: cacheTabs.value[newIndex].name })
        } else {
          // 如果没有剩余的标签页了，可以在这里处理跳转到默认页或者其他逻辑
          router.push({ name: 'home' }) // 例如跳转到首页
        }
      }
    }

    const refreshTab = () => {
      refresh.value = !refresh.value
    }

    //点击选项卡
    const handleClick = (tab) => {
      //路由跳转
      router.push({ name: tab.props.name })
    }

    //添加选项卡
    const addTab = (route: any) => {
      const index = cacheTabs.value.findIndex((tab) => tab.name === route.name)
      if (index === -1) {
        cacheTabs.value.push(route)
      }
    }

    // 关闭其他选项卡
    const closeOtherTabs = () => {
      cacheTabs.value = cacheTabs.value.filter((tab) => tab.name === activeTab.value)
    }

    // 关闭全部选项卡
    const closeAllTabs = () => {
      cacheTabs.value = []
      router.push({ name: 'Home' })
    }

    // 关闭右侧选项卡
    const closeRightTabs = () => {
      const index = cacheTabs.value.findIndex((tab) => tab.name === activeTab.value)
      if (index !== -1) {
        // 将 cacheTabs 中从当前选项卡开始到末尾的部分截取出来
        cacheTabs.value = cacheTabs.value.slice(0, index + 1)
      }
    }

    // 关闭左侧选项卡
    const closeLeftTabs = () => {
      const index = cacheTabs.value.findIndex((tab) => tab.name === activeTab.value)
      if (index !== -1) {
        cacheTabs.value = cacheTabs.value.slice(index)
      }
    }

    const clearTabs = () => {
      activeTab.value = ''
      cacheTabs.value = []
    }

    return {
      activeTab,
      cacheTabs,
      refresh,
      refreshTab,
      handleClick,
      addTab,
      closeTab,
      closeOtherTabs,
      closeAllTabs,
      closeRightTabs,
      closeLeftTabs,
      clearTabs
    }
  },
  {
    persist: true
  }
)
