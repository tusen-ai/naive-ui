/* istanbul ignore file */
import Anchor from './src/AnchorAdapter.vue'
import AnchorLink from './src/Link.vue'

Anchor.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Anchor.name, Anchor)
  Vue.component(naive.componentPrefix + AnchorLink.name, AnchorLink)
}

export default Anchor
