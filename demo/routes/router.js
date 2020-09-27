import { createRouter, createWebHistory } from 'vue-router'

export const loadingBarApiRef = {}

export default function createDemoRouter (app, routes) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.beforeEach(function (to, from, next) {
    if (loadingBarApiRef.value) {
      loadingBarApiRef.value.start()
    }
    next()
  })

  router.afterEach(function (to, from) {
    if (to.path !== from.path) {
      if (loadingBarApiRef.value) {
        loadingBarApiRef.value.finish()
      }
    }
  })

  return router
}
