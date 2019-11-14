/* istanbul ignore file */
import Select from './src/SelectAdapter.vue'
import SelectOption from './src/SelectOption'

Select.install = function (Vue) {
  Vue.component(Select.name, Select)
  Vue.component(SelectOption.name, SelectOption)
}

export default Select
