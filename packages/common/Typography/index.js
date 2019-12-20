import H1 from './src/h1'
import H2 from './src/h2'
import H3 from './src/h3'
import H4 from './src/h4'
import H5 from './src/h5'
import H6 from './src/h6'
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
