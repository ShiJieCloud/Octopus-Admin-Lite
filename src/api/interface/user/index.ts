import { http } from '@/api'
import { Result } from '../type'
import { UserType } from '@/api/interface/user/type'

// 封装获取菜单的 API 函数
export const getUserListApi = (): Promise<Result<UserType[]>> => {
  return http.get('/user/list')
}