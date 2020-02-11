
import { Vue, router, i18n } from './init'
import demoRouterView from './demoRouterView'
import '../lib/styles/index.css'
import './styles/markdown.scss'

new Vue({
  ...demoRouterView,
  i18n,
  router
}).$mount('#app')
