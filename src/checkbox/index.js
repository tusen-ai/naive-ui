/* istanbul ignore file */
import NCheckbox from './src/Checkbox.vue'
import NCheckboxGroup from './src/CheckboxGroup.vue'

NCheckbox.install = function (app, naive) {
  app.component(naive.componentPrefix + NCheckbox.name, NCheckbox)
  app.component(naive.componentPrefix + NCheckboxGroup.name, NCheckboxGroup)
}

export default NCheckbox
