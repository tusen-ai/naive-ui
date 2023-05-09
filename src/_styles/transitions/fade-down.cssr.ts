import type { CNode } from 'css-render'
import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const { cubicBezierEaseInOut } = commonVariables

interface FadeDownTransitionOptions {
  name?: string
  fromOffset?: string
  enterDuration?: string
  leaveDuration?: string
  enterCubicBezier?: string
  leaveCubicBezier?: string
}

export function fadeDownTransition ({
  name = 'fade-down',
  fromOffset = '-4px',
  enterDuration = '.3s',
  leaveDuration = '.3s',
  enterCubicBezier = cubicBezierEaseInOut,
  leaveCubicBezier = cubicBezierEaseInOut
}: FadeDownTransitionOptions = {}): CNode[] {
  return [
    c(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
      opacity: 0,
      transform: `translateY(${fromOffset})`
    }),
    c(`&.${name}-transition-enter-to, &.${name}-transition-leave-from`, {
      opacity: 1,
      transform: 'translateY(0)'
    }),
    c(`&.${name}-transition-leave-active`, {
      transition: `opacity ${leaveDuration} ${leaveCubicBezier}, transform ${leaveDuration} ${leaveCubicBezier}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `opacity ${enterDuration} ${enterCubicBezier}, transform ${enterDuration} ${enterCubicBezier}`
    })
  ]
}
