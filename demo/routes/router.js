import VueRouter from 'vue-router'

export default function createRouter (Vue, routes) {
  const router = new VueRouter({
    mode: 'history',
    routes
  })
  router.beforeEach(function (to, from, next) {
    let theme = to.params.theme
    if (theme === 'os-theme') {
      theme = Vue.prototype.$NOs.theme
    }
    Vue.prototype.$NLoadingBar.theme = theme
    if (to.path !== from.path) {
      Vue.prototype.$NLoadingBar.start()
    }
    next()
  })

  router.afterEach(function (to, from) {
    if (to.path !== from.path) {
      Vue.prototype.$NLoadingBar.finish()
    }
  })
  return router
}
