import { http } from '@/api'
import { Result } from '../type'
import { PositionType } from '@/api/interface/position/type'

// 封装获取菜单的 API 函数
export const getPositionListApi = (): Promise<Result<PositionType[]>> => {
  return http.get('/position/list')
}