/* istanbul ignore file */
import Badge from './src/Badge.vue'

Badge.install = function (app, naive) {
  app.component(naive.componentPrefix + Badge.name, Badge)
}

export default Badge
