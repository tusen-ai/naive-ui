import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../_common-style/base'

const {
  easeOutCubicBezier
} = commonVariables

export default function fadeUpWidthExpandTransition ({
  duration = '.2s'
} = {}) {
  return [
    c(`&.${namespace}-fade-up-width-expand-transition-leave-active`, {
      transition: `opacity ${duration} ${easeOutCubicBezier}, max-width ${duration} ${easeOutCubicBezier}, transform ${duration} ${easeOutCubicBezier}`
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-enter-active`, {
      transition: `opacity ${duration} ${easeOutCubicBezier}, max-width ${duration} ${easeOutCubicBezier}, transform ${duration} ${easeOutCubicBezier}`
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-enter-to`, {
      opacity: 1,
      transform: `translateX(0) translateY(0)`
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-enter`, {
      maxWidth: '0 !important',
      opacity: 0,
      transform: 'translateY(60%)'
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-leave`, {
      opacity: 1,
      transform: 'translateY(0)'
    }),
    c(`&.${namespace}-fade-up-width-expand-transition-leave-to`, {
      maxWidth: '0 !important',
      opacity: '0 !important',
      transform: 'translateY(60%)'
    })
  ]
}
