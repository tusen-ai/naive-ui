import { useMessage as _useMessage } from 'naive-ui'
import type {
  MessageOptions,
  MessageReactive,
  MessageApi
} from 'naive-ui'
import { icons } from './icons'

export interface ExtendedApi {
  danger: (content: string, options: MessageOptions) => MessageReactive
}

export type TsMessageApi = MessageApi & ExtendedApi

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
