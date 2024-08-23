import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
export const http = axios.create({
  // 设置基础URL
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  // 设置请求超时时间
  timeout: 5000,
  // 允许跨域请求时发送凭据（比如 cookies）
  withCredentials: true
})

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 处理响应数据
    const { code, msg, data} = response.data
    if (code !== 200) {
      ElMessage.error(msg)
      return Promise.reject(msg)
    }
    ElMessage.success(msg)
    return data
  },
  (error) => {
    const state = error.state
    if (state === 401) {
      // 处理未登录状态
      ElMessage.error('未登录，请先登录')
    }

    if (state === 403) {
      // 处理权限不足状态
      ElMessage.error('权限不足，请联系管理员')
    }

    if (state === 404) {
      // 处理请求地址不存在状态
      ElMessage.error('请求地址不存在')
    }

    if (state === 500) {
      // 处理服务器内部错误状态
      ElMessage.error('服务器内部错误')
    }

    // 其他错误处理逻辑
    return Promise.reject(error)
  }
)
