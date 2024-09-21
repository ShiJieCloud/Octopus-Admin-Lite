export interface UserInfo {
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

export interface UserLoginResult {
  token: string;
  userInfo: UserInfo;
}