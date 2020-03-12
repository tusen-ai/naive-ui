
import { Vue, router, i18n, hljs } from './devInit'
import demoRouterView from './demoRouterView'
import NaiveUI from '../src/index'
import '../styles/index.scss'

Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)

new Vue({
  ...demoRouterView,
  i18n,
  router
}).$mount('#app')
