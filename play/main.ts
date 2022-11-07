import { createApp } from 'vue'
;(async () => {
  const apps = import.meta.glob<any>('./src/*.vue')

  const name = location.pathname.replace(/^\//, '') || 'App'
  const file = apps[`./src/${name}.vue`]
  if (!file) {
    location.pathname = 'App'
    return
  }
  const App = (await file()).default
  const app = createApp(App)

  app.mount('#app')
})()
