import Table from './src/Table.vue'
import Th from './src/Th.vue'
import Tr from './src/Tr.vue'
import Td from './src/Td.vue'
import Thead from './src/Thead.vue'
import Tbody from './src/Tbody.vue'

Table.install = function (app, naive) {
  app.component(naive.componentPrefix + Table.name, Table)
  app.component(naive.componentPrefix + Th.name, Th)
  app.component(naive.componentPrefix + Tr.name, Tr)
  app.component(naive.componentPrefix + Td.name, Td)
  app.component(naive.componentPrefix + Tbody.name, Tbody)
  app.component(naive.componentPrefix + Thead.name, Thead)
}

export default Table
