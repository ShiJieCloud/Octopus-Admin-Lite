//封装axios 调用接口返回信息
export interface Result<T> {
  code: number
  msg: string
  data?: T
}
