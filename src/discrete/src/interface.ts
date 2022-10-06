import { App, Ref } from 'vue'
import { ConfigProviderProps } from '../../config-provider'
import { DialogApi, DialogProviderProps } from '../../dialog'
import { LoadingBarApi, LoadingBarProviderProps } from '../../loading-bar'
import { MessageApi, MessageProviderProps } from '../../message'
import { NotificationApi, NotificationProviderProps } from '../../notification'

export type MaybeRef<T> = Ref<T> | T

export interface DiscreteApiOptions {
  configProviderProps?: MaybeRef<ConfigProviderProps>
  messageProviderProps?: MaybeRef<MessageProviderProps>
  dialogProviderProps?: MaybeRef<DialogProviderProps>
  notificationProviderProps?: MaybeRef<NotificationProviderProps>
  loadingBarProviderProps?: MaybeRef<LoadingBarProviderProps>
}

export type DiscreteApiType =
  | 'message'
  | 'notification'
  | 'loadingBar'
  | 'dialog'

export type DiscreteApi<T extends DiscreteApiType = DiscreteApiType> = {
  unmount: () => void
  app: App
} & ('message' extends T ? { message: MessageApi } : {}) &
('notification' extends T ? { notification: NotificationApi } : {}) &
('dialog' extends T ? { dialog: DialogApi } : {}) &
('loadingBar' extends T ? { loadingBar: LoadingBarApi } : {})
