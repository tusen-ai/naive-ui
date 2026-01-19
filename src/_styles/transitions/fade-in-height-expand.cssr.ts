import type { CNode } from 'css-render'
import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const {
  cubicBezierEaseInOut,
  cubicBezierEaseOut,
  cubicBezierEaseIn,
  duration
} = commonVariables

interface FadeInHeightExpandTransitionOption {
  overflow?: string
  duration?: string
  originalTransition?: string
  leavingDelay?: string
  foldPadding?: boolean
  enterToProps?: Record<string, string | number> | undefined
  leaveToProps?: Record<string, string | number> | undefined
  reverse?: boolean
}

export function fadeInHeightExpandTransition({
  overflow = 'hidden',
  duration: durationParam = duration,
  originalTransition = '',
  leavingDelay = '0s',
  foldPadding = false,
  enterToProps = undefined,
  leaveToProps = undefined,
  reverse = false
}: FadeInHeightExpandTransitionOption = {}): CNode[] {
  const enterClass = reverse ? 'leave' : 'enter'
  const leaveClass = reverse ? 'enter' : 'leave'
  return [
    c(`&.fade-in-height-expand-transition-${leaveClass}-from,
      &.fade-in-height-expand-transition-${enterClass}-to`, {
      ...enterToProps,
      opacity: 1
    }),
    c(`&.fade-in-height-expand-transition-${leaveClass}-to,
      &.fade-in-height-expand-transition-${enterClass}-from`, {
      ...leaveToProps,
      opacity: 0,
      marginTop: '0 !important',
      marginBottom: '0 !important',
      paddingTop: foldPadding ? '0 !important' : undefined,
      paddingBottom: foldPadding ? '0 !important' : undefined
    }),
    c(`&.fade-in-height-expand-transition-${leaveClass}-active`, `
      overflow: ${overflow};
      transition:
        max-height ${durationParam} ${cubicBezierEaseInOut} ${leavingDelay},
        opacity ${durationParam} ${cubicBezierEaseOut} ${leavingDelay},
        margin-top ${durationParam} ${cubicBezierEaseInOut} ${leavingDelay},
        margin-bottom ${durationParam} ${cubicBezierEaseInOut} ${leavingDelay},
        padding-top ${durationParam} ${cubicBezierEaseInOut} ${leavingDelay},
        padding-bottom ${durationParam} ${cubicBezierEaseInOut} ${leavingDelay}
        ${originalTransition ? `,${originalTransition}` : ''}
    `),
    c(`&.fade-in-height-expand-transition-${enterClass}-active`, `
      overflow: ${overflow};
      transition:
        max-height ${durationParam} ${cubicBezierEaseInOut},
        opacity ${durationParam} ${cubicBezierEaseIn},
        margin-top ${durationParam} ${cubicBezierEaseInOut},
        margin-bottom ${durationParam} ${cubicBezierEaseInOut},
        padding-top ${durationParam} ${cubicBezierEaseInOut},
        padding-bottom ${durationParam} ${cubicBezierEaseInOut}
        ${originalTransition ? `,${originalTransition}` : ''}
    `)
  ]
}
