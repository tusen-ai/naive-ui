/* istanbul ignore file */
import NimbusIcon from './src/main.vue'

NimbusIcon.install = function (Vue) {
  Vue.component(NimbusIcon.name, NimbusIcon)
}

export default NimbusIcon
