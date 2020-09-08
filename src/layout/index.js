/* istanbul ignore file */
import Layout from './src/Layout.vue'
import LayoutHeader from './src/LayoutHeader.vue'
import LayoutFooter from './src/LayoutFooter.vue'
import LayoutSider from './src/LayoutSider.vue'

Layout.install = function (app, naive) {
  app.component(naive.componentPrefix + Layout.name, Layout)
  app.component(naive.componentPrefix + 'LayoutContent', Layout)
  app.component(naive.componentPrefix + LayoutHeader.name, LayoutHeader)
  app.component(naive.componentPrefix + LayoutFooter.name, LayoutFooter)
  app.component(naive.componentPrefix + LayoutSider.name, LayoutSider)
}

export default Layout
