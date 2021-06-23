import {
  Fragment,
  ref,
  h,
  reactive,
  Teleport,
  defineComponent,
  provide,
  VNodeChild,
  InjectionKey,
  ExtractPropTypes,
  renderSlot,
  Ref
} from 'vue'
import { createId } from 'seemly'
import { ExtractPublicPropTypes, omit } from '../../_utils'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import MessageEnvironment from './MessageEnvironment'
import { MessageTheme } from '../styles'

export interface MessageOptions {
  duration?: number
  closable?: boolean
  icon?: () => VNodeChild
  onClose?: () => void
  onLeave?: () => void
  onAfterLeave?: () => void
}

type ContentType = string | (() => VNodeChild)

export interface MessageApiInjection {
  info: (content: ContentType, options?: MessageOptions) => MessageReactive
  success: (content: ContentType, options?: MessageOptions) => MessageReactive
  warning: (content: ContentType, options?: MessageOptions) => MessageReactive
  error: (content: ContentType, options?: MessageOptions) => MessageReactive
  loading: (content: ContentType, options?: MessageOptions) => MessageReactive
}

export const messageApiInjectionKey: InjectionKey<MessageApiInjection> =
  Symbol('messageApi')

export interface MessageReactive {
  content?: ContentType
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

export type MessageProviderInst = MessageApiInjection

const messageProviderProps = {
  ...(useTheme.props as ThemeProps<MessageTheme>),
  to: {
    type: [String, Object],
    default: undefined
  }
}

export type MessageProviderProps = ExtractPublicPropTypes<
  typeof messageProviderProps
>

type MessageProviderSetupProps = ExtractPropTypes<typeof messageProviderProps>

export const messageProviderInjectionKey: InjectionKey<{
  props: MessageProviderSetupProps
  mergedClsPrefixRef: Ref<string>
}> = Symbol('messageProvider')

export default defineComponent({
  name: 'MessageProvider',
  props: messageProviderProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const messageListRef = ref<PrivateMessageReactive[]>([])
    const messageRefs = ref<{ [key: string]: PrivateMessageRef }>({})
    const api: MessageApiInjection = {
      info (content: ContentType, options?: MessageOptions) {
        return create(content, { ...options, type: 'info' })
      },
      success (content: ContentType, options?: MessageOptions) {
        return create(content, { ...options, type: 'success' })
      },
      warning (content: ContentType, options?: MessageOptions) {
        return create(content, { ...options, type: 'warning' })
      },
      error (content: ContentType, options?: MessageOptions) {
        return create(content, { ...options, type: 'error' })
      },
      loading (content: ContentType, options?: MessageOptions) {
        return create(content, { ...options, type: 'loading' })
      }
    }
    provide(messageProviderInjectionKey, {
      props,
      mergedClsPrefixRef
    })
    provide(messageApiInjectionKey, api)
    function create (content: ContentType, options = {}): MessageReactive {
      const key = createId()
      const messageReactive = reactive({
        ...options,
        content,
        key,
        destroy: () => {
          messageRefs.value[key].hide()
        }
      })
      messageListRef.value.push(messageReactive)
      return messageReactive
    }
    function handleAfterLeave (key: string): void {
      messageListRef.value.splice(
        messageListRef.value.findIndex((message) => message.key === key),
        1
      )
    }
    return Object.assign(
      {
        mergedClsPrefix: mergedClsPrefixRef,
        messageRefs,
        messageList: messageListRef,
        handleAfterLeave
      },
      api
    )
  },
  render () {
    return (
      <>
        {renderSlot(this.$slots, 'default')}
        {this.messageList.length ? (
          <Teleport to={this.to ?? 'body'}>
            <div
              class={`${this.mergedClsPrefix}-message-container`}
              key="message-container"
            >
              {this.messageList.map((message) => {
                return (
                  <MessageEnvironment
                    ref={
                      ((inst: PrivateMessageRef) => {
                        this.messageRefs[message.key] = inst
                      }) as () => void
                    }
                    internalKey={message.key}
                    onInternalAfterLeave={this.handleAfterLeave}
                    {...omit(message, ['destroy'], undefined)}
                  />
                )
              })}
            </div>
          </Teleport>
        ) : null}
      </>
    )
  }
})
