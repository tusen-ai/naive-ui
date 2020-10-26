
import { createApp } from 'vue'
import { installDemoComponents } from './init'
// import debugRouteMixin from './routes/debug-route-mixin'
import hljs from './hljs'
import DemoRouterView from './DemoRouterView.vue'
import naive from '../../src/index'
import './font'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'

// debugRouteMixin(routes, childRoutes)
naive.setHljs(hljs)

const app = createApp(DemoRouterView)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
installDemoComponents(app)

app.mount('#app')
