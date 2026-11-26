import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTabImpl from './src/Tab'
import NTabPaneImpl from './src/TabPane'
import NTabsImpl from './src/Tabs'

export type { TabsInst } from './src/interface'
export type * from './src/public-types'
export { tabProps } from './src/Tab'
export type { TabProps } from './src/Tab'
export { tabPaneProps } from './src/TabPane'
export type { TabPaneProps, TabPaneSlots } from './src/TabPane'
export { tabsProps } from './src/Tabs'
export type { TabsProps, TabsSlots } from './src/Tabs'

export const NTab: WithNativeAttrs<typeof NTabImpl, HTMLAttributes> = NTabImpl
export const NTabPane: WithNativeAttrs<typeof NTabPaneImpl, HTMLAttributes>
  = NTabPaneImpl
export const NTabs: WithNativeAttrs<typeof NTabsImpl, HTMLAttributes>
  = NTabsImpl
