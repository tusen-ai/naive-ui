import { Fragment, h, reactive, ref, Teleport, defineComponent } from 'vue'
import { createId } from 'seemly'
import { useTheme } from '../../_mixins'
import { omit } from '../../_utils'
import { notificationLight } from '../styles'
import NotificationContainer from './NotificationContainer.vue'
import NotificationEnvironment from './NotificationEnvironment'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'NotificationProvider',
  provide () {
    return {
      NNotificationProvider: this,
      notification: {
        create: this.create,
        info: this.info,
        success: this.success,
        warning: this.warning,
        error: this.error
      }
    }
  },
  props: {
    ...useTheme.props,
    to: {
      type: [String, Object],
      default: undefined
    },
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const notificationListRef = ref([])
    const themeRef = useTheme(
      'Notification',
      'Notification',
      style,
      notificationLight,
      props
    )
    return {
      notificationList: notificationListRef,
      mergedTheme: themeRef
    }
  },
  methods: {
    create (options) {
      const key = createId()
      const notificationReactive = reactive({
        ...options,
        key,
        destroy: () => this.$refs[`n-notification-${key}`].hide()
      })
      this.notificationList.push(notificationReactive)
      return notificationReactive
    },
    ...['info', 'success', 'warning', 'error'].reduce((api, type) => {
      api[type] = function (options) {
        return this.create({ ...options, type })
      }
      return api
    }, {}),
    handleAfterLeave (key) {
      const { notificationList } = this
      notificationList.splice(
        notificationList.findIndex((notification) => notification.key === key),
        1
      )
    },
    // deprecated
    open (...args) {
      return this.create(...args)
    }
  },
  render () {
    return h(Fragment, null, [
      h(
        Teleport,
        {
          to: this.to ?? 'body'
        },
        [
          this.notificationList.length
            ? h(
              NotificationContainer,
              {
                scrollable: this.scrollable
              },
              {
                default: () => {
                  return this.notificationList.map((notification) =>
                    h(NotificationEnvironment, {
                      ref: `n-notification-${notification.key}`,
                      ...omit(notification, ['destroy']),
                      onInternalAfterLeave: this.handleAfterLeave
                    })
                  )
                }
              }
            )
            : null
        ]
      ),
      this.$slots.default()
    ])
  }
})
