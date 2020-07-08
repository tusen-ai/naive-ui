/* istanbul ignore file */
import Badge from './src/Badge.vue'

Badge.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Badge.name, Badge)
}

export default Badge
