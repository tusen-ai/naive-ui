import NTable from './src/main.vue'
import NTh from './Th/src/main.vue'
import NTr from './Tr/src/main.vue'
import NTd from './Td/src/main.vue'
import NThead from './Thead/src/main.vue'
import NTbody from './TBody/src/main.vue'

NTable.install = function (Vue) {
  Vue.component(NTable.name, NTable)
  Vue.component(NTh.name, NTh)
  Vue.component(NTr.name, NTr)
  Vue.component(NTd.name, NTd)
  Vue.component(NTbody.name, NTbody)
  Vue.component(NThead.name, NThead)
}

export default NTable
