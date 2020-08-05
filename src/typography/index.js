import header from './src/header'
import A from './src/a'
import P from './src/p'
import Blockquote from './src/blockquote'
import Hr from './src/hr'
import Ul from './src/ul'
import Ol from './src/ol'
import Li from './src/li'
import Text from './src/text'

// use this way to create name since builtin html tags
// can't be used as component name
function generateName (prefix, originalName) {
  return originalName.replace(/^N/, prefix)
}

const Typography = {
  install (Vue, naive) {
    const prefix = naive.componentPrefix
    const H1 = header(1)
    const H2 = header(2)
    const H3 = header(3)
    const H4 = header(4)
    const H5 = header(5)
    const H6 = header(6)
    Vue.component(generateName(prefix, H1.name), H1)
    Vue.component(generateName(prefix, H2.name), H2)
    Vue.component(generateName(prefix, H3.name), H3)
    Vue.component(generateName(prefix, H4.name), H4)
    Vue.component(generateName(prefix, H5.name), H5)
    Vue.component(generateName(prefix, H6.name), H6)
    Vue.component(generateName(prefix, A.name), A)
    Vue.component(generateName(prefix, P.name), P)
    Vue.component(generateName(prefix, Blockquote.name), Blockquote)
    Vue.component(generateName(prefix, Hr.name), Hr)
    Vue.component(generateName(prefix, Ul.name), Ul)
    Vue.component(generateName(prefix, Ol.name), Ol)
    Vue.component(generateName(prefix, Li.name), Li)
    Vue.component(generateName(prefix, Text.name), Text)
  }
}

export default Typography
