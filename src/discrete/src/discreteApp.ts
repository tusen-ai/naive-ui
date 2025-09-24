import type { App, Component, VNode } from 'vue'
import type { ConfigProviderProps } from '../../config-provider'
import type { DialogApi } from '../../dialog'
import type { LoadingBarApi } from '../../loading-bar'
import type { MessageApi } from '../../message'
import type { ModalApi } from '../../modal'
import type { NotificationApi } from '../../notification'
import type { DiscreteApiType, MaybeRef } from './interface'
import { createApp, h, unref } from 'vue'
import { isBrowser, warn } from '../../_utils'
import { NConfigProvider } from '../../config-provider'
import { useDialog } from '../../dialog'
import { useLoadingBar } from '../../loading-bar'
import { useMessage } from '../../message'
import { useModal } from '../../modal'
import { useNotification } from '../../notification'
import { NInjectionExtractor } from './InjectionExtractor'

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

export function createDiscreteApp({
  providersAndProps,
  configProviderProps
}: DiscreteAppOptions): DiscreteApp {
  let app: App<Element> | null = createApp(App)
  const extractedApi: Omit<DiscreteApp, 'unmount'> = {
    app
  }
  function App(): VNode {
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
