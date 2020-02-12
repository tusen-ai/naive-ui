/* istanbul ignore file */
import Select from './src/Select.vue'

Select.install = function (Vue) {
  Vue.component(Select.name, Select)
}

export default Select
