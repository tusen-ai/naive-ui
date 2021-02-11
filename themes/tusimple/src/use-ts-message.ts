import {
  useMessage as _useMessage,
  MessageOptions,
  MessageReactive,
  MessageApiInjection
} from 'naive-ui'
import { icons } from './icons'

export interface ExtendedApi {
  danger: (content: string, options: MessageOptions) => MessageReactive
}

export type TsMessageApi = MessageApiInjection & ExtendedApi

function useMessage (): TsMessageApi {
  const messageApi = _useMessage()
  const extendedApi: ExtendedApi = {
    danger: (content: string, options: MessageOptions) => {
      return messageApi.error(content, {
        ...options,
        icon: icons.warning
      })
    }
  }
  return Object.assign(extendedApi, messageApi)
}

export { useMessage }
