import type { HTMLAttributes, LiHTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NListImpl from './src/List'
import NListItemImpl from './src/ListItem'

export { listProps } from './src/List'
export type { ListProps, ListSlots } from './src/List'
export type { ListItemSlots } from './src/ListItem'

export const NList: WithNativeAttrs<typeof NListImpl, HTMLAttributes>
  = NListImpl
export const NListItem: WithNativeAttrs<
  typeof NListItemImpl,
  LiHTMLAttributes
> = NListItemImpl
