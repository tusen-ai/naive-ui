import NNotificationEnvironment from './NotificationEnvironment'
import NNotificationContainer from './NotificationContainer'

function mountNotificationContainer () {
  let container = Notification.container
  if (!container) {
    container = new Notification.Vue(Object.assign(NNotificationContainer, {
      propsData: {
        scrollable: Notification.scrollable
      }
    }))
    container.$mount()
    Notification.container = container
    document.body.appendChild(container.$el)
  }
  return container
}

function unmountNotificationContainer () {
  const container = Notification.container
  if (Notification.instances.size) {
    const instances = Array.from(Notification.instances)
    instances.forEach(unmountNotification)
  }
  if (container) {
    const el = container.$el
    if (el && el.parentElement) {
      el.parentElement.removeChild(el)
    }
    container.$destroy()
    Notification.container = null
  }
}

function createNotification (option) {
  const instance = new Notification.Vue(Object.assign(
    NNotificationEnvironment,
    {
      propsData: {
        onDestroy: unmountNotification,
        duration: option.duration
      }
    }
  ))
  updateNotification(instance, option)
  return instance
}

function mountNotification (instance) {
  if (!Notification.container) {
    throw new Error('[naive-ui/notification]: container not exist when try to mount notification')
  }
  Notification.instances.add(instance)
  instance.$mount()
  const el = instance.$el
  if (Notification.scrollable) {
    const slot = Notification.container.$refs.scrollbar.$refs.scrollContent
    slot.appendChild(el)
  } else {
    const slot = Notification.container.$el
    slot.appendChild(el)
  }
}

function unmountNotification (instance) {
  Notification.instances.delete(instance)
  const el = instance.$el
  if (el && el.parentElement) {
    el.parentElement.removeChild(el)
  }
  instance.$destroy()
  if (!Notification.instances.size) {
    unmountNotificationContainer()
  }
}

function updateNotification (instance, option) {
  Object.keys(option).forEach(key => {
    if (instance.hasOwnProperty(key)) {
      instance[key] = option[key]
    }
  })
}

const Notification = {
  theme: null,
  inheritedTheme: null,
  instances: new Set(),
  container: null,
  _scrollable: false,
  get scrollable () {
    return Notification._scrollable
  },
  set scrollable (value) {
    if (value !== Notification._scrollable) {
      Notification._scrollable = value
      unmountNotificationContainer()
    }
  },
  handleThemeChange (theme) {
    const container = Notification.container
    Notification.inheritedTheme = theme
    const syntheticTheme = Notification.theme || Notification.inheritedTheme
    if (container) {
      container.theme = syntheticTheme
    }
    Notification.instances.forEach(instance => {
      instance.inheritedTheme = syntheticTheme
    })
  },
  open (options, type = 'default') {
    mountNotificationContainer()
    const syntheticTheme = Notification.theme || Notification.inheritedTheme
    if (Notification.container && syntheticTheme) {
      Notification.container.theme = syntheticTheme
    }
    const notificationOptions = { type, ...options, inheritedTheme: syntheticTheme }
    const instance = createNotification(notificationOptions)
    mountNotification(instance)
    return instance
  },
  success (option) {
    return this.open(option, 'success')
  },
  info (option) {
    return this.open(option, 'info')
  },
  warning (option) {
    return this.open(option, 'warning')
  },
  error (option) {
    return this.open(option, 'error')
  }
}

export default Notification
