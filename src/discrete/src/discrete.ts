import { NMessageProvider, useMessage } from '../../message'
import { NDialogProvider, useDialog } from '../../dialog'
import { NNotificationProvider, useNotification } from '../../notification'
import { NLoadingBarProvider, useLoadingBar } from '../../loading-bar'
import { createDiscreteApp } from './discreteApp'
import {
  DialogApiOptions,
  DialogDiscreteApi,
  DiscreteApi,
  DiscreteApiOptions,
  LoadingBarApiOptions,
  LoadingBarDiscreteApi,
  MessageApiOptions,
  MessageDiscreteApi,
  NotificationApiOptions,
  NotificationDiscreteApi
} from './interface'

export function createMessageApi ({
  configProviderProps,
  messageProviderProps
}: MessageApiOptions = {}): MessageDiscreteApi {
  return createDiscreteApp({
    Provider: NMessageProvider,
    providerProps: messageProviderProps,
    configProviderProps: configProviderProps,
    injectionFactory: useMessage
  })
}

export function createDialogApi ({
  configProviderProps,
  dialogProviderProps
}: DialogApiOptions = {}): DialogDiscreteApi {
  return createDiscreteApp({
    Provider: NDialogProvider,
    providerProps: dialogProviderProps,
    configProviderProps: configProviderProps,
    injectionFactory: useDialog
  })
}

export function createNotificationApi ({
  configProviderProps,
  notificationProviderProps
}: NotificationApiOptions = {}): NotificationDiscreteApi {
  return createDiscreteApp({
    Provider: NNotificationProvider,
    providerProps: notificationProviderProps,
    configProviderProps: configProviderProps,
    injectionFactory: useNotification
  })
}

export function createLoadingBarApi ({
  configProviderProps,
  loadingBarProviderProps
}: LoadingBarApiOptions = {}): LoadingBarDiscreteApi {
  return createDiscreteApp({
    Provider: NLoadingBarProvider,
    providerProps: loadingBarProviderProps,
    configProviderProps: configProviderProps,
    injectionFactory: useLoadingBar
  })
}

export function createDiscreteApi ({
  configProviderProps,
  messageProviderProps,
  dialogProviderProps,
  notificationProviderProps,
  loadingBarProviderProps
}: DiscreteApiOptions = {}): DiscreteApi {
  const message = createMessageApi({
    configProviderProps,
    messageProviderProps
  })

  const dialog = createDialogApi({
    configProviderProps,
    dialogProviderProps
  })

  const notification = createNotificationApi({
    configProviderProps,
    notificationProviderProps
  })

  const loadingBar = createLoadingBarApi({
    configProviderProps,
    loadingBarProviderProps
  })

  const unmountAll = (): void => {
    message.unmount()
    dialog.unmount()
    notification.unmount()
    loadingBar.unmount()
  }
  return {
    message,
    dialog,
    notification,
    loadingBar,
    unmountAll
  }
}
