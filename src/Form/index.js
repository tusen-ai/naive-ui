/* istanbul ignore file */
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'
import FormItemCol from './src/FormItemCol'
import FormItemRow from './src/FormItemRow'

Form.install = function (app, naive) {
  app.component(Form.name + naive.componentPrefix, Form)
  app.component(FormItem.name + naive.componentPrefix, FormItem)
  app.component(FormItemCol.name + naive.componentPrefix, FormItemCol)
  app.component(FormItemRow.name + naive.componentPrefix, FormItemRow)
}

export default Form
