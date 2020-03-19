import { Vue, router, i18n } from './init'
import hljs from './hljs'
import demoRouterView from './demoRouterView'
import NaiveUI from '../lib/index'
import '../lib/styles/index.css'

Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)

new Vue({
  ...demoRouterView,
  router,
  i18n
}).$mount('#app')
