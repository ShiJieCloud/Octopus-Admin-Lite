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

// 错误信息映射对象
const errorMessages = {
  401: '未登录，请先登录',
  403: '权限不足，请联系管理员',
  404: '请求地址不存在',
  500: '服务器内部错误'
}

// 错误处理函数
const handleError = (state) => {
  const message = errorMessages[state] || '发生了错误'
  ElMessage.error(message)
  return Promise.reject(new Error(message))
}

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    const { code, msg, data } = response.data

    if (code === 200) {
      ElMessage.success(msg || '请求成功')
      return data
    }

    // 处理非成功状态码
    return handleResponseError(code, msg)
  },
  (error) => {
    // 处理请求错误
    return handleError(error.response ? error.response.status : null)
  }
)

const handleResponseError = (code, msg) => {
  ElMessage.error(msg || '请求失败')
  return Promise.reject(new Error(msg || '请求失败'))
}

