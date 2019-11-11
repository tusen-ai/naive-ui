import Message from './Message'

function setTheme (messageContainer) {
  const themeClasses = Array.from(messageContainer.classList).filter(c =>
    c.endsWith('-theme')
  )
  themeClasses.forEach(c => messageContainer.classList.remove(c))
  if (this.theme) messageContainer.classList.add(`n-${this.theme}-theme`)
}

function attachMessageContainer () {
  let messageContainer = document.querySelector('.n-message-container')
  if (!messageContainer) {
    messageContainer = document.createElement('div')
    messageContainer.classList.add('n-message-container')
    messageContainer.style = `z-index: ${this.options.zIndex}; top: ${this.options.top}px;`
    document.body.appendChild(messageContainer)
  }
  setTheme.call(this, messageContainer)
  return messageContainer
}

function registerMessageEl (container, el, option) {
  el.classList.add('n-message--enter')
  container.appendChild(el)
  el.getBoundingClientRect()
  el.classList.remove('n-message--enter')
  setTimeout(function () {
    setTimeout(function () {
      setTimeout(function () {
        container.removeChild(el)
      }, option.vanishTransitionTimeout)
      el.classList.add('n-message--leave')
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
  Vue: null,
  options: {
    zIndex: 6000,
    top: 20
  },
  attachMessageContainer,
  notice (content, option) {
    // console.log('test', this)
    const messageContainer = this.attachMessageContainer()
    const messageCell = new this.Vue({
      ...Message,
      propsData: { option, content }
    }).$mount()
    registerMessageEl(messageContainer, messageCell.$el, mixinOption(option))
  },
  info (content, option) {
    option = mixinOption(option)
    option.type = 'info'
    this.notice(content, option)
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
    this.notice(content, option)
  }
}

export default NMessage
