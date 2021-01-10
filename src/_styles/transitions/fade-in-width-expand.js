import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../new-common/_common'

const { cubicBezierEaseInOut } = commonVariables

export default function ({ duration = '.2s', delay = '.1s' } = {}) {
  return [
    c(
      `&.${namespace}-fade-in-width-expand-transition-leave-from, &.${namespace}-fade-in-width-expand-transition-enter-to`,
      {
        opacity: 1
      }
    ),
    c(
      `&.${namespace}-fade-in-width-expand-transition-leave-to, &.${namespace}-fade-in-width-expand-transition-enter-from`,
      {
        opacity: '0 !important',
        marginLeft: '0 !important',
        marginRight: '0 !important'
      }
    ),
    c(
      `&.${namespace}-fade-in-width-expand-transition-leave-active`,
      `
      overflow: hidden;
      transition:
        opacity ${duration} ${cubicBezierEaseInOut},
        max-width ${duration} ${cubicBezierEaseInOut} ${delay},
        margin-left ${duration} ${cubicBezierEaseInOut} ${delay},
        margin-right ${duration} ${cubicBezierEaseInOut} ${delay};
    `
    ),
    c(
      `&.${namespace}-fade-in-width-expand-transition-enter-active`,
      `
      overflow: hidden;
      transition:
        opacity ${duration} ${cubicBezierEaseInOut} ${delay},
        max-width ${duration} ${cubicBezierEaseInOut},
        margin-left ${duration} ${cubicBezierEaseInOut},
        margin-right ${duration} ${cubicBezierEaseInOut};
    `
    )
  ]
}
