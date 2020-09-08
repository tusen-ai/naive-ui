/* istanbul ignore file */
import Slider from './src/Slider.vue'

Slider.install = function (app, naive) {
  app.component(naive.componentPrefix + Slider.name, Slider)
}

export default Slider
