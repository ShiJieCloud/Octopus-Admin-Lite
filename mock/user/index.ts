const userList = [
  {
    'id': 1,
    'name': '张伟',
    'phone': '13800138000',
    'email': 'zhangwei@example.com',
    'avatar': 'https://raw.githubusercontent.com/ShiJieCloud/MarkDownPicMyself/main/image-2023/202409011736958.jpg',
    'gender': 1,
    'departmentId': 2,
    'positionId': 3,
    'roles': [1, 2],
    'status': true,
    'remark': '普通员工',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'zhangwei',
    'password': '12345678'
  },
  {
    'id': 2,
    'name': '李娜',
    'phone': '13900139000',
    'email': 'lina@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 0,
    'departmentId': 2,
    'positionId': 4,
    'roles': [1, 3],
    'status': true,
    'remark': '部门主管',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'lina',
    'password': '12345678'
  },
  {
    'id': 3,
    'name': '王强',
    'phone': '13700137000',
    'email': 'wangqiang@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 1,
    'departmentId': 3,
    'positionId': 5,
    'roles': [2, 3],
    'status': true,
    'remark': '项目经理',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'wangqiang',
    'password': '12345678'
  },
  {
    'id': 4,
    'name': '赵敏',
    'phone': '13600136000',
    'email': 'zhaomin@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 1,
    'departmentId': 4,
    'positionId': 6,
    'roles': [1],
    'status': true,
    'remark': '行政助理',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'zhaomin',
    'password': '12345678'
  },
  {
    'id': 5,
    'name': '刘洋',
    'phone': '13500135000',
    'email': 'liuyang@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 1,
    'departmentId': 5,
    'positionId': 7,
    'roles': [2],
    'status': true,
    'remark': '人力资源专员',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'liuyang',
    'password': '12345678'
  },
  {
    'id': 6,
    'name': '陈洁',
    'phone': '13400134000',
    'email': 'chenjie@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 0,
    'departmentId': 6,
    'positionId': 8,
    'roles': [1],
    'status': true,
    'remark': '财务经理',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'chenjie',
    'password': '12345678'
  },
  {
    'id': 7,
    'name': '孙鹏',
    'phone': '13300133000',
    'email': 'sunpeng@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 1,
    'departmentId': 7,
    'positionId': 9,
    'roles': [3],
    'status': true,
    'remark': '技术支持工程师',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'sunpeng',
    'password': '12345678'
  },
  {
    'id': 8,
    'name': '王丽',
    'phone': '13200132000',
    'email': 'wangli@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 0,
    'departmentId': 8,
    'positionId': 10,
    'roles': [2],
    'status': true,
    'remark': '市场推广专员',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'wangli',
    'password': '12345678'
  },
  {
    'id': 9,
    'name': '刘涛',
    'phone': '13100131000',
    'email': 'liutao@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 1,
    'departmentId': 9,
    'positionId': 11,
    'roles': [3],
    'status': true,
    'remark': '产品经理',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'liutao',
    'password': '12345678'
  },
  {
    'id': 10,
    'name': '周瑜',
    'phone': '13000130000',
    'email': 'zhouyu@example.com',
    'avatar': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'gender': 1,
    'departmentId': 10,
    'positionId': 12,
    'roles': [2],
    'status': true,
    'remark': '运营主管',
    'createTime': '2024-01-10 13:00',
    'updateTime': '2024-08-25 09:45',
    'username': 'zhouyu',
    'password': '12345678'
  }
]

// 获取角色列表接口
// 获取用户列表的响应
const getUserListResponse = () => {
  return {
    code: 200,
    data: userList,
    msg: '查询成功'
  }
}

// 用户登录的响应
const loginResponse = ({ body }) => {
  const { username, password } = body

  const checkUser = userList.find(
    (item) => item.username === username && item.password === password
  )

  if (!checkUser) {
    return { code: 201, data: {}, msg: '账号或密码不正确' }
  }

  const { id } = checkUser
  return { code: 200, data: { token: id, userInfo: checkUser }, msg: '登陆成功' }
}

// 导出接口配置
export default [
  {
    url: '/api/user/list',
    timeout: 200,
    method: 'get',
    response: getUserListResponse
  },
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 1000,
    response: loginResponse
  }
]