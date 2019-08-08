/* istanbul ignore file */
import BackTop from './src/main.vue'

BackTop.install = function (Vue) {
  Vue.component(BackTop.name, BackTop)
}

export default BackTop
