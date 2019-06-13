import NTbody from './src/main.vue'

NTbody.install = function (Vue) {
  Vue.component(NTbody.name, NTbody)
}

export default NTbody
