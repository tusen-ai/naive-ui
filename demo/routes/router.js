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
      nextTick(() => {
        const titleParts = []
        if (to.name !== 'home') {
          const h1s = document.getElementsByTagName('h1')
          if (h1s.length !== 0) {
            titleParts.push(h1s[0].textContent)
          }
        }
        const path = window.location.pathname
        const pathLocale = path.startsWith('/en-US')
          ? 'en-US'
          : path.startsWith('/zh-CN')
            ? 'zh-CN'
            : undefined
        function deriveTitleFromLocale (locale = navigator.language) {
          if (locale === 'zh-CN') {
            titleParts.push('Naive UI: 一个 Vue 3 组件库')
          } else {
            titleParts.push('Naive UI: A Vue 3 Component Library')
          }
        }
        deriveTitleFromLocale(pathLocale)
        document.title = titleParts.join(' - ')
      })
    }
  })

  return router
}
