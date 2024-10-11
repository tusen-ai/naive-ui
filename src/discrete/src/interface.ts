import type { App, Ref } from 'vue'
import type { ConfigProviderProps } from '../../config-provider'
import type { DialogApi, DialogProviderProps } from '../../dialog'
import type { LoadingBarApi, LoadingBarProviderProps } from '../../loading-bar'
import type { MessageApi, MessageProviderProps } from '../../message'
import type {
  NotificationApi,
  NotificationProviderProps
} from '../../notification'
import type { ModalProviderProps } from '../../modal/src/ModalProvider'
import type { ModalApi } from '../../modal'

export type MaybeRef<T> = Ref<T> | T
export type MaybeRefOrGetter<T> = T | Ref<T> | (() => T)

export interface DiscreteApiOptions {
  configProviderProps?: MaybeRef<ConfigProviderProps>
  messageProviderProps?: MaybeRef<MessageProviderProps>
  dialogProviderProps?: MaybeRef<DialogProviderProps>
  notificationProviderProps?: MaybeRef<NotificationProviderProps>
  loadingBarProviderProps?: MaybeRef<LoadingBarProviderProps>
  modalProviderProps?: MaybeRef<ModalProviderProps>
}

export type DiscreteApiType =
  | 'message'
  | 'notification'
  | 'loadingBar'
  | 'dialog'
  | 'modal'

export type DiscreteApi<T extends DiscreteApiType = DiscreteApiType> = {
  unmount: () => void
  app: App
} & ('message' extends T ? { message: MessageApi } : Record<string, unknown>) &
('notification' extends T
  ? { notification: NotificationApi }
  : Record<string, unknown>) &
  ('dialog' extends T ? { dialog: DialogApi } : Record<string, unknown>) &
  ('loadingBar' extends T
    ? { loadingBar: LoadingBarApi }
    : Record<string, unknown>) &
    ('modal' extends T ? { modal: ModalApi } : Record<string, unknown>)
