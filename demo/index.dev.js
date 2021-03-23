import { createApp } from 'vue'
import { installDemoComponents } from './setup'
import SiteRoot from './SiteRoot.vue'
import naive from '../src/index'
import { routes, zhDocRoutes, enDocRoutes } from './routes/routes'
import createDemoRouter from './routes/router'

import debugRouteMixin from './routes/debug-route-mixin'
debugRouteMixin(routes, zhDocRoutes)
debugRouteMixin(routes, enDocRoutes)

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
installDemoComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
