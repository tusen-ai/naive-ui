import MessageEnvironment from './MessageEnvironment'
import MessageContainer from './MessageContainer'

function mountMessageContainer () {
  if (!Message.container) {
    const container = new Message.Vue(MessageContainer)
    container.$mount()
    document.body.appendChild(container.$el)
    Message.container = container
  }
  return Message.container
}

function unmountMessageContainer () {
  const container = Message.container
  if (Message.instances.size) {
    const instances = Array.from(Message.instances)
    instances.forEach(unmountMessage)
  }
  if (container) {
    const el = container.$el
    if (el) {
      el.parentElement.removeChild(el)
    }
    Message.container = null
    container.$destroy()
  }
}

function createMessage (content, option) {
  const instance = new Message.Vue(Object.assign(MessageEnvironment, {
    propsData: {
      duration: option.duration,
      onDestroy: unmountMessage
    }
  }))
  updateMessage(instance, content, option)
  return instance
}

function mountMessage (instance) {
  if (!Message.container) throw new Error('[naive-ui/message]: container not exist when try to mount message')
  Message.instances.add(instance)
  instance.$mount()
  Message.container.$el.appendChild(instance.$el)
}

function updateMessage (instance, content, option) {
  instance.icon = option.icon
  instance.type = option.type
  instance.content = content
  instance.theme = Message.theme
}

function unmountMessage (instance) {
  Message.instances.delete(instance)
  const el = instance.$el
  if (el && el.parentElement) {
    el.parentElement.removeChild(el)
  }
  instance.$destroy()
  if (!Message.instances.size) {
    unmountMessageContainer()
  }
}

const Message = {
  Vue: null,
  container: null,
  options: {
    zIndex: 6000,
    top: 20
  },
  theme: null,
  instances: new Set(),
  handleThemeChange (theme) {
    for (const instance of this.instances) {
      instance.theme = theme
    }
  },
  notice (content, option) {
    mountMessageContainer()
    const instance = createMessage(content, option)
    mountMessage(instance)
    return instance
  },
  info (content, option = {}) {
    option.type = 'info'
    return this.notice(content, option)
  },
  success (content, option = {}) {
    option.type = 'success'
    return this.notice(content, option)
  },
  warning (content, option = {}) {
    option.type = 'warning'
    return this.notice(content, option)
  },
  error (content, option = {}) {
    option.type = 'error'
    return this.notice(content, option)
  },
  loading (content, option = {}) {
    option.type = 'loading'
    return this.notice(content, option)
  }
}

export default Message
