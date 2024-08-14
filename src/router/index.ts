import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layouts/index.vue'),
      children: [
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

export default router
