/* istanbul ignore file */
import Slider from './src/Slider.vue'

Slider.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Slider.name, Slider)
}

export default Slider
