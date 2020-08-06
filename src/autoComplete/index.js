/* istanbul ignore file */
import AutoComplete from './src/AutoComplete.vue'

AutoComplete.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + AutoComplete.name, AutoComplete)
}

export default AutoComplete
