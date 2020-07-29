import DataTable from './src/DataTable.vue'

DataTable.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + DataTable.name, DataTable)
  // deprecated
  Vue.component(naive.componentPrefix + 'AdvancedTable', DataTable)
}

export default DataTable
