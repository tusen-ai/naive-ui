/* istanbul ignore file */
import Badge from './src/main.vue'

Badge.install = function (Vue) {
  Vue.component(Badge.name, Badge)
}

export default Badge
