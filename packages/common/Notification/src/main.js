import NNotificationCell from './NotificationCell'
import { getTheme } from '../../../utils/installThemeableComponent'

function setTheme (notificationContainer) {
  let theme = getTheme(this)
  const themeClasses = Array.from(notificationContainer.classList).filter(c =>
    c.endsWith('-theme')
  )
  themeClasses.forEach(c => notificationContainer.classList.remove(c))
  if (theme) notificationContainer.classList.add(`n-${theme}-theme`)
}

function attachNotificationContainer () {
  let notificationContainer = document.querySelector(
    '.n-notification.n-notification__container'
  )
  if (!notificationContainer) {
    notificationContainer = document.createElement('div')
    notificationContainer.classList.add(
      'n-notification',
      'n-notification__container'
    )
    notificationContainer.style = `
          z-index: 4000;
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
  emergeTransitionTimeout: 300,
  vanishTransitionTimeout: 300
}

const defaultNotification = {
  duration: null,
  avatar: null,
  action: () => {}
}

function mountNotificationEl (container, vm, option) {
  const el = vm.$el
  el.classList.add('is-going-to-emerge')
  container.appendChild(el)
  el.getBoundingClientRect()
  el.classList.remove('is-going-to-emerge')
  el.style['max-height'] = `${30 +
    vm.$refs.body.getBoundingClientRect().height}px`
}

function removeNotificationEl (container, el, option, notificationVueInstance) {
  setTimeout(function () {
    if (container.contains(el)) {
      const notification = notificationVueInstance.notification
      container.removeChild(el)
      if (notification.afterClose) {
        notification.afterClose(notificationVueInstance)
      }
    }
  }, option.vanishTransitionTimeout)
  el.classList.add('is-vanishing')
  el.style['max-height'] = '0'
}

const Notification = {
  notify (notification, type = 'success', option = defaultOptions) {
    notification = { ...defaultNotification, ...notification }
    const notificationContainer = attachNotificationContainer()
    setTheme.call(this, notificationContainer)
    const notificationCell = new Notification.Vue({
      ...NNotificationCell,
      propsData: { type, notification: notification },
      mounted () {
        if (notification.duration) {
          setTimeout(this.close, notification.duration)
        }
      },
      methods: {
        close () {
          if (notification.beforeClose) {
            let shouldClose = false
            notification.beforeClose(() => {
              shouldClose = true
            })
            if (!shouldClose) return
          }
          removeNotificationEl(notificationContainer, this.$el, option, this)
        },
        handleActionClick () {
          notification.action(this)
        }
      }
    }).$mount()
    mountNotificationEl(notificationContainer, notificationCell, option)
  }
}

export default Notification
