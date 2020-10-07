import { Fragment, ref, h, reactive } from 'vue'
import { createId, omit } from '../../_utils/vue'
import { Teleport } from '../../_base'
import MessageEnvironment from './MessageEnvironment.js'

export default {
  name: 'MessageProvider',
  props: {
    to: {
      type: [String, Object],
      default: undefined
    }
  },
  provide () {
    return {
      message: {
        info: this.info,
        success: this.success,
        warning: this.warning,
        error: this.error,
        loading: this.loading
      }
    }
  },
  setup () {
    const messageListRef = ref([])
    return {
      messageList: messageListRef
    }
  },
  methods: {
    create (content, options = {}) {
      const key = createId()
      const messageReactive = reactive({
        ...options,
        content,
        key,
        destroy: () => {
          this.$refs[`n-message-${key}`].hide()
        }
      })
      this.messageList.push(messageReactive)
      return messageReactive
    },
    ...[
      'info',
      'success',
      'warning',
      'error',
      'loading'
    ].reduce((api, type) => {
      api[type] = function (content, options) {
        return this.create(content, { ...options, type })
      }
      return api
    }, {}),
    handleAfterLeave (key) {
      const { messageList } = this
      messageList.splice(
        messageList.findIndex(message => message.key === key),
        1
      )
    }
  },
  render () {
    return h(Fragment, null,
      [
        this.messageList.length ? h(Teleport, {
          to: this.to
        }, [
          h('div', {
            class: 'n-message-container',
            key: 'n-message-container'
          }, this.messageList.map(
            message => h(MessageEnvironment, {
              ref: `n-message-${message.key}`,
              ...omit(message, ['destroy']),
              onInternalAfterLeave: this.handleAfterLeave
            })
          ))
        ]) : null,
        this.$slots.default()
      ]
    )
  }
}
