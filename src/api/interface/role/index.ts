import { http } from '@/api'
import { Result } from '../type'
import { RoleType } from '@/api/interface/role/type'

// 封装获取菜单的 API 函数
export const getRoleListApi = (searchForm: any): Promise<Result<RoleType[]>> => {
  return http.get('/role/list', {
    params: {
      title: searchForm.title,
      status: searchForm.status,
      startDate: searchForm.startDate,
      endDate: searchForm.endDate
    }
  })
}