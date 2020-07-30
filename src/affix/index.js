/* istanbul ignore file */
import Affix from './src/Affix.vue'

Affix.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Affix.name, Affix)
}

export default Affix
