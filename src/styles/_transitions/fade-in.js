import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../_common-style/base'

const {
  easeInOutCubicBezier
} = commonVariables

export default function ({
  enterDuration = '0.2s',
  leaveDuration = '0.2s',
  name = 'fade-in'
} = {}) {
  return [
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `all ${enterDuration} ${easeInOutCubicBezier}!important`
    }),
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `all ${leaveDuration} ${easeInOutCubicBezier}!important`
    }),
    c(`&.${namespace}-${name}-transition-enter, &.${namespace}-${name}-transition-leave-to`, {
      opacity: 0
    }),
    c(`&.${namespace}-${name}-transition-enter-to, &.${namespace}-${name}-transition-leave`, {
      opacity: 1
    })
  ]
}
