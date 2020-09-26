/* istanbul ignore file */
import Radio from './src/Radio.vue'
import RadioGroup from './src/RadioGroup'
import RadioButton from './src/RadioButton.vue'

Radio.install = function (app, naive) {
  app.component(naive.componentPrefix + Radio.name, Radio)
  app.component(naive.componentPrefix + RadioGroup.name, RadioGroup)
  app.component(naive.componentPrefix + RadioButton.name, RadioButton)
}

export default Radio
