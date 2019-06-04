import Layout from './src/main.vue'

Layout.install = function (Vue) {
  Vue.component(Layout.name, Layout)
}

export default Layout
