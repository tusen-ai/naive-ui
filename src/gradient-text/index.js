/* istanbul ignore file */
import GradientText from './src/GradientText.vue'

GradientText.install = function (app, naive) {
  app.component(naive.componentPrefix + GradientText.name, GradientText)
}

export default GradientText
