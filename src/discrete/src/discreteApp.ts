import { App, Component, createApp, h, unref, VNode } from 'vue'
import { ConfigProviderProps, NConfigProvider } from '../../config-provider'
import { DialogApi, useDialog } from '../../dialog'
import { LoadingBarApi, useLoadingBar } from '../../loading-bar'
import { MessageApi, useMessage } from '../../message'
import { NotificationApi, useNotification } from '../../notification'
import { warn } from '../../_utils'
import { NInjectionExtractor } from './InjectionExtractor'
import { DiscreteApiType, MaybeRef } from './interface'

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
  message?: MessageApi
  notification?: NotificationApi
  dialog?: DialogApi
  loadingBar?: LoadingBarApi
}

const injectionFactoryMap: Record<DiscreteApiType, any> = {
  message: useMessage,
  notification: useNotification,
  loadingBar: useLoadingBar,
  dialog: useDialog
}

export function createDiscreteApp ({
  providersAndProps,
  configProviderProps
}: DiscreteAppOptions): DiscreteApp {
  const extractedApi: Omit<DiscreteApp, 'unmount'> = {}
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

  let hostEl: Element | null = document.createElement('div')
  document.body.appendChild(hostEl)

  app.mount(hostEl)

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
