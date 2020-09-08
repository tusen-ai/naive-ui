/* istanbul ignore file */
import AutoComplete from './src/AutoComplete.vue'

AutoComplete.install = function (app, naive) {
  app.component(naive.componentPrefix + AutoComplete.name, AutoComplete)
}

export default AutoComplete
