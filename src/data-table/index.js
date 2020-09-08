import DataTable from './src/DataTable.vue'

DataTable.install = function (app, naive) {
  app.component(naive.componentPrefix + DataTable.name, DataTable)
  // deprecated
  app.component(naive.componentPrefix + 'AdvancedTable', DataTable)
}

export default DataTable
