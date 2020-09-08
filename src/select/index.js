/* istanbul ignore file */
import Select from './src/Select.vue'

Select.install = function (app, naive) {
  app.component(naive.componentPrefix + Select.name, Select)
}

export default Select
