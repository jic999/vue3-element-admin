const Layout = () => import('@/components/layout/index.vue')

export const staticRoutes = []

const modules = import.meta.glob('@/views/**/route.js', { eager: true })
const dynamicRoutes = []
Object.keys(modules).forEach((key) => {
  dynamicRoutes.push(modules[key].default)
})

export { dynamicRoutes }
