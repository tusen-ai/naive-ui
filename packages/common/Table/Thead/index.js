import NThead from './src/main.vue'

NThead.install = function (Vue) {
  Vue.component(NThead.name, NThead)
}

export default NThead
