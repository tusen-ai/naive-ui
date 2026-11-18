import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NPageHeaderImpl from './src/PageHeader'

export { pageHeaderProps } from './src/PageHeader'
export type { PageHeaderProps, PageHeaderSlots } from './src/PageHeader'

export const NPageHeader: WithNativeAttrs<
  typeof NPageHeaderImpl,
  HTMLAttributes
> = NPageHeaderImpl
