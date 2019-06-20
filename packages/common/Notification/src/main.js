
import Vue from 'vue'
import NMessageCell from './MessageCell'

function attachMessageContainer () {
  let notificationContainer = document.querySelector('.n-notification.n-notification__container')
  console.log(notificationContainer)
  if (!notificationContainer) {
    notificationContainer = document.createElement('div')
    notificationContainer.classList.add('n-notification', 'n-notification__container')
    notificationContainer.style = `
          z-index: 300;
          position: fixed;
          left: 0;
          right: 15px;
          top: 10px;
          height: 0;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        `
    document.body.appendChild(notificationContainer)
  }
  return notificationContainer
}

const defaultOptions = {
  timeout: 50000,
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
  notify (notification, type = 'success', option = defaultOptions) {
    const notificationContainer = attachMessageContainer()
    const notificationCell = (new Vue({ ...NMessageCell, propsData: { type, notification: notification } })).$mount()
    registerMessageEl(notificationContainer, notificationCell.$el, option)
  }
}

export default NMessage
