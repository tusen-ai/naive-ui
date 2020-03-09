/* istanbul ignore file */
import CustomAdd from './src/main.vue'

CustomAdd.install = function (Vue) {
  Vue.component(CustomAdd.name, CustomAdd)
  Vue.component('NCustomAdd', CustomAdd)
}

export default CustomAdd
