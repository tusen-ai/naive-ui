import { createApp } from 'vue'
import { installDemoComponents } from './init'
import hljs from './hljs'
import DemoRouterView from './DemoRouterView'
import naive from '../src/index'
import './font'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'
import tusimpleTheme from '../themes/tusimple'

naive.setHljs(hljs)
naive.use(tusimpleTheme)

const app = createApp(DemoRouterView)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
installDemoComponents(app)

app.mount('#app')
