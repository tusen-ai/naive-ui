import type { CSSProperties, Ref, VNode, VNodeChild } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { ButtonProps } from '../../button'
import type { PopoverPlacement } from '../../popover'
import type { GuideTheme } from '../styles'
import { createInjectionKey } from '../../_utils'

export type GuideTarget
  = | string
    | HTMLElement
    | (() => HTMLElement | null)
    | null
    | undefined

export interface GuideStep {
  title?: string
  content?: string | (() => VNodeChild)
  target?: GuideTarget
  placement?: PopoverPlacement
  showArrow?: boolean
}

export interface GuideSlotProps {
  step: GuideStep
  current: number
  total: number
}

export interface GuideSlots {
  default?: (props: GuideSlotProps) => VNode[]
  title?: (props: GuideSlotProps) => VNode[]
  actions?: (props: GuideSlotProps) => VNode[]
  indicator?: (props: GuideSlotProps) => VNode[]
}

export interface GuideInst {
  next: () => void
  prev: () => void
  finish: () => void
  close: () => void
  syncPosition: () => void
}

export interface GuideTargetRect {
  top: number
  left: number
  width: number
  height: number
  borderRadius: number
}

export type GuideButtonProps = ButtonProps

export interface GuideInjection {
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<GuideTheme>>
}

export const guideInjectionKey = createInjectionKey<GuideInjection>('n-guide')

export type GuidePanelStyle = string | CSSProperties
