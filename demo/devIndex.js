
import { Vue, i18n } from './init'
import debugRouteMixin from './routes/debugRouteMixin'
import hljs from './hljs'
import demoRouterView from './demoRouterView'
import NaiveUI from '../src/index'
import '../styles/index.scss'
import { routes, childRoutes } from './routes/routes'
import createRouter from './routes/router'

debugRouteMixin(routes, childRoutes)

const router = createRouter(Vue, routes)

Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)

new Vue({
  ...demoRouterView,
  router,
  i18n
}).$mount('#app')
