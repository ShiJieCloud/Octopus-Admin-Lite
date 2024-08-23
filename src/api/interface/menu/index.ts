import { http } from '@/api'
import { Result } from '../type'
import { MenuType } from '@/api/interface/menu/type'

// 封装获取菜单的 API 函数
export const getMenuListApi = (searchForm: any): Promise<Result<MenuType[]>> => {
  return http.get('/menu/list', {
    params: {
      title: searchForm.title,
      status: searchForm.status,
      startDate: searchForm.startDate,
      endDate: searchForm.endDate
    }
  })
}