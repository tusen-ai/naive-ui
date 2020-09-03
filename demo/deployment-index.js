import { Vue, i18n } from './init'
import hljs from './hljs'
import demoRouterView from './DemoRouterView'
import naive from '../lib/index'
import '../lib/styles/index.css'
// import './styles/test-customize-style-scheme.scss' // test
import '../lib/styles/fonts/Lato.css'
import '../lib/styles/fonts/FiraCode.css'
import createRouter from './routes/router'
import { routes } from './routes/routes'

naive.setHljs(hljs)

Vue.use(naive)

const router = createRouter(Vue, routes)

new Vue({
  ...demoRouterView,
  router,
  i18n
}).$mount('#app')
