import { InjectionKey } from 'vue'
import { ssrAdapter } from '@css-render/vue3-ssr'

export const ssrInjectionKey: InjectionKey<typeof ssrAdapter> = Symbol('ssr')
