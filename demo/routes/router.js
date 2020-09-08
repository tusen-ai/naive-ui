import { createRouter, createWebHistory } from 'vue-router'

export default function createDemoRouter (app, routes) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  // router.beforeEach(function (to, from, next) {
  //   let theme = to.params.theme
  //   if (theme === 'os-theme') {
  //     theme = app.config.globalProperties.$NOs.theme
  //   }
  //   app.config.globalProperties.$NLoadingBar.theme = theme
  //   if (to.path !== from.path) {
  //     app.config.globalProperties.$NLoadingBar.start()
  //   }
  //   next()
  // })

  // router.afterEach(function (to, from) {
  //   if (to.path !== from.path) {
  //     app.config.globalProperties.$NLoadingBar.finish()
  //   }
  // })
  return router
}
