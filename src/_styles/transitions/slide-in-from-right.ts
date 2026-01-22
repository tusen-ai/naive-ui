import type { CNode } from 'css-render'
import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const { cubicBezierEaseIn, cubicBezierEaseOut, duration, durationFast }
  = commonVariables

interface SlideInFromRightTransitionOptions {
  duration?: string
  leaveDuration?: string
  name?: string
}

export function slideInFromRightTransition({
  duration: durationParam = duration,
  leaveDuration = durationFast,
  name = 'slide-in-from-right'
}: SlideInFromRightTransitionOptions = {}): CNode[] {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${durationParam} ${cubicBezierEaseOut}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: 'translateX(0)'
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: 'translateX(100%)'
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: 'translateX(0)'
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: 'translateX(100%)'
    })
  ]
}
