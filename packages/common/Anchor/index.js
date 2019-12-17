/* istanbul ignore file */
import Anchor from './src/AnchorAdapter.vue'
import AnchorLink from './src/Link.vue'

Anchor.install = function (Vue) {
  Vue.component(Anchor.name, Anchor)
  Vue.component(AnchorLink.name, AnchorLink)
}

export default Anchor
