/* istanbul ignore file */
import NCheckbox from './src/main.vue'
import NCheckboxGroup from './src/CheckboxGroup.vue'

NCheckbox.install = function (Vue) {
  Vue.component(NCheckbox.name, NCheckbox)
  Vue.component(NCheckboxGroup.name, NCheckboxGroup)
}

export default NCheckbox
