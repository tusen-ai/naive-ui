/* istanbul ignore file */
import Radio from './src/main.vue'
import RadioGroup from './src/RadioGroup.vue'

Radio.install = function (Vue) {
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
}

export default Radio
