
import { Vue, router, routes, childRoutes, i18n } from './init'
import debugRouteMixin from './routes/debugRouteMixin'
import hljs from './hljs'
import demoRouterView from './demoRouterView'
import NaiveUI from '../src/index'
import '../styles/index.scss'

debugRouteMixin(routes, childRoutes)

Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)

new Vue({
  ...demoRouterView,
  router,
  i18n
}).$mount('#app')
