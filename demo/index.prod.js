import { createApp } from 'vue'
import naive from 'naive-ui'
import { installDemoComponents } from './init'
import hljs from './hljs'
import DemoRouterView from './DemoRouterView.vue'
import './font'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'

naive.setHljs(hljs)

const app = createApp(DemoRouterView)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
installDemoComponents(app)

app.mount('#app')
