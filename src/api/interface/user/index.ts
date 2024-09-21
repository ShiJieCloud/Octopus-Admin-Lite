import { http } from '@/api'
import { Result } from '../type'
import { UserInfo, UserLoginResult, UsernameLoginParams } from '@/api/interface/user/type'

// 封装获取菜单的 API 函数
export const getUserListApi = (): Promise<Result<UserInfo[]>> => {
  return http.get('/user/list')
}

// 用户登录
export const userLoginApi = (params: UsernameLoginParams): Promise<UserLoginResult> => {
  return http.post('/user/login', params)
}