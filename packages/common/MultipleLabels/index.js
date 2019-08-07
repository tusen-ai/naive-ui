/* istanbul ignore file */
import MultipleLabels from './src/main.vue'

MultipleLabels.install = function (Vue) {
  Vue.component(MultipleLabels.name, MultipleLabels)
}

export default MultipleLabels
