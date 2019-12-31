/* istanbul ignore file */
import DatePicker from './src/DatePicker.vue'

DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker)
}

export default DatePicker
