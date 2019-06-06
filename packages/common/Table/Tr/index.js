import NvTr from './src/main.vue'

NvTr.install = function (Vue) {
  Vue.component(NvTr.name, NvTr)
}

export default NvTr
