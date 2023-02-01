const Layout = () => import('@/components/layout/index.vue')

export default {
  name: 'Home',
  path: '/',
  redirect: '/',
  component: Layout,
  isSingle: true,
  meta: {
    title: '首页',
    icon: 'ic:sharp-home',
    order: 1,
  },
  children: [
    {
      name: 'Home',
      path: '',
      component: () => import('@/views/home/index.vue'),
    },
  ],
}
