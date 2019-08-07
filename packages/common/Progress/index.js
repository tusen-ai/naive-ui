/* istanbul ignore file */
import Progress from './src/main.vue'

Progress.install = function (Vue) {
  Vue.component(Progress.name, Progress)
}

export default Progress
