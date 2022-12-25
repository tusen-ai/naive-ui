import { VNodeChild } from 'vue'
import { SelectBaseOption } from '../../select/src/interface'

export type Size = 'small' | 'medium' | 'large'

export type PaginationInfo = Parameters<RenderPrefix>[0]

export type RenderPrefix = (info: {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
  itemCount: number | undefined
}) => VNodeChild

export type PaginationSizeOption = SelectBaseOption<number, string>
export type RenderSuffix = RenderPrefix
export type RenderNext = RenderPrefix
export type RenderPrev = RenderPrefix
export type RenderGoto = () => VNodeChild

export type PaginationRenderLabel = (
  info:
  | {
    type: 'fast-backward' | 'fast-forward'
    node: VNodeChild
    active: boolean
  }
  | {
    type: 'page'
    node: number
    active: boolean
  }
) => VNodeChild
