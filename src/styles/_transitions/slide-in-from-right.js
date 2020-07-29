import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../_common-style/base'

const {
  easeInCubicBezier,
  easeOutCubicBezier
} = commonVariables

export default function ({
  duration = '0.3s',
  leaveDuration = '0.2s',
  name = 'slide-in-from-right'
} = {}) {
  return [
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${easeInCubicBezier}`
    }),
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `transform ${duration} ${easeOutCubicBezier}`
    }),
    c(`&.${namespace}-${name}-transition-enter-to`, {
      transform: `translateX(0)`
    }),
    c(`&.${namespace}-${name}-transition-enter`, {
      transform: `translateX(100%)`
    }),
    c(`&.${namespace}-${name}-transition-leave`, {
      transform: `translateX(0)`
    }),
    c(`&.${namespace}-${name}-transition-leave-to`, {
      transform: `translateX(100%)`
    })
  ]
}
