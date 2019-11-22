/* istanbul ignore file */
import AutoComplete from './src/main.vue'

AutoComplete.install = function (Vue) {
  Vue.component(AutoComplete.name, AutoComplete)
}

export default AutoComplete
