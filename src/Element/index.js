/* istanbul ignore file */
import Element from './src/main.vue'

Element.install = function (Vue) {
  Vue.component(Element.name, Element)
  Vue.component('NEl', Element)
}

export default Element
