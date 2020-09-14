import { Fragment, h, Teleport, reactive, ref } from 'vue'
import createId from '../../_utils/vue/createId'
import NotificationContainer from './NotificationContainer'
import NotificationEnvironment from './NotificationEnvironment'
import omit from '../../_utils/vue/omit'

export default {
  name: 'NotificationProvider',
  provide () {
    return {
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
    to: {
      type: [String, Object],
      default: 'body'
    },
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const notificationListRef = ref([])
    return {
      notificationList: notificationListRef
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
    ...[
      'info',
      'success',
      'warning',
      'error'
    ].reduce((api, type) => {
      api[type] = function (options) {
        return this.create({ ...options, type })
      }
      return api
    }, {}),
    handleAfterLeave (key) {
      const { notificationList } = this
      notificationList.splice(
        notificationList.findIndex(notification => notification.key === key),
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
      h(Teleport, {
        to: this.to
      }, [
        this.notificationList.length ? h(NotificationContainer, {
          scrollable: this.scrollable
        }, {
          default: () => {
            return this.notificationList.map(
              notification => h(NotificationEnvironment, {
                ref: `n-notification-${notification.key}`,
                ...omit(notification, ['destroy']),
                onInternalAfterLeave: this.handleAfterLeave
              })
            )
          }
        }) : null
      ]),
      this.$slots.default()
    ])
  }
}
