const positionsData = [
  { departmentId: 1, id: 'P001', name: '软件工程师', code: 'SW001', status: true, roles: ['开发', '维护'], remark: '负责公司软件开发工作', sort: 1 , createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z'},
  { departmentId: 1, id: 'P002', name: '产品经理', code: 'PM001', status: true, roles: ['产品设计', '需求分析'], remark: '负责产品规划和需求分析', sort: 2, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 2, id: 'P003', name: '人力资源经理', code: 'HR001', status: true, roles: ['招聘', '员工关系'], remark: '负责公司人力资源管理', sort: 3, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 2, id: 'P004', name: '财务分析师', code: 'FA001', status: true, roles: ['财务分析', '预算管理'], remark: '负责财务数据分析和预算管理', sort: 4, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 4, id: 'P005', name: '市场推广专员', code: 'MM001', status: true, roles: ['市场策划', '品牌推广'], remark: '负责市场活动策划和品牌推广', sort: 5, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 4, id: 'P006', name: '客户服务代表', code: 'CS001', status: true, roles: ['客户支持', '问题解决'], remark: '提供客户服务和问题解决方案', sort: 6, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },

  // 额外岗位数据
  { departmentId: 3, id: 'P007', name: '网络管理员', code: 'NW001', status: true, roles: ['网络维护', '系统管理'], remark: '负责公司网络和系统的维护', sort: 7, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 3, id: 'P008', name: '安全分析师', code: 'SA001', status: true, roles: ['安全监控', '漏洞分析'], remark: '负责信息系统的安全分析和防护', sort: 8, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 5, id: 'P009', name: '销售经理', code: 'SM001', status: true, roles: ['销售策略', '客户开发'], remark: '负责销售策略制定和客户开发', sort: 9, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 5, id: 'P010', name: '产品设计师', code: 'PD001', status: true, roles: ['产品设计', '原型制作'], remark: '负责产品的设计和原型制作', sort: 10, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 6, id: 'P011', name: '法务顾问', code: 'LW001', status: true, roles: ['法律咨询', '合同审查'], remark: '提供法律咨询和合同审查服务', sort: 11, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' },
  { departmentId: 6, id: 'P012', name: '行政助理', code: 'AA001', status: true, roles: ['行政支持', '文档管理'], remark: '负责行政支持和文档管理', sort: 12, createTime: '2024-08-01T12:00:00Z', updateTime: '2024-08-15T12:00:00Z' }

  // 更多岗位数据...
]

// 获取菜单列表接口
export default [
  {
    //获取菜单
    url: '/api/position/list',
    timeout: 200,
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: positionsData,
        msg: '查询成功'
      }
    }
  }
]