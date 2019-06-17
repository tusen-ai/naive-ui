import Modal from './src/main.vue'

Modal.install = function (Vue) {
  Vue.component(Modal.name, Modal)
}

export default Modal
