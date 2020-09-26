/* istanbul ignore file */
import Steps from './src/Steps'
import Step from './src/Step'

Steps.install = function (app, naive) {
  app.component(naive.componentPrefix + Steps.name, Steps)
  app.component(naive.componentPrefix + Step.name, Step)
}

export default Steps
