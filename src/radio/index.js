/* istanbul ignore file */
import Radio from './src/Radio.vue'
import RadioGroup from './src/RadioGroup.vue'
import RadioButton from './src/RadioButton.vue'

Radio.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Radio.name, Radio)
  Vue.component(naive.componentPrefix + RadioGroup.name, RadioGroup)
  Vue.component(naive.componentPrefix + RadioButton.name, RadioButton)
}

export default Radio
