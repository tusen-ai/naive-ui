/* istanbul ignore file */
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'
import FormItemCol from './src/FormItemCol'
import FormItemRow from './src/FormItemRow'

Form.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Form.name, Form)
  Vue.component(naive.componentPrefix + FormItem.name, FormItem)
  Vue.component(naive.componentPrefix + FormItemCol.name, FormItemCol)
  Vue.component(naive.componentPrefix + FormItemRow.name, FormItemRow)
}

export default Form
