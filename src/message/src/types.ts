import { VNodeChild } from 'vue'
import { MessageSetupProps } from './message-props'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

// We should export keepAliveOnHover since it's not managed by users
export type RenderMessageProps = Pick<
MessageSetupProps,
| 'closable'
| 'content'
| 'icon'
| 'onMouseenter'
| 'onMouseleave'
| 'onClose'
| 'type'
>

export type MessageProviderRenderMessage = (
  props: RenderMessageProps
) => VNodeChild

export interface MessageOptions {
  duration?: number
  closable?: boolean
  keepAliveOnHover?: boolean
  icon?: () => VNodeChild
  onClose?: () => void
  onLeave?: () => void
  onAfterLeave?: () => void
}
