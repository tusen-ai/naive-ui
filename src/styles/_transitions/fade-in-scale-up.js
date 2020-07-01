import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../_common-style/base'

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
    c(`&.${namespace}-fade-in-scale-up-transition-enter, &.${namespace}-fade-in-scale-up-transition-leave-to`, {
      opacity: 0,
      transform: `scale(${enterScale}) ${originalTransform}`
    }),
    c(`&.${namespace}-fade-in-scale-up-transition-leave, &.${namespace}-fade-in-scale-up-transition-enter-to`, {
      opacity: 1,
      transform: `scale(${transformDebounceScale}) ${originalTransform}`
    })
  ]
}
