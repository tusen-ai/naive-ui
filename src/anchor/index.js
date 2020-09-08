/* istanbul ignore file */
import Anchor from './src/AnchorAdapter.vue'
import AnchorLink from './src/Link.vue'

Anchor.install = function (app, naive) {
  app.component(naive.componentPrefix + Anchor.name, Anchor)
  app.component(naive.componentPrefix + AnchorLink.name, AnchorLink)
}

export default Anchor
