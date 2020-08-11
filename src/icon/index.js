/* istanbul ignore file */
import Icon from './src/Icon.vue'

Icon.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Icon.name, Icon)
}

export default Icon
