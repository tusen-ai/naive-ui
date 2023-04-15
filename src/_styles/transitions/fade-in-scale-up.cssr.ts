import type { CNode } from 'css-render'
import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const {
  cubicBezierEaseIn,
  cubicBezierEaseOut
} = commonVariables

interface FadeInScaleUpTransitionOptions {
  transformOrigin?: string
  duration?: string
  enterScale?: string
  originalTransform?: string
  originalTransition?: string
}

export function fadeInScaleUpTransition ({
  transformOrigin = 'inherit',
  duration = '.2s',
  enterScale = '.9',
  originalTransform = '',
  originalTransition = ''
}: FadeInScaleUpTransitionOptions = {}): CNode[] {
  return [
    c('&.fade-in-scale-up-transition-leave-active', {
      transformOrigin,
      transition: `opacity ${duration} ${cubicBezierEaseIn}, transform ${duration} ${cubicBezierEaseIn} ${
        originalTransition && ',' + originalTransition
      }`
    }),
    c('&.fade-in-scale-up-transition-enter-active', {
      transformOrigin,
      transition: `opacity ${duration} ${cubicBezierEaseOut}, transform ${duration} ${cubicBezierEaseOut} ${
        originalTransition && ',' + originalTransition
      }`
    }),
    c('&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to', {
      opacity: 0,
      transform: `${originalTransform} scale(${enterScale})`
    }),
    c('&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to', {
      opacity: 1,
      transform: `${originalTransform} scale(1)`
    })
  ]
}
