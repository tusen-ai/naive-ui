import Table from './src/Table.vue'
import Th from './src/Th.vue'
import Tr from './src/Tr.vue'
import Td from './src/Td.vue'
import Thead from './src/Thead.vue'
import Tbody from './src/Tbody.vue'

Table.install = function (Vue) {
  Vue.component(Table.name, Table)
  Vue.component(Th.name, Th)
  Vue.component(Tr.name, Tr)
  Vue.component(Td.name, Td)
  Vue.component(Tbody.name, Tbody)
  Vue.component(Thead.name, Thead)
}

export default Table
