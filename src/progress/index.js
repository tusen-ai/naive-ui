/* istanbul ignore file */
import Progress from './src/Progress.vue'

Progress.install = function (app, naive) {
  app.component(naive.componentPrefix + Progress.name, Progress)
}

export default Progress
