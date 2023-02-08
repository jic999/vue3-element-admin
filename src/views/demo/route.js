const Layout = () => import('@/components/layout/index.vue')

export default {
  name: 'Demo',
  path: '/demo',
  component: Layout,
  redirect: '/demo/component',
  meta: {
    title: '示例页面',
    icon: 'ic:round-code',
    order: 3,
  },
  children: [
    {
      name: 'Component',
      path: 'component',
      component: () => import('@/views/demo/component/index.vue'),
      meta: {
        title: '组件',
        icon: 'ic:round-workspaces',
      },
    },
    {
      name: 'Crud',
      path: 'crud',
      component: () => import('@/views/demo/crud/CrudFirst.vue'),
      meta: {
        title: 'crud',
        icon: 'ic:baseline-table-view',
      },
    },
    {
      name: 'Crud1',
      path: '/crud1',
      component: () => import('@/views/demo/crud/CrudSmart.vue'),
      meta: {
        title: 'SmartCrud',
        icon: 'ic:baseline-table-view',
      },
    },
  ],
}
