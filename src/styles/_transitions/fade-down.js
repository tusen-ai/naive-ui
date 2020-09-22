import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../base/_common'

const {
  easeInOutCubicBezier
} = commonVariables

export default function ({
  name = 'fade-down',
  fromOffset = '-4px',
  enterCubicBezier = easeInOutCubicBezier,
  leaveCubicBezier = easeInOutCubicBezier
} = {}) {
  return [
    c(`&.${namespace}-${name}-transition-enter, &.${namespace}-${name}-transition-leave-to`, {
      opacity: 0,
      transform: `translateY(${fromOffset})`
    }),
    c(`&.${namespace}-${name}-transition-enter-to, &.${namespace}-${name}-transition-leave`, {
      opacity: 1,
      transform: 'translateY(0)'
    }),
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `opacity .3s ${leaveCubicBezier}, transform .3s ${leaveCubicBezier}`
    }),
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `opacity .3s ${enterCubicBezier}, transform .3s ${enterCubicBezier}`
    })
  ]
}
