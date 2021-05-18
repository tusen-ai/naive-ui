import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

export const loadingBarApiRef = {}

export default function createDemoRouter (app, routes) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.beforeEach(function (to, from, next) {
    if (!from || to.path !== from.path) {
      if (loadingBarApiRef.value) {
        loadingBarApiRef.value.start()
      }
    }
    next()
  })

  router.afterEach(function (to, from) {
    if (!from || to.path !== from.path) {
      if (loadingBarApiRef.value) {
        loadingBarApiRef.value.finish()
      }
      if (to.hash && to.hash !== from.hash) {
        nextTick(() => {
          const el = document.querySelector(to.hash)
          if (el) el.scrollIntoView()
        })
      }
    }
  })

  return router
}
