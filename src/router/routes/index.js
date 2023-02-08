const Layout = () => import('@/components/layout/index.vue')

// TODO 路由守卫 权限管理
/*
const routerItem = {
  name: '',
  path: '',
  component: 'component',
  isSingle: true,
  meta: {
    title: '',
    icon: '',
    order: 1,
    role: [ admin1, admin2], // 仅指定用户可访问
    requireAuth: true,  // 是否需要授权才可访问
  },
  children: []
  isHidden: true,
}
*/
export const staticRoutes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      icon: '',
    },
    isHidden: true,
  },
]

const modules = import.meta.glob('@/views/**/route.js', { eager: true })
const dynamicRoutes = []
Object.keys(modules).forEach((key) => {
  dynamicRoutes.push(modules[key].default)
})

export { dynamicRoutes }
