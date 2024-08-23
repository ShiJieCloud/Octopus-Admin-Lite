export interface MenuType {
  id: number
  title: string
  name: string
  icon: string
  sort: number
  permission: string
  path: string
  component: string
  status: number
  createTime: string
  children?: MenuType[]
}