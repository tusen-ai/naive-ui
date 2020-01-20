/* istanbul ignore file */
import Select from './src/Select.vue'
import SelectOption from './src/SelectOption.vue'

Select.install = function (Vue) {
  Vue.component(Select.name, Select)
  Vue.component('NSelectOption', SelectOption)
}

export default Select
