
import { Vue, router, i18n } from './init'
import demoRouterView from './demoRouterView'

new Vue({
  ...demoRouterView,
  i18n,
  router
}).$mount('#app')
