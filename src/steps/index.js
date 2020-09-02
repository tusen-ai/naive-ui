/* istanbul ignore file */
import Steps from './src/Steps.vue'
import Step from './src/Step'

Steps.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Steps.name, Steps)
  Vue.component(naive.componentPrefix + Step.name, Step)
}

export default Steps
