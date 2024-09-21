import { http } from '@/api'
import { Result } from '../type'
import { UserInfo, UserLoginResult } from '@/api/interface/user/type'

// 封装获取菜单的 API 函数
export const getUserListApi = (): Promise<Result<UserInfo[]>> => {
  return http.get('/user/list')
}

// 用户登录
export const userLoginApi = (data: { username: string; password: string }): Promise<UserLoginResult> => {
  return http.post('/user/login', data)
}