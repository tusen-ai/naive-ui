/* istanbul ignore file */
import Element from './src/Element.vue'

Element.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Element.name, Element)
  Vue.component(naive.componentPrefix + 'El', Element)
}

export default Element
