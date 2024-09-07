import { http } from '@/api'
import { Result } from '../type'
import { UserType } from '@/api/interface/user/type'

// 封装获取菜单的 API 函数
export const getUserListApi = (): Promise<Result<UserType[]>> => {
  return http.get('/user/list')
}

// 用户登录
export const userLoginApi = (data: { username: string; password: string }): Promise<Result<any>> => {
  return http.post('/user/login', data)
}