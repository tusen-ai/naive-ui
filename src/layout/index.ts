import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NLayoutImpl from './src/Layout'
import NLayoutContentImpl from './src/LayoutContent'
import NLayoutFooterImpl from './src/LayoutFooter'
import NLayoutHeaderImpl from './src/LayoutHeader'
import NLayoutSiderImpl from './src/LayoutSider'

export type {
  LayoutInst as LayoutContentInst,
  LayoutInst,
  LayoutSiderInst
} from './src/interface'
export { layoutProps as layoutContentProps, layoutProps } from './src/Layout'
export type {
  LayoutProps as LayoutContentProps,
  LayoutProps
} from './src/Layout'
export { layoutFooterProps } from './src/LayoutFooter'
export type { LayoutFooterProps } from './src/LayoutFooter'
export { headerProps as layoutHeaderProps } from './src/LayoutHeader'
export type { LayoutHeaderProps } from './src/LayoutHeader'
export { layoutSiderProps } from './src/LayoutSider'
export type { LayoutSiderProps } from './src/LayoutSider'

export const NLayout: WithNativeAttrs<typeof NLayoutImpl, HTMLAttributes>
  = NLayoutImpl
export const NLayoutContent: WithNativeAttrs<
  typeof NLayoutContentImpl,
  HTMLAttributes
> = NLayoutContentImpl
export const NLayoutFooter: WithNativeAttrs<
  typeof NLayoutFooterImpl,
  HTMLAttributes
> = NLayoutFooterImpl
export const NLayoutHeader: WithNativeAttrs<
  typeof NLayoutHeaderImpl,
  HTMLAttributes
> = NLayoutHeaderImpl
export const NLayoutSider: WithNativeAttrs<
  typeof NLayoutSiderImpl,
  HTMLAttributes
> = NLayoutSiderImpl
