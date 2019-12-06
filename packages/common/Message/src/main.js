import MessageEnvironment from './MessageEnvironment'

function attachMessageContainer () {
  let messageContainer = document.querySelector('.n-message-container')
  if (!messageContainer) {
    messageContainer = document.createElement('div')
    messageContainer.classList.add('n-message-container')
    messageContainer.style = `z-index: ${this.options.zIndex}; top: ${this.options.top}px;`
    document.body.appendChild(messageContainer)
  }
  return messageContainer
}

function detachMessageContainer () {
  let messageContainer = document.querySelector('.n-message-container')
  if (messageContainer) {
    messageContainer.parentElement.removeChild(messageContainer)
  }
}

function mountMessage (container, instance, option, instances) {
  const el = instance.$el
  el.classList.add('n-message--enter')
  container.appendChild(el)
  el.getBoundingClientRect()
  el.classList.remove('n-message--enter')
  setTimeout(function () {
    setTimeout(function () {
      setTimeout(function () {
        instance.$destroy()
        instances.delete(instance)
        container.removeChild(el)
        if (!instances.size) {
          detachMessageContainer()
        }
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
  theme: null,
  attachMessageContainer,
  instances: new Set(),
  handleThemeChange (theme) {
    for (const instance of this.instances) {
      instance.theme = theme
    }
  },
  notice (content, option) {
    const messageContainer = this.attachMessageContainer()
    const messageInstance = new this.Vue(MessageEnvironment)
    messageInstance.option = option
    messageInstance.content = content
    messageInstance.theme = this.theme
    messageInstance.$mount()
    this.instances.add(messageInstance)
    mountMessage(messageContainer, messageInstance, mixinOption(option), this.instances)
    return messageInstance
  },
  info (content, option) {
    option = mixinOption(option)
    option.type = 'info'
    return this.notice(content, option)
  },
  success (content, option) {
    option = mixinOption(option)
    option.type = 'success'
    return this.notice(content, option)
  },
  warning (content, option) {
    option = mixinOption(option)
    option.type = 'warning'
    return this.notice(content, option)
  },
  error (content, option) {
    option = mixinOption(option)
    option.type = 'error'
    return this.notice(content, option)
  }
}

export default NMessage
