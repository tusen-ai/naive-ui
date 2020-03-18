
import { Vue, router } from './devInit'
import i18n from './i18n'
import hljs from './hljs'
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
