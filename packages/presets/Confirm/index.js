
import NConfirm from './src/Confirm.vue'

NConfirm.install = function (Vue) {
  Vue.component(NConfirm.name, NConfirm)
  Vue.component('NNimbusConfirmCard', NConfirm)
}

export default NConfirm
