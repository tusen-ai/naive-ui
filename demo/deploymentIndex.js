import { Vue, router, i18n, hljs } from './deploymentInit'
import demoRouterView from './demoRouterView'
import NaiveUI from '../lib/index'
import '../lib/styles/index.css'

Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)

new Vue({
  ...demoRouterView,
  i18n,
  router
}).$mount('#app')
