const menuList = [
  {
    parentId: 0,
    id: 1,
    name: 'Home',
    icon: 'home',
    sort: 1,
    path: '/home',
    component: 'home/index',
    status: true,
    createTime: '2022-01-01 12:00:00',
    title: '首页'
  },
  {
    parentId: 0,
    id: 2,
    title: 'Dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    sort: 2,
    path: '/dashboard',
    component: '',
    status: true,
    createTime: '2022-01-01 12:00:00',
    children: [
      {
        parentId: 2,
        id: 3,
        name: 'Analysis',
        icon: 'analysis',
        sort: 1,
        path: '/dashboard/analysis',
        component: 'dashboard/analysis/index',
        status: true,
        createTime: '2022-01-01 12:00:00',
        title: '分析页'
      },
      {
        parentId: 2,
        id: 4,
        name: 'Workplace',
        icon: 'workplace',
        sort: 2,
        path: '/dashboard/workplace',
        component: 'dashboard/workplace/index',
        status: false,
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
