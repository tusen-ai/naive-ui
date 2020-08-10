/* istanbul ignore file */
import GradientText from './src/GradientText.vue'

GradientText.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + GradientText.name, GradientText)
}

export default GradientText
