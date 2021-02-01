import { CNode } from 'css-render'
import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../common/_common'

interface IconSwitchTransitionOptions {
  originalTransform?: string
  left?: string | number
  top?: string | number
  transition?: string
}

export default function ({
  originalTransform = '',
  left = 0,
  top = 0,
  transition = `all .3s ${commonVariables.cubicBezierEaseInOut} !important`
}: IconSwitchTransitionOptions = {}): CNode[] {
  return [
    c(
      `&.${namespace}-icon-switch-transition-enter-from, &.${namespace}-icon-switch-transition-leave-to`,
      {
        transform: originalTransform + ' scale(0.75)',
        left,
        top,
        opacity: 0
      }
    ),
    c(
      `&.${namespace}-icon-switch-transition-enter-to, &.${namespace}-icon-switch-transition-leave-from`,
      {
        transform: `${commonVariables.transformDebounceScale} ${originalTransform}`,
        left,
        top,
        opacity: 1
      }
    ),
    c(
      `&.${namespace}-icon-switch-transition-enter-active, &.${namespace}-icon-switch-transition-leave-active`,
      {
        transformOrigin: 'center',
        position: 'absolute',
        left,
        top,
        transition
      }
    )
  ]
}
