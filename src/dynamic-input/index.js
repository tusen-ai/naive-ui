/* istanbul ignore file */
import DynamicInput from './src/DynamicInput.vue'

DynamicInput.install = function (app, naive) {
  app.component(naive.componentPrefix + DynamicInput.name, DynamicInput)
}

export default DynamicInput
