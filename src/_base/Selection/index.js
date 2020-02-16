/* istanbul ignore file */
import BaseSelection from './src/main.vue'

BaseSelection.install = function (Vue) {
  Vue.component(BaseSelection.name, BaseSelection)
}

export default BaseSelection
