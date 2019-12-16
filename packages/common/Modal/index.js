import Modal from './src/Modal.vue'

Modal.install = function (Vue) {
  Vue.component(Modal.name, Modal)
}

export default Modal
