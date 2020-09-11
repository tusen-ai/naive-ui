/* istanbul ignore file */
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'
import FormItemCol from './src/FormItemCol'
import FormItemRow from './src/FormItemRow'

Form.install = function (app, naive) {
  app.component(naive.componentPrefix + Form.name, Form)
  app.component(naive.componentPrefix + FormItem.name, FormItem)
  app.component(naive.componentPrefix + FormItemCol.name, FormItemCol)
  app.component(naive.componentPrefix + FormItemRow.name, FormItemRow)
}

export default Form
