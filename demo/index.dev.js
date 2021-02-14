import { createApp } from 'vue'
import { installDemoComponents } from './init'
import SiteRoot from './SiteRoot.vue'
import naive from '../src/index'
import { routes, componentChildRoutes } from './routes/routes'
import createDemoRouter from './routes/router'

import debugRouteMixin from './routes/debug-route-mixin'
debugRouteMixin(routes, componentChildRoutes)

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
installDemoComponents(app)

app.mount('#app')
