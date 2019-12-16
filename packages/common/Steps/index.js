/* istanbul ignore file */
import Steps from './src/Steps.vue'
import Step from './src/Step'

Steps.install = function (Vue) {
  Vue.component(Steps.name, Steps)
  Vue.component(Step.name, Step)
}

export default Steps
