import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NDrawerImpl from './src/Drawer'
import NDrawerContentImpl from './src/DrawerContent'

export { drawerProps } from './src/Drawer'
export type { DrawerProps } from './src/Drawer'
export type { Placement as DrawerPlacement } from './src/DrawerBodyWrapper'
export { drawerContentProps } from './src/DrawerContent'
export type {
  DrawerContentProps,
  DrawerContentSlots
} from './src/DrawerContent'

export const NDrawer: WithNativeAttrs<
  typeof NDrawerImpl,
  Omit<HTMLAttributes, 'role' | 'aria-modal'>
> = NDrawerImpl
export const NDrawerContent: WithNativeAttrs<
  typeof NDrawerContentImpl,
  HTMLAttributes
> = NDrawerContentImpl
