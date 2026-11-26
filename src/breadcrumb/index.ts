import type { HTMLAttributes, LiHTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NBreadcrumbImpl from './src/Breadcrumb'
import NBreadcrumbItemImpl from './src/BreadcrumbItem'

export { breadcrumbProps } from './src/Breadcrumb'
export type { BreadcrumbProps } from './src/Breadcrumb'
export { breadcrumbItemProps } from './src/BreadcrumbItem'
export type {
  BreadcrumbItemProps,
  BreadcrumbItemSlots
} from './src/BreadcrumbItem'

export const NBreadcrumb: WithNativeAttrs<
  typeof NBreadcrumbImpl,
  HTMLAttributes
> = NBreadcrumbImpl
export const NBreadcrumbItem: WithNativeAttrs<
  typeof NBreadcrumbItemImpl,
  LiHTMLAttributes
> = NBreadcrumbItemImpl
