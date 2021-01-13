import { createApp } from 'vue'
import { installDemoComponents } from './init'
import hljs from './hljs'
import SiteRoot from './SiteRoot.vue'
import naive from '../src/index'
import './font'
import { routes, childRoutes } from './routes/routes'
import createDemoRouter from './routes/router'
import tusimpleTheme from '../themes/tusimple'

import debugRouteMixin from './routes/debug-route-mixin'
debugRouteMixin(routes, childRoutes)

naive.setHljs(hljs)
naive.use(tusimpleTheme)

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
installDemoComponents(app)

app.mount('#app')
