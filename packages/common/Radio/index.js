/* istanbul ignore file */
import Radio from './src/main.vue'
import RadioGroup from './src/RadioGroup.vue'
import RadioButton from './src/RadioButton.vue'

Radio.install = function (Vue) {
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
  Vue.component(RadioButton.name, RadioButton)
}

export default Radio
