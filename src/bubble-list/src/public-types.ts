import type { BubbleProps } from 'naive-ui'
import type { VNode } from 'vue'

export type LLMRoleType = 'assistant' | 'user' | string

export type RoleType = Partial<Omit<BubbleProps, 'content'>> & {
  [key: string]: any
}

export type BubbleListRolesType = Record<LLMRoleType, RoleType>

export type BubbleListData = {
  role: LLMRoleType
  content: string
  [key: string]: any

  //  Preset
  // thinking_enabled: Boolean;
  // thinking_content: String;
  // thinking_elapsed_secs: Number;
} & Partial<Omit<BubbleProps, 'content'>>

export type BubbleListAvatarSlot = (props: {
  item: BubbleListData
  index: number
}) => VNode[]
export type BubbleListHeaderSlot = (props: {
  item: BubbleListData
  index: number
}) => VNode[]
export type BubbleListFooterSlot = (props: {
  item: BubbleListData
  index: number
}) => VNode[]
export type BubbleListContentSlot = (props: {
  item: BubbleListData
  index: number
}) => VNode[]
export type BubbleListLoadingSlot = (props: {
  item: BubbleListData
  index: number
}) => VNode[]

export interface BubbleListSlots {
  avatar?: BubbleListAvatarSlot
  header?: BubbleListHeaderSlot
  footer?: BubbleListFooterSlot
  content?: BubbleListContentSlot
  loading?: BubbleListLoadingSlot
}

export interface BubbleListInst {
  scrollTo: ((options: {
    silent?: boolean
    position: 'top' | 'bottom'
  }) => void) &
  ((options: { silent?: boolean, top: number }) => void)
}
