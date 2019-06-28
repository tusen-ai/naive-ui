/* istanbul ignore file */
import Round from './src/main.vue'

Round.install = function (Vue) {
  Vue.component(Round.name, Round)
}

export default Round
