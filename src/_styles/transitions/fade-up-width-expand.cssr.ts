import type { CNode } from 'css-render'
import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const { cubicBezierEaseOut } = commonVariables

interface FadeUpWidthExpandTransition {
  duration?: string
}

export function fadeUpWidthExpandTransition ({
  duration = '.2s'
}: FadeUpWidthExpandTransition = {}): CNode[] {
  return [
    c('&.fade-up-width-expand-transition-leave-active', {
      transition: `
        opacity ${duration} ${cubicBezierEaseOut},
        max-width ${duration} ${cubicBezierEaseOut},
        transform ${duration} ${cubicBezierEaseOut}
      `
    }),
    c('&.fade-up-width-expand-transition-enter-active', {
      transition: `
        opacity ${duration} ${cubicBezierEaseOut},
        max-width ${duration} ${cubicBezierEaseOut},
        transform ${duration} ${cubicBezierEaseOut}
      `
    }),
    c('&.fade-up-width-expand-transition-enter-to', {
      opacity: 1,
      transform: 'translateX(0) translateY(0)'
    }),
    c('&.fade-up-width-expand-transition-enter-from', {
      maxWidth: '0 !important',
      opacity: 0,
      transform: 'translateY(60%)'
    }),
    c('&.fade-up-width-expand-transition-leave-from', {
      opacity: 1,
      transform: 'translateY(0)'
    }),
    c('&.fade-up-width-expand-transition-leave-to', {
      maxWidth: '0 !important',
      opacity: 0,
      transform: 'translateY(60%)'
    })
  ]
}
