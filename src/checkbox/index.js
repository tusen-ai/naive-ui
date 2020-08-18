/* istanbul ignore file */
import NCheckbox from './src/Checkbox.vue'
import NCheckboxGroup from './src/CheckboxGroup.vue'

NCheckbox.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + NCheckbox.name, NCheckbox)
  Vue.component(naive.componentPrefix + NCheckboxGroup.name, NCheckboxGroup)
}

export default NCheckbox
