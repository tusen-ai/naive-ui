/* istanbul ignore file */
import Badge from './src/Badge.vue'

Badge.install = function (Vue) {
  Vue.component(Badge.name, Badge)
}

export default Badge
