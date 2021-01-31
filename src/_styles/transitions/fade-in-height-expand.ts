import { CNode } from 'css-render'
import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../new-common/_common'

const {
  cubicBezierEaseInOut,
  cubicBezierEaseOut,
  cubicBezierEaseIn
} = commonVariables

interface FadeInHeightExpandTransitionOption {
  overflow?: string
  duration?: string
  originalTransition?: string
  leavingDelay?: string
  foldPadding?: boolean
  enterToProps?: Record<string, string | number> | undefined
  leaveToProps?: Record<string, string | number> | undefined
}

export default function ({
  overflow = 'hidden',
  duration = '.3s',
  originalTransition = '',
  leavingDelay = '0s',
  foldPadding = false,
  enterToProps = undefined,
  leaveToProps = undefined
}: FadeInHeightExpandTransitionOption = {}): CNode[] {
  return [
    c(
      `&.${namespace}-fade-in-height-expand-transition-leave-from, &.${namespace}-fade-in-height-expand-transition-enter-to`,
      {
        ...enterToProps,
        opacity: 1
      }
    ),
    c(
      `&.${namespace}-fade-in-height-expand-transition-leave-to, &.${namespace}-fade-in-height-expand-transition-enter-from`,
      {
        ...leaveToProps,
        opacity: 0,
        marginTop: '0 !important',
        marginBottom: '0 !important',
        paddingTop: foldPadding ? '0 !important' : undefined,
        paddingBottom: foldPadding ? '0 !important' : undefined
      }
    ),
    c(
      `&.${namespace}-fade-in-height-expand-transition-leave-active`,
      `
      overflow: ${overflow};
      transition:
        max-height ${duration} ${cubicBezierEaseInOut} ${leavingDelay},
        opacity ${duration} ${cubicBezierEaseOut} ${leavingDelay},
        margin-top ${duration} ${cubicBezierEaseInOut} ${leavingDelay},
        margin-bottom ${duration} ${cubicBezierEaseInOut} ${leavingDelay},
        padding-top ${duration} ${cubicBezierEaseInOut} ${leavingDelay},
        padding-bottom ${duration} ${cubicBezierEaseInOut} ${leavingDelay}
        ${originalTransition ? ',' + originalTransition : ''}
    `
    ),
    c(
      `&.${namespace}-fade-in-height-expand-transition-enter-active`,
      `
      overflow: ${overflow};
      transition:
        max-height ${duration} ${cubicBezierEaseInOut},
        opacity ${duration} ${cubicBezierEaseIn},
        margin-top ${duration} ${cubicBezierEaseInOut},
        margin-bottom ${duration} ${cubicBezierEaseInOut},
        padding-top ${duration} ${cubicBezierEaseInOut},
        padding-bottom ${duration} ${cubicBezierEaseInOut}
        ${originalTransition ? ',' + originalTransition : ''}
    `
    )
  ]
}
