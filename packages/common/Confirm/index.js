import Confirm from './src/index.js'
import ConfirmComp from './src/confirm.vue'

Confirm.install = function (Vue) {
  Vue.prototype.$NModal = Confirm
  Vue.component(ConfirmComp.name, ConfirmComp)
}
export default Confirm
