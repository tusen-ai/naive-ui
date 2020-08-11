import Modal from './src/Modal.vue'

Modal.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Modal.name, Modal)
}

export default Modal
