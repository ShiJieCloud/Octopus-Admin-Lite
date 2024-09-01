export interface UserType {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  gender: string;
  departmentId: number;
  positionId: number;
  roles: number[];
  status: boolean;
  remark: string;
}