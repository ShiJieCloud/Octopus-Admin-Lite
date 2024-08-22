import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { wrapperEnv } from './build/getEnv'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

import pkg from './package.json'
import { viteMockServe } from 'vite-plugin-mock'

// 从 package.json 中解构字段
const { dependencies, devDependencies, name, version } = pkg

// 创建应用信息对象，包括包的详细信息和构建时间
const __APP_INFO__ = {
  pkg: {
    dependencies, // 包的常规依赖项
    devDependencies, // 包的开发依赖项
    name, // 包的名称
    version // 包的版本
  },
  lastBuildTime: new Date().toString() // 构建的日期和时间
}

// https://vitejs.dev/config/
export default defineConfig(({ command,mode }: ConfigEnv): UserConfig => {

  const root = process.cwd()
  // 获取.env文件中的内容
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  return {
    root, //项目根目录
    base: viteEnv.VITE_BASE_URL,
    server: {
      host: '0.0.0.0', //指定服务器主机地址
      port: viteEnv.VITE_PORT, //指定开发服务器端口
      strictPort: true, //若端口已被占用则会直接退出
      open: viteEnv.VITE_OPEN //服务器启动时，自动在浏览器中打开应用程序
    },
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        enable: command === 'serve'
      }),
      // 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 定义全局常量
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          javaScriptEnabled: true,
          // 向全局 scss 文件内容注入变量
          additionalData: '@use "@/assets/styles/variable.scss" as *;'
        }
      }
    }
  }
})

