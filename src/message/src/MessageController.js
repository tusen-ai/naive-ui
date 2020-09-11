import { Fragment, ref, h, nextTick } from 'vue'
import createId from '../../_utils/vue/createId'
import MessageEnvironment from './MessageEnvironment.js'

function getContainerTarget (to) {
  return typeof to === 'string' ? document.querySelector(to) : to
}

function getContainer (to) {
  return getContainerTarget(to).querySelector('.n-message-container')
}

function mountContainer (to) {
  const targetEl = getContainerTarget(to)
  if (!targetEl.querySelector('.n-message-container')) {
    const containerEl = document.createElement('div')
    containerEl.className = 'n-message-container'
    targetEl.appendChild(containerEl)
  }
}

export default {
  name: 'MessageController',
  setup () {
    const messageListRef = ref([])
    return {
      messageList: messageListRef
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
      mountContainer(this.to)
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
        const container = getContainer(this.to)
        if (!container.childElementCount) {
          container.parentNode.removeChild(container)
        }
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
