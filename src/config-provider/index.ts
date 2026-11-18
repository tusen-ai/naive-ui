import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NConfigProviderImpl from './src/ConfigProvider'

export { configProviderProps } from './src/ConfigProvider'
export type { ConfigProviderProps } from './src/ConfigProvider'
export * from './src/interface'

export const NConfigProvider: WithNativeAttrs<
  typeof NConfigProviderImpl,
  HTMLAttributes
> = NConfigProviderImpl
