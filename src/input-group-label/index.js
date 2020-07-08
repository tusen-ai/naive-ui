/* istanbul ignore file */
import InputGroupLabel from './src/InputGroupLabel.vue'

InputGroupLabel.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + InputGroupLabel.name, InputGroupLabel)
}

export default InputGroupLabel
