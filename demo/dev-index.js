
import { createApp } from 'vue'
import { installDemoComponents, i18n } from './init'
import debugRouteMixin from './routes/debug-route-mixin'
import hljs from './hljs'
import DemoRouterView from './DemoRouterView'
import naive from '../src/index'
import './font'
import { routes, childRoutes } from './routes/routes'
import createDemoRouter from './routes/router'

debugRouteMixin(routes, childRoutes)
naive.setHljs(hljs)

const app = createApp(DemoRouterView)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
app.use(i18n)
installDemoComponents(app)

app.mount('#app')
