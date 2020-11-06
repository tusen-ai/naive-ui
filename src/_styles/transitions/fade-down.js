import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../base/_common'

const {
  cubicBezierEaseInOut
} = commonVariables

export default function (options = {}) {
  const {
    name = 'fade-down',
    fromOffset = '-4px',
    enterDuration = '.3s',
    leaveDuration = '.3s',
    enterCubicBezier = cubicBezierEaseInOut,
    leaveCubicBezier = cubicBezierEaseInOut
  } = options
  return [
    c(`&.${namespace}-${name}-transition-enter-from, &.${namespace}-${name}-transition-leave-to`, {
      opacity: 0,
      transform: `translateY(${fromOffset})`
    }),
    c(`&.${namespace}-${name}-transition-enter-to, &.${namespace}-${name}-transition-leave-from`, {
      opacity: 1,
      transform: 'translateY(0)'
    }),
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `opacity ${leaveDuration} ${leaveCubicBezier}, transform ${leaveDuration} ${leaveCubicBezier}`
    }),
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `opacity ${enterDuration} ${enterCubicBezier}, transform ${enterDuration} ${enterCubicBezier}`
    })
  ]
}
