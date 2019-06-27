/* istanbul ignore file */
import NCheckbox from './src/main.vue'

NCheckbox.install = function (Vue) {
  Vue.component(NCheckbox.name, NCheckbox)
}

export default NCheckbox
