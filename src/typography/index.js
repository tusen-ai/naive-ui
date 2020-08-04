import header from './src/header'
import A from './src/a'
import P from './src/p'
import Blockquote from './src/blockquote'
import Hr from './src/hr'
import Ul from './src/ul'
import Ol from './src/ol'
import Li from './src/li'
import Text from './src/text'

const Typography = {
  install (Vue, naive) {
    const H1 = header(1)
    const H2 = header(2)
    const H3 = header(3)
    const H4 = header(4)
    const H5 = header(5)
    const H6 = header(6)
    Vue.component(naive.componentPrefix + H1.name, H1)
    Vue.component(naive.componentPrefix + H2.name, H2)
    Vue.component(naive.componentPrefix + H3.name, H3)
    Vue.component(naive.componentPrefix + H4.name, H4)
    Vue.component(naive.componentPrefix + H5.name, H5)
    Vue.component(naive.componentPrefix + H6.name, H6)
    Vue.component(naive.componentPrefix + A.name, A)
    Vue.component(naive.componentPrefix + P.name, P)
    Vue.component(naive.componentPrefix + Blockquote.name, Blockquote)
    Vue.component(naive.componentPrefix + Hr.name, Hr)
    Vue.component(naive.componentPrefix + Ul.name, Ul)
    Vue.component(naive.componentPrefix + Ol.name, Ol)
    Vue.component(naive.componentPrefix + Li.name, Li)
    Vue.component(naive.componentPrefix + Text.name, Text)
  }
}

export default Typography
