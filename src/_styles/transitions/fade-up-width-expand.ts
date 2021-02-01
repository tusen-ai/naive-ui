import { CNode } from 'css-render'
import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const { cubicBezierEaseOut } = commonVariables

interface FadeUpWidthExpandTransition {
  duration?: string
}

export default function fadeUpWidthExpandTransition ({
  duration = '.2s'
}: FadeUpWidthExpandTransition = {}): CNode[] {
  return [
    c(`&.${namespace}-fade-up-width-expand-transition-leave-active`, {
      transition: `
        opacity ${duration} ${cubicBezierEaseOut},
        max-width ${duration} ${cubicBezierEaseOut},
        transform ${duration} ${cubicBezierEaseOut}
      `
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-enter-active`, {
      transition: `
        opacity ${duration} ${cubicBezierEaseOut},
        max-width ${duration} ${cubicBezierEaseOut},
        transform ${duration} ${cubicBezierEaseOut}
      `
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-enter-to`, {
      opacity: 1,
      transform: 'translateX(0) translateY(0)'
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-enter-from`, {
      maxWidth: '0 !important',
      opacity: 0,
      transform: 'translateY(60%)'
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-leave-from`, {
      opacity: 1,
      transform: 'translateY(0)'
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-leave-to`, {
      maxWidth: '0 !important',
      opacity: 0,
      transform: 'translateY(60%)'
    })
  ]
}
