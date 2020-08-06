/* istanbul ignore file */
import BackTop from './src/BackTop.vue'

BackTop.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + BackTop.name, BackTop)
}

export default BackTop
