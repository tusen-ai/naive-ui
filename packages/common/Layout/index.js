/* istanbul ignore file */
import Layout from './src/Layout.vue'
import LayoutHeader from './src/LayoutHeader.vue'
import LayoutFooter from './src/LayoutFooter.vue'
import LayoutSider from './src/LayoutSider.vue'

Layout.install = function (Vue) {
  Vue.component(Layout.name, Layout)
  Vue.component('NLayoutContent', Layout)
  Vue.component(LayoutHeader.name, LayoutHeader)
  Vue.component(LayoutFooter.name, LayoutFooter)
  Vue.component(LayoutSider.name, LayoutSider)
}

export default Layout
