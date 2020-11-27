const manage = {
  path: '/manage',
  component: () => import('@/layout').then(m => m.default),
  redirect: 'noRedirect',
  name: 'Menage',
  meta: {
    title: '管理',
    icon: 'example'
  },
  children: [
    {
      path: 'menu',
      component: () => import('@/views/manage/menu').then(m => m.default),
      name: 'Menu',
      meta: { title: '菜单管理', icon: 'component', noCache: true }
    },
    {
      path: 'department',
      component: () => import('@/views/manage/department').then(m => m.default),
      name: 'Department',
      meta: { title: '部门管理', icon: 'tree', noCache: true }
    },
    {
      path: 'user',
      component: () => import('@/views/manage/user').then(m => m.default),
      name: 'User',
      meta: { title: '人员管理', icon: 'user', noCache: true }
    },
    {
      path: 'role',
      component: () => import('@/views/manage/role').then(m => m.default),
      name: 'Role',
      meta: { title: '角色管理', icon: 'peoples', noCache: true }
    }
  ]
}

export default manage
