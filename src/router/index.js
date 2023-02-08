import { createRouter, createWebHistory } from 'vue-router'
import { staticRoutes, dynamicRoutes } from './routes'
import { setupRouterGuard } from '@/router/guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...dynamicRoutes],
})

export function setupRouter(app) {
  app.use(router)
  setupRouterGuard(router)
}
