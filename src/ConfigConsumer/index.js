/* istanbul ignore file */
import ThemeConsumer from './src/main.vue'

ThemeConsumer.install = function (Vue) {
  Vue.component(ThemeConsumer.name, ThemeConsumer)
}

export default ThemeConsumer
