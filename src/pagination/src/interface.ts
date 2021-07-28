import { VNodeChild } from 'vue'

export type RenderPrefix = (info: {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
}) => VNodeChild

export type RenderSuffix = RenderPrefix
export type RenderFastNext = RenderPrefix
export type RenderFastPrev = RenderPrefix
