import { createApp } from 'vue'
import naive from 'naive-ui'
import { installDemoComponents } from './init'
import SiteRoot from './SiteRoot.vue'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
installDemoComponents(app)

app.mount('#app')
