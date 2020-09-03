import Table from './src/Table.vue'
import Th from './src/Th.vue'
import Tr from './src/Tr.vue'
import Td from './src/Td.vue'
import Thead from './src/Thead.vue'
import Tbody from './src/Tbody.vue'

Table.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Table.name, Table)
  Vue.component(naive.componentPrefix + Th.name, Th)
  Vue.component(naive.componentPrefix + Tr.name, Tr)
  Vue.component(naive.componentPrefix + Td.name, Td)
  Vue.component(naive.componentPrefix + Tbody.name, Tbody)
  Vue.component(naive.componentPrefix + Thead.name, Thead)
}

export default Table
