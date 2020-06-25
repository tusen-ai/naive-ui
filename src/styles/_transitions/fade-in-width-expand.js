import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../_common-style/base'

const easeInOutCubicBezier = commonVariables.easeInOutCubicBezier

export default function ({
  duration = '.2s',
  delay = '.1s'
} = {}) {
  return [
    c(`&.${namespace}-fade-in-width-expand-transition-leave, &.${namespace}-fade-in-width-expand-transition-enter-to`, {
      opacity: 1
    }),
    c(`&.${namespace}-fade-in-width-expand-transition-leave-to, &.${namespace}-fade-in-width-expand-transition-enter`, {
      opacity: '0 !important',
      marginLeft: '0 !important',
      marginRight: '0 !important'
    }),
    c(`&.${namespace}-fade-in-width-expand-transition-leave-active`, {
      raw: `
        overflow: hidden;
        transition:
          opacity ${duration} ${easeInOutCubicBezier},
          max-width ${duration} ${easeInOutCubicBezier} ${delay},
          margin-left ${duration} ${easeInOutCubicBezier} ${delay},
          margin-right ${duration} ${easeInOutCubicBezier} ${delay};
      `
    }),
    c(`&.${namespace}-fade-in-width-expand-transition-enter-active`, {
      raw: `
        overflow: hidden;
        transition:
          opacity ${duration} ${easeInOutCubicBezier} ${delay},
          max-width ${duration} ${easeInOutCubicBezier},
          margin-left ${duration} ${easeInOutCubicBezier},
          margin-right ${duration} ${easeInOutCubicBezier};
      `
    })
  ]
}
