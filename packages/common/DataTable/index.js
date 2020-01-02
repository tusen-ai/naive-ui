/*
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-25 10:13:50
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-10-25 11:24:13
 */

import DataTable from './src/main.vue'

DataTable.install = function (Vue) {
  DataTable.Vue = Vue
  Vue.component(DataTable.name, DataTable)
  Vue.component('NAdvancedTable', DataTable)
}

export default DataTable
