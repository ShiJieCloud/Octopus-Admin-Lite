const roleList = [
  {
    id: 1,
    name: 'Administrator',
    permissionCode: 'ALL',
    sort: 1,
    status: true,
    permissionList: 'Access all features',
    remark: 'Highest permissions, full system management',
    createTime: '2024-01-01 10:00',
    updateTime: '2024-08-25 09:00'
  },
  {
    id: 2,
    name: 'Editor',
    permissionCode: 'EDIT',
    sort: 2,
    status: true,
    permissionList: 'Edit content, view content',
    remark: 'Can modify and update content',
    createTime: '2024-01-02 11:30',
    updateTime: '2024-08-25 09:05'
  },
  {
    id: 3,
    name: 'Contributor',
    permissionCode: 'CONTRIBUTE',
    sort: 3,
    status: true,
    permissionList: 'Submit content, view content',
    remark: 'Primarily responsible for content creation and submission',
    createTime: '2024-01-03 09:15',
    updateTime: '2024-08-25 09:10'
  },
  {
    id: 4,
    name: 'Visitor',
    permissionCode: 'VIEW',
    sort: 4,
    status: true,
    permissionList: 'View content only',
    remark: 'Cannot edit or submit content',
    createTime: '2024-01-04 08:45',
    updateTime: '2024-08-25 09:15'
  },
  {
    id: 5,
    name: 'Reviewer',
    permissionCode: 'REVIEW',
    sort: 5,
    status: true,
    permissionList: 'Review content, view content',
    remark: 'Responsible for reviewing and approving content',
    createTime: '2024-01-05 14:00',
    updateTime: '2024-08-25 09:20'
  },
  {
    id: 6,
    name: 'User',
    permissionCode: 'USER',
    sort: 6,
    status: true,
    permissionList: 'Access personal content, modify personal information',
    remark: 'General user, mainly uses personal features',
    createTime: '2024-01-06 16:30',
    updateTime: '2024-08-25 09:25'
  },
  {
    id: 7,
    name: 'Sales',
    permissionCode: 'SALES',
    sort: 7,
    status: true,
    permissionList: 'Access sales data, generate reports',
    remark: 'Responsible for sales-related data and reports',
    createTime: '2024-01-07 10:00',
    updateTime: '2024-08-25 09:30'
  },
  {
    id: 8,
    name: 'Support',
    permissionCode: 'SUPPORT',
    sort: 8,
    status: true,
    permissionList: 'Provide support, view support requests',
    remark: 'Handles user support requests and issues',
    createTime: '2024-01-08 12:15',
    updateTime: '2024-08-25 09:35'
  },
  {
    id: 9,
    name: 'Finance',
    permissionCode: 'FINANCE',
    sort: 9,
    status: true,
    permissionList: 'Manage financial data, generate financial reports',
    remark: 'Responsible for financial records and report generation',
    createTime: '2024-01-09 15:30',
    updateTime: '2024-08-25 09:40'
  },
  {
    id: 10,
    name: 'System Administrator',
    permissionCode: 'SYS_ADMIN',
    sort: 10,
    status: true,
    permissionList: 'System settings, user management, view all logs',
    remark: 'Responsible for overall system maintenance and user management',
    createTime: '2024-01-10 13:00',
    updateTime: '2024-08-25 09:45'
  }
]

// 获取角色列表接口
export default [
  {
    //获取菜单
    url: '/api/role/list',
    timeout: 200,
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: roleList,
        msg: '查询成功'
      }
    }
  }
]
