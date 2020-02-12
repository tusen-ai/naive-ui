/* istanbul ignore file */
import Affix from './src/main.vue'

Affix.install = function (Vue) {
  Vue.component(Affix.name, Affix)
}

export default Affix
