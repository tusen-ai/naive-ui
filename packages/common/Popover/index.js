import NPopup from './src/main.vue'

NPopup.install = function (Vue) {
  Vue.component(NPopup.name, NPopup)
}

export default NPopup
