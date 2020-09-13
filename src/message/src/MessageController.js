import { Fragment, ref, h, nextTick, toRef } from 'vue'
import createId from '../../_utils/vue/createId'
import MessageEnvironment from './MessageEnvironment.js'
import { useContainer } from '../../_utils/composition'

export default {
  name: 'MessageController',
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
  props: {
    to: {
      type: [String, Object],
      default: 'body'
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
        destroy: null
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
        ...message,
        controller: message,
        onInternalAfterLeave: this.handleAfterLeave
      }))
    )
  }
}
