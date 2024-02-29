import { type App, type Component, createApp, h, unref, type VNode } from 'vue'
import {
  type ConfigProviderProps,
  NConfigProvider
} from '../../config-provider'
import { type DialogApi, useDialog } from '../../dialog'
import { type LoadingBarApi, useLoadingBar } from '../../loading-bar'
import { type MessageApi, useMessage } from '../../message'
import { type NotificationApi, useNotification } from '../../notification'
import { type ModalApi, useModal } from '../../modal'
import { isBrowser, warn } from '../../_utils'
import { NInjectionExtractor } from './InjectionExtractor'
import type { DiscreteApiType, MaybeRef } from './interface'

export type Provider<P = any> = new (...args: any[]) => { $props: P }

export type ProviderProps<C> = C extends Provider<infer P> ? P : unknown

export interface DiscreteAppOptions {
  providersAndProps: Array<{
    type: DiscreteApiType
    Provider: Component
    props: any
  }>
  configProviderProps?: MaybeRef<ConfigProviderProps>
}

export interface DiscreteApp {
  unmount: () => void
  app: App
  message?: MessageApi
  notification?: NotificationApi
  dialog?: DialogApi
  loadingBar?: LoadingBarApi
  modal?: ModalApi
}

const injectionFactoryMap: Record<DiscreteApiType, any> = {
  message: useMessage,
  notification: useNotification,
  loadingBar: useLoadingBar,
  dialog: useDialog,
  modal: useModal
}

export function createDiscreteApp ({
  providersAndProps,
  configProviderProps
}: DiscreteAppOptions): DiscreteApp {
  const App = (): VNode => {
    return h(NConfigProvider, unref(configProviderProps), {
      default: () =>
        providersAndProps.map(({ type, Provider, props }) => {
          return h(Provider, unref(props), {
            default: () =>
              h(NInjectionExtractor, {
                onSetup: () =>
                  (extractedApi[type] = injectionFactoryMap[type]())
              })
          })
        })
    })
  }

  let app: App<Element> | null = createApp(App)
  const extractedApi: Omit<DiscreteApp, 'unmount'> = {
    app
  }

  let hostEl: Element | null
  if (isBrowser) {
    hostEl = document.createElement('div')
    document.body.appendChild(hostEl)

    app.mount(hostEl)
  }

  const unmount = (): void => {
    if (app === null || hostEl === null) {
      warn(
        'discrete',
        'unmount call no need because discrete app has been unmounted'
      )
      return
    }
    app.unmount()
    hostEl.parentNode?.removeChild(hostEl)
    hostEl = null
    app = null
  }

  return { unmount, ...extractedApi }
}
