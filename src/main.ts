import { createApp } from 'vue'
import pinia from '@/stores'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
// 全局样式
import './assets/styles/index.scss'

import 'virtual:svg-icons-register'
import '@/assets/iconfont/iconfont.js'
import GlobalComponents from '@/components/index'

import directives from '@/directives'

const app = createApp(App)

app.use(router)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(GlobalComponents)
  .use(directives)
  .use(pinia)
  .mount('#app')
