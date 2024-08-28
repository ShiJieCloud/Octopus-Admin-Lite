export interface DepartmentType {
  id: number
  name: string
  parentId: number
  sort: number
  status: boolean
  remark: string
  createTime: string
  children: DepartmentType[]
}