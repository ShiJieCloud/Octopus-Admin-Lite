const menuList = [
  {
    path: '/home',
    name: 'Home',
    component: 'home/index',
    title: '首页',
    icon: 'Home'
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
