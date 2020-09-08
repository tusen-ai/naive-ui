/* istanbul ignore file */
import Affix from './src/Affix.vue'

Affix.install = function (app, naive) {
  app.component(naive.componentPrefix + Affix.name, Affix)
}

export default Affix
