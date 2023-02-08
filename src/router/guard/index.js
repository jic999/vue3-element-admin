import { createPageTitleGuard } from './page-title-guard'
import { createPageLoadingGuard } from './page-loading-guard'

export function setupRouterGuard(router) {
  createPageTitleGuard(router)
  createPageLoadingGuard(router)
}
