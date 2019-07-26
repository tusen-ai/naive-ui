
import Vue from 'vue'
import NMessageCell from './MessageCell'

function attachMessageContainer () {
  let messageContainer = document.querySelector('.n-message.n-message__container')
  if (!messageContainer) {
    messageContainer = document.createElement('div')
    messageContainer.classList.add('n-message', 'n-message__container')
    messageContainer.style = `
          z-index: 6000;
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
    }, option.duration)
  }, option.emergeTransitionTimeout)
}

/**
 * Create options for message
 * @param {Object} option
 * @param {string} option.type
 * @param {number} option.duration  by millisecond
 * @param {string} option.color
 * @param {string} option.icon
 * @param {string} option.iconColor
 */
function mixinOption (option) {
  const defaultOptions = {
    duration: 3000,
    emergeTransitionTimeout: 300,
    vanishTransitionTimeout: 300,
    type: 'success',
    color: null,
    icon: null,
    iconColor: null
  }
  if (option) {
    return { ...defaultOptions, ...option }
  } else {
    return defaultOptions
  }
}

const NMessage = {
  notice (content, option) {
    const messageContainer = attachMessageContainer()
    const messageCell = (new Vue({ ...NMessageCell, propsData: { option, content } })).$mount()
    registerMessageEl(messageContainer, messageCell.$el, mixinOption(option))
  },
  success (content, option) {
    option = mixinOption(option)
    option.type = 'success'
    this.notice(content, option)
  },
  warning (content, option) {
    option = mixinOption(option)
    option.type = 'warning'
    this.notice(content, option)
  },
  error (content, option) {
    option = mixinOption(option)
    option.type = 'error'
    this.notice(content, (option))
  }
}

export default NMessage
