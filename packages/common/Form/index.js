/* istanbul ignore file */
import Form from './src/main.vue'
import FormItem from './src/form-item.vue'

Form.install = function (Vue) {
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
}

export default Form
