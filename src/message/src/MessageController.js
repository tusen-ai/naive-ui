import { Fragment, ref, h, nextTick, toRef } from 'vue'
import createId from '../../_utils/vue/createId'
import MessageEnvironment from './MessageEnvironment.js'
import { useContainer } from '../../_utils/composition'
import omit from '../../_utils/vue/omit'

export default {
  name: 'MessageController',
  props: {
    to: {
      type: [String, Object],
      default: 'body'
    }
  },
  setup (props) {
    const messageListRef = ref([])
    const [mountContainerIfNotExist, unmountContainerIfEmpty] = useContainer(
      toRef(props, 'to'),
      ref('n-message-container')
    )
    return {
      messageList: messageListRef,
      mountContainerIfNotExist,
      unmountContainerIfEmpty
    }
  },
  methods: {
    create (content, options = {}) {
      this.mountContainerIfNotExist()
      const key = createId()
      const messageReactive = {
        ...options,
        content,
        key,
        destroy: () => {
          this.$refs[`n-message-${key}`].hide()
        }
      }
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
      nextTick(() => {
        this.unmountContainerIfEmpty()
      })
    }
  },
  render () {
    return h(Fragment, null, this.messageList.map(
      message => h(MessageEnvironment, {
        ref: `n-message-${message.key}`,
        ...omit(message, ['destroy']),
        onInternalAfterLeave: this.handleAfterLeave
      }))
    )
  }
}
