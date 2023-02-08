const Layout = () => import('@/components/layout/index.vue')

// TODO 明确路由参数 完善功能
export const staticRoutes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
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
