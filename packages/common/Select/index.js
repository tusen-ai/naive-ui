/* istanbul ignore file */
import Select from './src/main.vue'

Select.install = function (Vue) {
  Vue.component(Select.name, Select)
}

export default Select
