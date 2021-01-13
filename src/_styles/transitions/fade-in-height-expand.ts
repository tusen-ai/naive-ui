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
  enterToProps?: Record<string, string | number> | null
  leaveToProps?: Record<string, string | number> | null
}

export default function ({
  overflow = 'hidden',
  duration = '.3s',
  originalTransition = '',
  leavingDelay = '0s',
  foldPadding = false,
  enterToProps = null,
  leaveToProps = null
}: FadeInHeightExpandTransitionOption = {}) {
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
        paddingTop: foldPadding ? '0 !important' : null,
        paddingBottom: foldPadding ? '0 !important' : null
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
