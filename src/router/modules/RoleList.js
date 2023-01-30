import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'user',
  meta: {
    title: 'user',
    icon: 'personnel',
    name: 'roleList'
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/role-list/index'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
