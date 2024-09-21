import { createRouter, createWebHistory } from 'vue-router'
import { useTabsStore } from '@/stores/modules/tabs'

import NProgress from 'nprogress'
import { useUserStore } from '@/stores/modules/user'

const LOGIN_URL = '/login'

// 禁用右上角的旋转动画
NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
      name: 'Layout',
      component: () => import('@/layouts/index.vue'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
            icon: 'home'
          }
        },
        {
          path: '/permission',
          name: 'Permission',
          meta: {
            title: '权限管理',
            icon: 'permission'
          },
          children: [
            {
              path: '/permission/user',
              name: 'User',
              component: () => import('@/views/user/index.vue'),
              meta: {
                title: '用户管理',
                icon: 'user'
              }
            },
            {
              path: '/permission/department',
              name: 'Department',
              component: () => import('@/views/department/index.vue'),
              meta: {
                title: '部门管理',
                icon: 'department'
              }
            },
            {
              path: '/permission/position',
              name: 'Position',
              component: () => import('@/views/position/index.vue'),
              meta: {
                title: '岗位管理',
                icon: 'post-card'
              }
            },
            {
              path: '/permission/menu',
              name: 'Menu',
              component: () => import('@/views/menu/index.vue'),
              meta: {
                title: '菜单管理',
                icon: 'hamburger'
              }
            },
            {
              path: '/permission/role',
              name: 'Role',
              component: () => import('@/views/role/index.vue'),
              meta: {
                title: '角色管理',
                icon: 'role'
              }
            }
          ]
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('@/views/about/index.vue'),
          meta: {
            title: '关于项目',
            icon: 'about'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录',
        icon: 'home'
      }
    }
  ]
})

// 添加路由守卫来控制 NProgress
router.beforeEach((to,from) => {
  // 开启进度条动画
  NProgress.start()

  // 检查用户是否登录
  const { userToken } = useUserStore()
  const isAuthenticated = !!userToken

  // 如果路由需要认证且用户未登录，则跳转到登录页面
  if (to.path === LOGIN_URL) {
    if (isAuthenticated) {
      return from.fullPath
    }
    return true
  } else {
    if (!isAuthenticated) {
      return { path: LOGIN_URL }
    }
  }
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
