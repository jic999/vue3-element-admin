const Layout = () => import('@/components/layout/index.vue')

export default {
  name: 'Demo',
  path: '/demo',
  component: Layout,
  redirect: '/demo/component',
  meta: {
    title: 'Demo',
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
      component: () => import('@/views/demo/crud/index.vue'),
      meta: {
        title: 'crud',
        icon: 'ic:baseline-table-view',
      },
    },
    {
      name: 'SmartCrud',
      path: '/smart-crud',
      component: () => import('@/views/demo/crud/ExampleView.vue'),
      meta: {
        title: 'SmartCrud',
        icon: 'ic:baseline-table-view',
      },
    },
  ],
}
