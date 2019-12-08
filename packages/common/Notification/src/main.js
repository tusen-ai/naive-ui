import NNotificationEnvironment from './NotificationEnvironment'
import NNotificationContainer from './notificationContainer'
import { getTheme } from '../../../utils/installThemeAwarableProperty'

function mountNotificationContainer (Vue) {
  let container = Notification.container
  if (!container) {
    container = new Vue(NNotificationContainer)
    container.$mount()
    Notification.container = container
    document.body.appendChild(container.$el)
  }
  return container
}

function unmountNotificationContainer () {
  const container = Notification.container
  if (container) {
    const el = container.$el
    if (el && el.parentElement) {
      el.parentElement.removeChild(el)
    }
    container.$destroy()
    Notification.container = null
  }
}

function mountNotification (container, instance) {
  Notification.instances.add(instance)
  instance.$mount()
  const el = instance.$el
  const slot = container.$refs.scrollbar.$refs.scrollContent
  slot.appendChild(el)
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
  instances: new Set(),
  configProvidersToWatchThemeChange: new WeakSet(),
  container: null,
  handleThemeChange (theme) {
    const container = Notification.container
    if (container) {
      container.theme = theme
    }
  },
  notify (options, type = 'default') {
    const { theme, configProvider } = getTheme(this)
    const container = mountNotificationContainer(Notification.Vue)
    if (container) {
      container.theme = theme
    }
    const configProviders = Notification.configProvidersToWatchThemeChange
    if (!configProviders.has(configProvider)) {
      configProviders.add(configProvider)
      configProvider.$watch('synthesizedTheme', Notification.handleThemeChange)
    }
    const notificationOptions = { theme, type, ...options }
    const instance = new Notification.Vue(Object.assign(
      NNotificationEnvironment,
      {
        propsData: {
          onDestroy: unmountNotification
        }
      }
    ))
    updateNotification(instance, notificationOptions)
    mountNotification(container, instance)
    return this.instance
  }
}

window.test = Notification.instances

export default Notification
