const departmentList = [
  {
    id: 1,
    name: '腾讯公司总部',
    parentId: 0,
    sort: 0,
    status: true,
    remark: '公司总部',
    createTime: '2024-08-27T10:00:00Z',
    children: [
      {
        id: 2,
        name: '腾讯分公司A',
        parentId: 1,
        sort: 1,
        status: true,
        remark: '腾讯分公司A',
        createTime: '2024-08-27T10:05:00Z',
        children: [
          {
            id: 3,
            name: '运营部',
            parentId: 2,
            sort: 1,
            status: true,
            remark: '负责日常运营',
            createTime: '2024-08-27T10:10:00Z',
            children: []
          },
          {
            id: 12,
            name: '市场部',
            parentId: 2,
            sort: 2,
            status: true,
            remark: '负责市场推广',
            createTime: '2024-08-27T10:12:00Z',
            children: []
          },
          {
            id: 13,
            name: '客服部',
            parentId: 2,
            sort: 3,
            status: true,
            remark: '负责客户服务',
            createTime: '2024-08-27T10:14:00Z',
            children: []
          }
        ]
      },
      {
        id: 4,
        name: '腾讯分公司B',
        parentId: 1,
        sort: 2,
        status: true,
        remark: '腾讯分公司B',
        createTime: '2024-08-27T10:15:00Z',
        children: [
          {
            id: 5,
            name: '研发部',
            parentId: 4,
            sort: 1,
            status: true,
            remark: '负责产品研发',
            createTime: '2024-08-27T10:20:00Z',
            children: []
          },
          {
            id: 14,
            name: '技术支持部',
            parentId: 4,
            sort: 2,
            status: true,
            remark: '提供技术支持',
            createTime: '2024-08-27T10:22:00Z',
            children: []
          },
          {
            id: 15,
            name: '测试部',
            parentId: 4,
            sort: 3,
            status: true,
            remark: '进行产品测试',
            createTime: '2024-08-27T10:24:00Z',
            children: []
          }
        ]
      },
      {
        id: 6,
        name: '腾讯分公司C',
        parentId: 1,
        sort: 3,
        status: true,
        remark: '腾讯分公司C',
        createTime: '2024-08-27T10:25:00Z',
        children: [
          {
            id: 7,
            name: '销售部',
            parentId: 6,
            sort: 1,
            status: true,
            remark: '负责销售和客户关系',
            createTime: '2024-08-27T10:30:00Z',
            children: []
          },
          {
            id: 16,
            name: '商务部',
            parentId: 6,
            sort: 2,
            status: true,
            remark: '负责商务合作',
            createTime: '2024-08-27T10:32:00Z',
            children: []
          },
          {
            id: 17,
            name: '客户支持部',
            parentId: 6,
            sort: 3,
            status: true,
            remark: '提供客户支持',
            createTime: '2024-08-27T10:34:00Z',
            children: []
          }
        ]
      },
      {
        id: 8,
        name: '腾讯分公司D',
        parentId: 1,
        sort: 4,
        status: true,
        remark: '腾讯分公司D',
        createTime: '2024-08-27T10:35:00Z',
        children: [
          {
            id: 9,
            name: '财务部',
            parentId: 8,
            sort: 1,
            status: true,
            remark: '负责财务管理',
            createTime: '2024-08-27T10:40:00Z',
            children: []
          },
          {
            id: 18,
            name: '审计部',
            parentId: 8,
            sort: 2,
            status: true,
            remark: '进行财务审计',
            createTime: '2024-08-27T10:42:00Z',
            children: []
          },
          {
            id: 19,
            name: '税务部',
            parentId: 8,
            sort: 3,
            status: true,
            remark: '处理税务事宜',
            createTime: '2024-08-27T10:44:00Z',
            children: []
          }
        ]
      },
      {
        id: 10,
        name: '腾讯分公司E',
        parentId: 1,
        sort: 5,
        status: true,
        remark: '腾讯分公司E',
        createTime: '2024-08-27T10:45:00Z',
        children: [
          {
            id: 11,
            name: '人力资源部',
            parentId: 10,
            sort: 1,
            status: true,
            remark: '负责员工管理',
            createTime: '2024-08-27T10:50:00Z',
            children: []
          },
          {
            id: 20,
            name: '培训部',
            parentId: 10,
            sort: 2,
            status: true,
            remark: '负责员工培训',
            createTime: '2024-08-27T10:52:00Z',
            children: []
          },
          {
            id: 21,
            name: '福利部',
            parentId: 10,
            sort: 3,
            status: true,
            remark: '负责员工福利',
            createTime: '2024-08-27T10:54:00Z',
            children: []
          }
        ]
      }
    ]
  }
]

// 封装获取菜单的 API 函数
// 获取菜单列表接口
export default [
  {
    //获取菜单
    url: '/api/department/list',
    timeout: 200,
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: departmentList,
        msg: '查询成功'
      }
    }
  }
]