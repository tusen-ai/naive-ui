import { createApp } from 'vue'
import naive from 'naive-ui'
import { installDemoComponents } from './init'
import SiteRoot from './SiteRoot.vue'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'
import tusimpleTheme from '../themes/tusimple'

naive.use(tusimpleTheme)

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
installDemoComponents(app)

app.mount('#app')
