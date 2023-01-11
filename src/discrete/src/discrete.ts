import { Component } from 'vue'
import { NMessageProvider } from '../../message'
import { NDialogProvider } from '../../dialog'
import { NNotificationProvider } from '../../notification'
import { NLoadingBarProvider } from '../../loading-bar'
import { createDiscreteApp } from './discreteApp'
import { DiscreteApi, DiscreteApiOptions, DiscreteApiType } from './interface'

export function createDiscreteApi<T extends DiscreteApiType> (
  includes: T[],
  {
    configProviderProps,
    messageProviderProps,
    dialogProviderProps,
    notificationProviderProps,
    loadingBarProviderProps
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
    }
  })

  const discreteApp = createDiscreteApp({
    providersAndProps,
    configProviderProps
  })

  return discreteApp as any
}
