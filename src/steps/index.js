/* istanbul ignore file */
import Steps from './src/Steps.js'
import Step from './src/Step.vue'

Steps.install = function (app, naive) {
  app.component(naive.componentPrefix + Steps.name, Steps)
  app.component(naive.componentPrefix + Step.name, Step)
}

export default Steps
