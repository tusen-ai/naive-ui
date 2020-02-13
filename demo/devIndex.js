
import { Vue, router, i18n, hljs } from './init'
import demoRouterView from './demoRouterView'
import NaiveUI from '../src/index'
import '../styles/index.scss'
import './styles/markdown.scss'

Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)

new Vue({
  ...demoRouterView,
  i18n,
  router
}).$mount('#app')
