
import { Vue, router, i18n } from './init'
import demoRouterView from './demoRouterView'
import '../styles/index.scss'
import './styles/markdown.scss'

new Vue({
  ...demoRouterView,
  i18n,
  router
}).$mount('#app')
