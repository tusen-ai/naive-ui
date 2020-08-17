/* istanbul ignore file */
import Select from './src/Select.vue'

Select.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Select.name, Select)
}

export default Select
