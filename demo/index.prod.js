import { createApp } from 'vue'
import naive, { NThemeEditor } from 'naive-ui'
import { installDemoComponents } from './setup'
import SiteRoot from './SiteRoot.vue'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(naive)
app.component('NThemeEditor', NThemeEditor)
installDemoComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
