/* istanbul ignore file */
import BasePicker from './src/main.vue'

BasePicker.install = function (Vue) {
  Vue.component(BasePicker.name, BasePicker)
}

export default BasePicker
