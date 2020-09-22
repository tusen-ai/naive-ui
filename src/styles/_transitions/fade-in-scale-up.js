import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../base/_common'

const {
  easeInCubicBezier,
  easeOutCubicBezier,
  transformDebounceScale
} = commonVariables

export default function ({
  transformOrigin = 'inherit',
  duration = '.2s',
  enterScale = '.9',
  originalTransform = '',
  originalTransition = ''
} = {}) {
  return [
    c(`&.${namespace}-fade-in-scale-up-transition-leave-active`, {
      transformOrigin,
      transition: `opacity ${duration} ${easeInCubicBezier}, transform ${duration} ${easeInCubicBezier} ${originalTransition && ',' + originalTransition}`
    }),
    c(`&.${namespace}-fade-in-scale-up-transition-enter-active`, {
      transformOrigin,
      transition: `opacity ${duration} ${easeOutCubicBezier}, transform ${duration} ${easeOutCubicBezier} ${originalTransition && ',' + originalTransition}`
    }),
    c(`&.${namespace}-fade-in-scale-up-transition-enter-from, &.${namespace}-fade-in-scale-up-transition-leave-to`, {
      opacity: 0,
      transform: `scale(${enterScale}) ${originalTransform}`
    }),
    c(`&.${namespace}-fade-in-scale-up-transition-leave-from, &.${namespace}-fade-in-scale-up-transition-enter-to`, {
      opacity: 1,
      transform: `scale(${transformDebounceScale}) ${originalTransform}`
    })
  ]
}
