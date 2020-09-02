/* istanbul ignore file */
import DatePicker from './src/DatePicker.vue'

DatePicker.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + DatePicker.name, DatePicker)
}

export default DatePicker
