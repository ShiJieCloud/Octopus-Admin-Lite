const menuList = [
  {
    id: 1,
    name: 'Home',
    icon: 'home',
    sort: 1,
    permission: '',
    path: '/home',
    component: 'home/index',
    status: 1,
    createTime: '2022-01-01 12:00:00',
    title: '首页'
  },
  {
    id: 2,
    title: 'Dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    sort: 2,
    permission: '',
    path: '/dashboard',
    component: '',
    status: 1,
    createTime: '2022-01-01 12:00:00',
    children: [
      {
        id: 3,
        name: 'Analysis',
        icon: 'analysis',
        sort: 1,
        permission: '',
        path: '/dashboard/analysis',
        component: 'dashboard/analysis/index',
        status: 1,
        createTime: '2022-01-01 12:00:00',
        title: '分析页'
      },
      {
        id: 4,
        name: 'Workplace',
        icon: 'workplace',
        sort: 2,
        permission: '',
        path: '/dashboard/workplace',
        component: 'dashboard/workplace/index',
        status: 0,
        createTime: '2022-01-01 12:00:00',
        title: '工作台'
      }
    ]
  }
]

// 获取菜单列表接口
export default [
  {
    //获取菜单
    url: '/api/menu/list',
    timeout: 200,
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: menuList,
        msg: '获取菜单成功'
      }
    }
  }
]
