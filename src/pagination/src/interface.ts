import { VNode } from 'vue'

export type RenderPrefix = (info: {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
}) => VNode

export type RenderSuffix = RenderPrefix
