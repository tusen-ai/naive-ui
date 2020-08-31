/* istanbul ignore file */
import Layout from './src/Layout.vue'
import LayoutHeader from './src/LayoutHeader.vue'
import LayoutFooter from './src/LayoutFooter.vue'
import LayoutSider from './src/LayoutSider.vue'

Layout.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Layout.name, Layout)
  Vue.component(naive.componentPrefix + 'LayoutContent', Layout)
  Vue.component(naive.componentPrefix + LayoutHeader.name, LayoutHeader)
  Vue.component(naive.componentPrefix + LayoutFooter.name, LayoutFooter)
  Vue.component(naive.componentPrefix + LayoutSider.name, LayoutSider)
}

export default Layout
