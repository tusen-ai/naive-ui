import { VNodeChild } from 'vue'

export type PaginationInfo = Parameters<RenderPrefix>[0]

export type RenderPrefix = (info: {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
  itemCount: number | undefined
}) => VNodeChild

export type RenderSuffix = RenderPrefix
export type RenderNext = RenderPrefix
export type RenderPrev = RenderPrefix
