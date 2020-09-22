import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../base/_common'

const easeInOutCubicBezier = commonVariables.easeInOutCubicBezier
const easeOutCubicBezier = commonVariables.easeOutCubicBezier
const easeInCubicBezier = commonVariables.easeInCubicBezier

export default function ({
  duration = '.3s',
  originalTransition = '',
  leavingDelay = '0s',
  foldPadding = false,
  enterToProps = null,
  leaveToProps = null
} = {}) {
  return [
    c(`&.${namespace}-fade-in-height-expand-transition-leave-from, &.${namespace}-fade-in-height-expand-transition-enter-to`, {
      ...enterToProps,
      opacity: 1
    }),
    c(`&.${namespace}-fade-in-height-expand-transition-leave-to, &.${namespace}-fade-in-height-expand-transition-enter-from`, {
      ...leaveToProps,
      opacity: 0,
      marginTop: '0 !important',
      marginBottom: '0 !important',
      paddingTop: foldPadding ? '0 !important' : null,
      paddingBottom: foldPadding ? '0 !important' : null
    }),
    c(`&.${namespace}-fade-in-height-expand-transition-leave-active`, {
      raw: `
        overflow: hidden;
        transition:
          max-height ${duration} ${easeInOutCubicBezier} ${leavingDelay},
          opacity ${duration} ${easeOutCubicBezier} ${leavingDelay},
          margin-top ${duration} ${easeInOutCubicBezier} ${leavingDelay},
          margin-bottom ${duration} ${easeInOutCubicBezier} ${leavingDelay},
          padding-top ${duration} ${easeInOutCubicBezier} ${leavingDelay},
          padding-bottom ${duration} ${easeInOutCubicBezier} ${leavingDelay}
          ${originalTransition ? ',' + originalTransition : ''}
      `
    }),
    c(`&.${namespace}-fade-in-height-expand-transition-enter-active`, {
      raw: `
        overflow: hidden;
        transition:
          max-height ${duration} ${easeInOutCubicBezier},
          opacity ${duration} ${easeInCubicBezier},
          margin-top ${duration} ${easeInOutCubicBezier},
          margin-bottom ${duration} ${easeInOutCubicBezier},
          padding-top ${duration} ${easeInOutCubicBezier},
          padding-bottom ${duration} ${easeInOutCubicBezier}
          ${originalTransition ? ',' + originalTransition : ''}
      `
    })
  ]
}
