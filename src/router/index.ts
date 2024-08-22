import { createRouter, createWebHistory } from 'vue-router'
import { useTabsStore } from '@/stores/modules/tabs'

import NProgress from 'nprogress'

// 禁用右上角的旋转动画
NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
      name: 'layout',
      component: () => import('@/layouts/index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
            icon: 'Home'
          }
        },
        {
          path: '/permission',
          name: 'Permission',
          meta: {
            title: '权限管理',
            icon: 'Permission'
          },
          children: [
            {
              path: '/permission/menu',
              name: 'Menu',
              component: () => import('@/views/menu/index.vue'),
              meta: {
                title: '菜单管理',
                icon: 'PostTree'
              }
            },
            {
              path: '/permission/role',
              name: 'Role',
              component: () => import('@/views/role/index.vue'),
              meta: {
                title: '角色管理',
                icon: 'Role'
              }
            }
          ]
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/about/index.vue'),
          meta: {
            title: '关于项目',
            icon: 'About'
          }
        }
      ]
    }
  ]
})

// 添加路由守卫来控制 NProgress
router.beforeEach( () => {
  // 开启进度条动画
  NProgress.start()
  return true
})

router.afterEach((to) => {
  const { addTab, tabConfig } = useTabsStore()

  if (to.path !== '/login') {
    addTab(to)
    tabConfig.activeTab = to.name as string
  }

  // 设置页面标题
  const title = import.meta.env.VITE_APP_TITLE
  document.title = to.meta.title + ' - '  + title

  // 关闭进度条动画
  NProgress.done()
})

export default router
