
import Vue from 'vue'
import NMessageCell from './MessageCell'

function attachMessageContainer () {
  let messageContainer = document.querySelector('.n-message.n-message__container')
  console.log(messageContainer)
  if (!messageContainer) {
    messageContainer = document.createElement('div')
    messageContainer.classList.add('n-message', 'n-message__container')
    messageContainer.style = `
          z-index: 300;
          position: fixed;
          left: 0;
          right: 0;
          top: 20px;
          height: 0;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
        `
    document.body.appendChild(messageContainer)
  }
  return messageContainer
}

const defaultOptions = {
  timeout: 5000,
  emergeTransitionTimeout: 300,
  vanishTransitionTimeout: 300
}

function registerMessageEl (container, el, option) {
  el.classList.add('is-going-to-emerge')
  container.appendChild(el)
  el.getBoundingClientRect()
  el.classList.remove('is-going-to-emerge')
  setTimeout(function () {
    setTimeout(function () {
      setTimeout(function () {
        container.removeChild(el)
      }, option.vanishTransitionTimeout)
      el.classList.add('is-vanishing')
    }, option.timeout)
  }, option.emergeTransitionTimeout)
}

const NMessage = {
  notice (content, type = 'success', option = defaultOptions) {
    const messageContainer = attachMessageContainer()
    const messageCell = (new Vue({ ...NMessageCell, propsData: { type, content } })).$mount()
    registerMessageEl(messageContainer, messageCell.$el, option)
  },
  success (content) {
    this.notice(content, 'success')
  },
  error (content) {
    this.notice(content, 'error')
  }
}

export default NMessage
