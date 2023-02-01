const Layout = () => import('@/components/layout/index.vue')

export default {
  name: 'Workbench',
  path: '/workbench',
  redirect: '/workbench',
  component: Layout,
  isSingle: true,
  meta: {
    title: '工作台',
    icon: 'ic:baseline-laptop',
    order: 2,
  },
  children: [
    {
      name: 'Workbench',
      path: '',
      component: () => import('@/views/workbench/index.vue'),
    },
  ],
}
