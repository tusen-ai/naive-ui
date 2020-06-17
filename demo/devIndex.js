
import { Vue, i18n } from './init'
import debugRouteMixin from './routes/debugRouteMixin'
import hljs from './hljs'
import demoRouterView from './demoRouterView'
// import './styles/test-customize-style-scheme.scss' // test customize style scheme
import naive from '../src/index'
import '../src/_styles/index.scss'
import '../src/_styles/fonts/Lato.scss'
import '../src/_styles/fonts/FiraCode.scss'
import { routes, childRoutes } from './routes/routes'
import createRouter from './routes/router'

debugRouteMixin(routes, childRoutes)
const router = createRouter(Vue, routes)

Vue.use(naive)
naive.setHljs(hljs)
// naive.setStyleSchemes({
//   light: {
//     primaryColor: 'rgb(255, 0, 0)'
//   }
// })

new Vue({
  ...demoRouterView,
  router,
  i18n
}).$mount('#app')
