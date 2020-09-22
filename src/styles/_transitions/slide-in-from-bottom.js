import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../base/_common'

const {
  easeInCubicBezier,
  easeOutCubicBezier
} = commonVariables

export default function ({
  duration = '0.3s',
  leaveDuration = '0.2s',
  name = 'slide-in-from-bottom'
} = {}) {
  return [
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${easeInCubicBezier}`
    }),
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `transform ${duration} ${easeOutCubicBezier}`
    }),
    c(`&.${namespace}-${name}-transition-enter-to`, {
      transform: `translateY(0)`
    }),
    c(`&.${namespace}-${name}-transition-enter`, {
      transform: `translateY(100%)`
    }),
    c(`&.${namespace}-${name}-transition-leave`, {
      transform: `translateY(0)`
    }),
    c(`&.${namespace}-${name}-transition-leave-to`, {
      transform: `translateY(100%)`
    })
  ]
}
