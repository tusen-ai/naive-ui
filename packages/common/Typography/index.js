import header from './src/header'
import A from './src/A'
import P from './src/P'
import Blockquote from './src/blockquote'
import Hr from './src/hr'
import Ul from './src/ul'
import Ol from './src/ol'
import Li from './src/li'
import Text from './src/text'

const Typography = {
  install (Vue) {
    const H1 = header(1)
    const H2 = header(2)
    const H3 = header(3)
    const H4 = header(4)
    const H5 = header(5)
    const H6 = header(6)
    Vue.component(H1.name, H1)
    Vue.component(H2.name, H2)
    Vue.component(H3.name, H3)
    Vue.component(H4.name, H4)
    Vue.component(H5.name, H5)
    Vue.component(H6.name, H6)
    Vue.component(A.name, A)
    Vue.component(P.name, P)
    Vue.component(Blockquote.name, Blockquote)
    Vue.component(Hr.name, Hr)
    Vue.component(Ul.name, Ul)
    Vue.component(Ol.name, Ol)
    Vue.component(Li.name, Li)
    Vue.component(Text.name, Text)
  }
}

export default Typography
