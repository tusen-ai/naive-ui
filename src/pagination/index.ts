import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NPaginationImpl from './src/Pagination'

export type {
  PaginationInfo,
  PaginationRenderLabel,
  PaginationSizeOption
} from './src/interface'
export { paginationProps } from './src/Pagination'
export type { PaginationProps, PaginationSlots } from './src/Pagination'
export type * from './src/public-types'

export const NPagination: WithNativeAttrs<
  typeof NPaginationImpl,
  HTMLAttributes
> = NPaginationImpl
