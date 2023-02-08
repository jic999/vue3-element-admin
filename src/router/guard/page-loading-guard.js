import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
  router.onError(() => {
    NProgress.error()
  })
}
