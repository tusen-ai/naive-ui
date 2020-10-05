import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../../styles/base/_common'

const {
  cubicBezierEaseIn,
  cubicBezierEaseOut,
  transformDebounceScale
} = commonVariables

export default function (options = {}) {
  const {
    transformOrigin = 'inherit',
    duration = '.2s',
    enterScale = '.9',
    originalTransform = '',
    originalTransition = ''
  } = options
  return [
    c(`&.${namespace}-fade-in-scale-up-transition-leave-active`, {
      transformOrigin,
      transition: `opacity ${duration} ${cubicBezierEaseIn}, transform ${duration} ${cubicBezierEaseIn} ${originalTransition && ',' + originalTransition}`
    }),
    c(`&.${namespace}-fade-in-scale-up-transition-enter-active`, {
      transformOrigin,
      transition: `opacity ${duration} ${cubicBezierEaseOut}, transform ${duration} ${cubicBezierEaseOut} ${originalTransition && ',' + originalTransition}`
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
