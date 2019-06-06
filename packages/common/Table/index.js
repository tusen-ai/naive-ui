import NvTable from './src/main.vue'
import NvTh from './Th/src/main.vue'
import NvTr from './Tr/src/main.vue'
import NvTd from './Td/src/main.vue'

NvTable.install = function (Vue) {
  Vue.component(NvTable.name, NvTable)
  Vue.component(NvTh.name, NvTh)
  Vue.component(NvTr.name, NvTr)
  Vue.component(NvTd.name, NvTd)
}

export default NvTable
