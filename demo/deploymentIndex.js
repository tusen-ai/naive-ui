import { Vue, router } from './deploymentInit'
import i18n from './i18n'
import hljs from './hljs'
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
