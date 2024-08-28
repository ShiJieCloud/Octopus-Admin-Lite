import { http } from '@/api'
import { Result } from '../type'
import { DepartmentType } from '@/api/interface/department/type'

// 封装获取菜单的 API 函数
export const getDepartmentListApi = (searchForm: any): Promise<Result<DepartmentType[]>> => {
  return http.get('/department/list', {
    params: {
      title: searchForm.title,
      status: searchForm.status,
      startDate: searchForm.startDate,
      endDate: searchForm.endDate
    }
  })
}