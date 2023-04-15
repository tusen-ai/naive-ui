import type { CNode } from 'css-render'
import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const { cubicBezierEaseInOut } = commonVariables

interface FadeInWidthExpandTransition {
  duration?: string
  delay?: string
}

export function fadeInWidthExpandTransition ({
  duration = '.2s',
  delay = '.1s'
}: FadeInWidthExpandTransition = {}): CNode[] {
  return [
    c('&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to', {
      opacity: 1
    }),
    c('&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from', `
      opacity: 0!important;
      margin-left: 0!important;
      margin-right: 0!important;
    `),
    c('&.fade-in-width-expand-transition-leave-active', `
      overflow: hidden;
      transition:
        opacity ${duration} ${cubicBezierEaseInOut},
        max-width ${duration} ${cubicBezierEaseInOut} ${delay},
        margin-left ${duration} ${cubicBezierEaseInOut} ${delay},
        margin-right ${duration} ${cubicBezierEaseInOut} ${delay};
    `),
    c('&.fade-in-width-expand-transition-enter-active', `
      overflow: hidden;
      transition:
        opacity ${duration} ${cubicBezierEaseInOut} ${delay},
        max-width ${duration} ${cubicBezierEaseInOut},
        margin-left ${duration} ${cubicBezierEaseInOut},
        margin-right ${duration} ${cubicBezierEaseInOut};
    `)
  ]
}
