import DataTable from './src/DataTable.vue'

DataTable.install = function (Vue) {
  DataTable.Vue = Vue
  Vue.component(DataTable.name, DataTable)
  Vue.component('NAdvancedTable', DataTable)
}

export default DataTable
