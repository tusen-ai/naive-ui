import {
  Fragment,
  ref,
  h,
  reactive,
  Teleport,
  defineComponent,
  provide,
  VNodeChild
} from 'vue'
import { createId } from 'seemly'
import { omit } from '../../_utils'
import { ThemePropsReactive, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import MessageEnvironment from './MessageEnvironment.js'
import { MessageType } from './message-props'
import { MessageTheme } from '../styles'

interface MessageOptions {
  duration?: number
  closable?: boolean
  icon?: () => VNodeChild
  onClose?: () => void
}

interface MessageInjection {
  info(content: string, options: MessageOptions): void
  success(content: string, options: MessageOptions): void
  warning(content: string, options: MessageOptions): void
  error(content: string, options: MessageOptions): void
  loading(content: string, options: MessageOptions): void
}

interface MessageReactive {
  content?: string
  duration?: number
  closable?: boolean
  icon?: () => VNodeChild
  onClose?: () => void
  destroy: () => void
}

interface PrivateMessageReactive extends MessageReactive {
  key: string
}

interface PrivateMessageRef extends MessageReactive {
  key: string
  hide: () => void
}

export default defineComponent({
  name: 'MessageProvider',
  props: {
    ...(useTheme.props as ThemeProps<MessageTheme>),
    to: {
      type: [String, Object],
      default: undefined
    }
  },
  setup (props) {
    const messageListRef = ref<PrivateMessageReactive[]>([])
    const messageRefs = ref<{ [key: string]: PrivateMessageRef }>({})
    const api: MessageInjection = ([
      'info',
      'success',
      'warning',
      'error',
      'loading'
    ] as MessageType[]).reduce((api, type) => {
      api[type] = function (content: string, options: MessageOptions) {
        return create(content, { ...options, type })
      }
      return api
    }, {} as MessageInjection)
    provide<ThemePropsReactive<MessageTheme>>('NMessageProvider', props)
    provide<MessageInjection>('message', api)
    function create (content: string, options = {}) {
      const key = createId()
      const messageReactive = reactive({
        ...options,
        content,
        key,
        destroy: () => {
          messageRefs.value[`n-message-${key}`].hide()
        }
      })
      messageListRef.value.push(messageReactive)
      return messageReactive
    }
    function handleAfterLeave (key: string) {
      messageListRef.value.splice(
        messageListRef.value.findIndex((message) => message.key === key),
        1
      )
    }
    return {
      messageRefs,
      messageList: messageListRef,
      handleAfterLeave
    }
  },
  render () {
    const { default: defaultSlot } = this.$slots
    return h(Fragment, null, [
      this.messageList.length
        ? h(
          Teleport,
          {
            to: this.to ?? 'body'
          },
          [
            h(
              'div',
              {
                class: 'n-message-container',
                key: 'n-message-container'
              },
              this.messageList.map((message) => {
                return h(MessageEnvironment, {
                  ref: ((inst: PrivateMessageRef) => {
                    this.messageRefs[`n-message-${message.key}`] = inst
                  }) as () => void,
                  internalKey: message.key,
                  onInternalAfterLeave: this.handleAfterLeave,
                  ...omit(message, ['destroy'], undefined)
                })
              })
            )
          ]
        )
        : null,
      defaultSlot && defaultSlot()
    ])
  }
})
