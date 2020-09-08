/* istanbul ignore file */
import Element from './src/Element.vue'

Element.install = function (app, naive) {
  app.component(naive.componentPrefix + Element.name, Element)
  app.component(naive.componentPrefix + 'El', Element)
}

export default Element
