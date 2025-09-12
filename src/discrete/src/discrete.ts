import type { Component } from 'vue'
import type {
  DiscreteApi,
  DiscreteApiOptions,
  DiscreteApiType
} from './interface'
import { NDialogProvider } from '../../dialog'
import { NLoadingBarProvider } from '../../loading-bar'
import { NMessageProvider } from '../../message'
import { NModalProvider } from '../../modal/src/ModalProvider'
import { NNotificationProvider } from '../../notification'
import { createDiscreteApp } from './discreteApp'

export function createDiscreteApi<T extends DiscreteApiType>(
  includes: T[],
  {
    configProviderProps,
    messageProviderProps,
    dialogProviderProps,
    notificationProviderProps,
    loadingBarProviderProps,
    modalProviderProps
  }: DiscreteApiOptions = {}
): DiscreteApi<T> {
  const providersAndProps: Array<{
    type: DiscreteApiType
    Provider: Component
    props: any
  }> = []

  includes.forEach((type) => {
    switch (type) {
      case 'message':
        providersAndProps.push({
          type,
          Provider: NMessageProvider,
          props: messageProviderProps
        })
        break
      case 'notification':
        providersAndProps.push({
          type,
          Provider: NNotificationProvider,
          props: notificationProviderProps
        })
        break
      case 'dialog':
        providersAndProps.push({
          type,
          Provider: NDialogProvider,
          props: dialogProviderProps
        })
        break
      case 'loadingBar':
        providersAndProps.push({
          type,
          Provider: NLoadingBarProvider,
          props: loadingBarProviderProps
        })
        break
      case 'modal':
        providersAndProps.push({
          type,
          Provider: NModalProvider,
          props: modalProviderProps
        })
    }
  })

  const discreteApp = createDiscreteApp({
    providersAndProps,
    configProviderProps
  })

  return discreteApp as any
}
