/* istanbul ignore file */
import Form from './src/main.vue'
import FormItem from './src/FormItem.vue'
import FormItemCol from './src/FormItemCol'
import FormItemRow from './src/FormItemRow'

Form.install = function (Vue) {
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
  Vue.component(FormItemCol.name, FormItemCol)
  Vue.component(FormItemRow.name, FormItemRow)
}

export default Form
