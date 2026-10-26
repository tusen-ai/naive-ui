import type { LoadingBarApi } from 'naive-ui'
import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useLocaleName } from '../store'

declare global {
  interface Window {
    /** Defined in index.html */
    deriveTitleFromLocale: (locale?: string) => void
  }
}

/** Set by the site once its loading bar is mounted */
export const loadingBarApiRef: { value?: LoadingBarApi } = {}

export default function createDemoRouter(
  _app: App,
  routes: RouteRecordRaw[]
): Router {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.beforeEach((to, from, next) => {
    if (!from || to.path !== from.path) {
      if (loadingBarApiRef.value) {
        loadingBarApiRef.value.start()
      }
    }
    next()
  })

  router.afterEach((to, from) => {
    if (!from || to.path !== from.path) {
      if (loadingBarApiRef.value) {
        loadingBarApiRef.value.finish()
      }
      if (to.hash && to.hash !== from.hash) {
        nextTick(() => {
          const el = document.querySelector(to.hash)
          if (el)
            el.scrollIntoView()
        })
      }
      nextTick(() => {
        const h1s = document.getElementsByTagName('h1')
        if (to.name !== 'home' && h1s.length !== 0) {
          document.title = `${h1s[0].textContent} - Naive UI`
        }
        else {
          // defined in index.html
          window.deriveTitleFromLocale(useLocaleName().value)
        }
      })
    }
  })

  return router
}
