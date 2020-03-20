import { Vue, i18n } from './init'
import hljs from './hljs'
import demoRouterView from './demoRouterView'
import NaiveUI from '../lib/index'
import '../lib/styles/index.css'
import createRouter from './routes/router'
import { routes } from './routes/routes'

Vue.use(NaiveUI)
NaiveUI.setHljs(hljs)
const router = createRouter(Vue, routes)
new Vue({
  ...demoRouterView,
  router,
  i18n
}).$mount('#app')
