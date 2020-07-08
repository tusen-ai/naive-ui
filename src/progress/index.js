/* istanbul ignore file */
import Progress from './src/Progress.vue'

Progress.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Progress.name, Progress)
}

export default Progress
