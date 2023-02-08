export function createPageTitleGuard(router) {
  router.afterEach((to) => {
    if (to.meta.title) document.title = to.meta.title
  })
}
