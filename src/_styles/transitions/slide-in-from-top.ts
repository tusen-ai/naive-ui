import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../new-common/_common'

const { cubicBezierEaseIn, cubicBezierEaseOut } = commonVariables

interface SlideInFromTopTransitionOptions {
  duration?: string
  leaveDuration?: string
  name?: String
}

export default function ({
  duration = '0.3s',
  leaveDuration = '0.2s',
  name = 'slide-in-from-top'
}: SlideInFromTopTransitionOptions = {}) {
  return [
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn}`
    }),
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut}`
    }),
    c(`&.${namespace}-${name}-transition-enter-to`, {
      transform: 'translateY(0)'
    }),
    c(`&.${namespace}-${name}-transition-enter-from`, {
      transform: 'translateY(-100%)'
    }),
    c(`&.${namespace}-${name}-transition-leave-from`, {
      transform: 'translateY(0)'
    }),
    c(`&.${namespace}-${name}-transition-leave-to`, {
      transform: 'translateY(-100%)'
    })
  ]
}
