import type {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes
} from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NAImpl from './src/a'
import NBlockquoteImpl from './src/blockquote'
import {
  NH1 as NH1Impl,
  NH2 as NH2Impl,
  NH3 as NH3Impl,
  NH4 as NH4Impl,
  NH5 as NH5Impl,
  NH6 as NH6Impl
} from './src/headers'
import NHrImpl from './src/hr'
import NLiImpl from './src/li'
import NOlImpl from './src/ol'
import NPImpl from './src/p'
import NTextImpl from './src/text'
import NUlImpl from './src/ul'

export { aProps } from './src/a'
export type { AProps } from './src/a'
export { blockquoteProps } from './src/blockquote'
export type { BlockquoteProps } from './src/blockquote'
export {
  headerProps as h1Props,
  headerProps as h2Props,
  headerProps as h3Props,
  headerProps as h4Props,
  headerProps as h5Props,
  headerProps as h6Props
} from './src/create-header'
export type { HeaderProps as H1Props } from './src/create-header'
export type { HeaderProps as H2Props } from './src/create-header'
export type { HeaderProps as H3Props } from './src/create-header'
export type { HeaderProps as H4Props } from './src/create-header'
export type { HeaderProps as H5Props } from './src/create-header'
export type { HeaderProps as H6Props } from './src/create-header'
export { olProps } from './src/ol'
export type { OlProps } from './src/ol'
export { pProps } from './src/p'
export type { PProps } from './src/p'
export { textProps } from './src/text'
export type { TextProps } from './src/text'
export { ulProps } from './src/ul'
export type { UlProps } from './src/ul'

export const NA: WithNativeAttrs<typeof NAImpl, AnchorHTMLAttributes> = NAImpl
export const NBlockquote: WithNativeAttrs<
  typeof NBlockquoteImpl,
  BlockquoteHTMLAttributes
> = NBlockquoteImpl
export const NH1: WithNativeAttrs<typeof NH1Impl, HTMLAttributes> = NH1Impl
export const NH2: WithNativeAttrs<typeof NH2Impl, HTMLAttributes> = NH2Impl
export const NH3: WithNativeAttrs<typeof NH3Impl, HTMLAttributes> = NH3Impl
export const NH4: WithNativeAttrs<typeof NH4Impl, HTMLAttributes> = NH4Impl
export const NH5: WithNativeAttrs<typeof NH5Impl, HTMLAttributes> = NH5Impl
export const NH6: WithNativeAttrs<typeof NH6Impl, HTMLAttributes> = NH6Impl
export const NHr: WithNativeAttrs<typeof NHrImpl, HTMLAttributes> = NHrImpl
export const NLi: WithNativeAttrs<typeof NLiImpl, LiHTMLAttributes> = NLiImpl
export const NOl: WithNativeAttrs<typeof NOlImpl, OlHTMLAttributes> = NOlImpl
export const NP: WithNativeAttrs<typeof NPImpl, HTMLAttributes> = NPImpl
export const NText: WithNativeAttrs<typeof NTextImpl, HTMLAttributes>
  = NTextImpl
export const NUl: WithNativeAttrs<typeof NUlImpl, HTMLAttributes> = NUlImpl
