import { CNode } from 'css-render'
import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const { cubicBezierEaseIn, cubicBezierEaseOut } = commonVariables

interface SlideInFromLeftTransitionOptions {
  duration?: string
  leaveDuration?: string
  name?: string
}

export default function ({
  duration = '0.3s',
  leaveDuration = '0.2s',
  name = 'slide-in-from-left'
}: SlideInFromLeftTransitionOptions = {}): CNode[] {
  return [
    c(`&.${namespace}-${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn}`
    }),
    c(`&.${namespace}-${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut}`
    }),
    c(`&.${namespace}-${name}-transition-enter-to`, {
      transform: 'translateX(0)'
    }),
    c(`&.${namespace}-${name}-transition-enter-from`, {
      transform: 'translateX(-100%)'
    }),
    c(`&.${namespace}-${name}-transition-leave-from`, {
      transform: 'translateX(0)'
    }),
    c(`&.${namespace}-${name}-transition-leave-to`, {
      transform: 'translateX(-100%)'
    })
  ]
}
