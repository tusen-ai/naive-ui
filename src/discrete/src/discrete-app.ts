import { createApp, h, unref, VNode } from 'vue'
import { ConfigProviderProps, NConfigProvider } from '../../config-provider'
import { warn } from '../../_utils'
import { NInjectionExtractor } from './InjectionExtractor'
import { MaybeRef } from './interface'

export type Provider<P = any> = new (...args: any[]) => { $props: P }

export type ProviderProps<C> = C extends Provider<infer P> ? P : unknown

export interface DiscreteAppOptions<C, A> {
  Provider: C
  providerProps?: MaybeRef<ProviderProps<C>>
  configProviderProps?: MaybeRef<ConfigProviderProps>
  injectionFactory: () => A
}

export type DiscreteApp<A> = A & {
  unmount: () => void
}

export function createDiscreteApp<C extends Provider, A> ({
  Provider,
  providerProps,
  configProviderProps,
  injectionFactory
}: DiscreteAppOptions<C, A>): DiscreteApp<A> {
  let extractedApi: any = null

  const App = (): VNode => {
    return h(NConfigProvider, unref(configProviderProps), {
      default: () =>
        h(Provider, unref(providerProps), {
          default: () =>
            h(NInjectionExtractor, {
              onSetup: () => (extractedApi = injectionFactory())
            })
        })
    })
  }

  let app = createApp(App)

  let hostEl = document.createElement('div')
  document.body.appendChild(hostEl)

  app.mount(hostEl)

  const unmount = (): void => {
    if (app == null) {
      return warn(
        'discrete',
        'unmount call no need because discrete app has been unmounted'
      )
    }
    app.unmount()
    hostEl.parentNode?.removeChild(hostEl)
    ;(hostEl as any) = null
    ;(app as any) = null
  }

  return { unmount, ...extractedApi }
}
