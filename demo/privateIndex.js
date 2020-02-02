
import { Vue, router, i18n } from './init'
import demoRouterView from './demoRouterView'

if (localStorage.token === 'naive') {
  new Vue({
    ...demoRouterView,
    i18n,
    router
  }).$mount('#app')
}
