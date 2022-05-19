import { Ref } from 'vue'
import { ConfigProviderProps } from '../../config-provider'
import { DialogApi, DialogProviderProps } from '../../dialog'
import { LoadingBarApi, LoadingBarProviderProps } from '../../loading-bar'
import { MessageApi, MessageProviderProps } from '../../message'
import { NotificationApi, NotificationProviderProps } from '../../notification'

export type MaybeRef<T> = Ref<T> | T

export interface MessageApiOptions {
  configProviderProps?: MaybeRef<ConfigProviderProps>
  messageProviderProps?: MaybeRef<MessageProviderProps>
}

export interface DialogApiOptions {
  configProviderProps?: MaybeRef<ConfigProviderProps>
  dialogProviderProps?: MaybeRef<DialogProviderProps>
}

export interface NotificationApiOptions {
  configProviderProps?: MaybeRef<ConfigProviderProps>
  notificationProviderProps?: MaybeRef<NotificationProviderProps>
}

export interface LoadingBarApiOptions {
  configProviderProps?: MaybeRef<ConfigProviderProps>
  loadingBarProviderProps?: MaybeRef<LoadingBarProviderProps>
}

export interface DiscreteApiOptions {
  configProviderProps?: MaybeRef<ConfigProviderProps>
  messageProviderProps?: MaybeRef<MessageProviderProps>
  dialogProviderProps?: MaybeRef<DialogProviderProps>
  notificationProviderProps?: MaybeRef<NotificationProviderProps>
  loadingBarProviderProps?: MaybeRef<LoadingBarProviderProps>
}

export interface BaseDiscreteApi {
  unmount: () => void
}

export type MessageDiscreteApi = BaseDiscreteApi & MessageApi
export type DialogDiscreteApi = BaseDiscreteApi & DialogApi
export type NotificationDiscreteApi = BaseDiscreteApi & NotificationApi
export type LoadingBarDiscreteApi = BaseDiscreteApi & LoadingBarApi

export interface DiscreteApi {
  message: MessageDiscreteApi
  dialog: DialogDiscreteApi
  notification: NotificationDiscreteApi
  loadingBar: LoadingBarDiscreteApi
  unmountAll: () => void
}
