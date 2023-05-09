import type { CNode } from 'css-render'
import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const { cubicBezierEaseInOut } = commonVariables

interface FadeInTransitionOptions {
  name?: string
  enterDuration?: string
  leaveDuration?: string
  enterCubicBezier?: string
  leaveCubicBezier?: string
}

export function fadeInTransition ({
  name = 'fade-in',
  enterDuration = '0.2s',
  leaveDuration = '0.2s',
  enterCubicBezier = cubicBezierEaseInOut,
  leaveCubicBezier = cubicBezierEaseInOut
}: FadeInTransitionOptions = {}): CNode[] {
  return [
    c(`&.${name}-transition-enter-active`, {
      transition: `all ${enterDuration} ${enterCubicBezier}!important`
    }),
    c(`&.${name}-transition-leave-active`, {
      transition: `all ${leaveDuration} ${leaveCubicBezier}!important`
    }),
    c(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
      opacity: 0
    }),
    c(`&.${name}-transition-leave-from, &.${name}-transition-enter-to`, {
      opacity: 1
    })
  ]
}
