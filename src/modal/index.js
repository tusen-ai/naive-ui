import Modal from './src/Modal.vue'

Modal.install = function (app, naive) {
  app.component(naive.componentPrefix + Modal.name, Modal)
}

export default Modal
