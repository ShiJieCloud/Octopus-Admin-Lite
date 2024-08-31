// types.ts
export interface PositionType {
  departmentId: number;
  id: number;
  name: string;
  code: string;
  status: boolean;
  roles: number[];
  remark: string;
  sort: number;
  createTime: string;
  updateTime: string;
}