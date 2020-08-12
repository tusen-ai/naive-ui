import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../_common-style/base'

const {
  easeInOutCubicBezier
} = commonVariables

export default function ({
  name = 'fade-in',
  enterDuration = '0.2s',
  leaveDuration = '0.2s',
  enterCubicBezier = easeInOutCubicBezier,
  leaveCubicBezier = easeInOutCubicBezier
} = {}) {
  return [
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `all ${enterDuration} ${enterCubicBezier}!important`
    }),
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `all ${leaveDuration} ${leaveCubicBezier}!important`
    }),
    c(`&.${namespace}-${name}-transition-enter, &.${namespace}-${name}-transition-leave-to`, {
      opacity: 0
    }),
    c(`&.${namespace}-${name}-transition-enter-to, &.${namespace}-${name}-transition-leave`, {
      opacity: 1
    })
  ]
}
