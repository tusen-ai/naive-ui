import NTr from './src/main.vue'

NTr.install = function (Vue) {
  Vue.component(NTr.name, NTr)
}

export default NTr
