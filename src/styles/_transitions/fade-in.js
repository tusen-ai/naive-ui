import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../base/_common'

const {
  cubicBezierEaseInOut
} = commonVariables

export default function ({
  name = 'fade-in',
  enterDuration = '0.2s',
  leaveDuration = '0.2s',
  enterCubicBezier = cubicBezierEaseInOut,
  leaveCubicBezier = cubicBezierEaseInOut
} = {}) {
  return [
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `all ${enterDuration} ${enterCubicBezier}!important`
    }),
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `all ${leaveDuration} ${leaveCubicBezier}!important`
    }),
    c(`&.${namespace}-${name}-transition-enter-from, &.${namespace}-${name}-transition-leave-to`, {
      opacity: 0
    }),
    c(`&.${namespace}-${name}-transition-leave-from, &.${namespace}-${name}-transition-enter-to`, {
      opacity: 1
    })
  ]
}
