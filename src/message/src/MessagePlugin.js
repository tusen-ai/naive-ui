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
  instance.theme = option.theme
  instance.closable = option.closable
  instance.inheritedTheme = option.inheritedTheme
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
  inheritedTheme: null,
  instances: new Set(),
  handleThemeChange (theme) {
    Message.inheritedTheme = theme
    const syntheticTheme = Message.theme || Message.inheritedTheme
    for (const instance of Message.instances) {
      instance.inheritedTheme = syntheticTheme
    }
  },
  notice (content, option) {
    mountMessageContainer()
    const syntheticTheme = Message.theme || Message.inheritedTheme
    const instance = createMessage(content, Object.assign(option, {
      inheritedTheme: syntheticTheme
    }))
    mountMessage(instance)
    return instance
  },
  info (content, option = {}) {
    option.type = 'info'
    return Message.notice(content, option)
  },
  success (content, option = {}) {
    option.type = 'success'
    return Message.notice(content, option)
  },
  warning (content, option = {}) {
    option.type = 'warning'
    return Message.notice(content, option)
  },
  error (content, option = {}) {
    option.type = 'error'
    return Message.notice(content, option)
  },
  loading (content, option = {}) {
    option.type = 'loading'
    return Message.notice(content, option)
  }
}

export default Message
