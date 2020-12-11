import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'Popover',
  theme: 'light',
  peer: [
    baseLight
  ],
  getLocalVars (vars) {
    const {
      boxShadow2,
      popoverColor,
      textColor2,
      baseColor,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      borderRadius,
      color: popoverColor,
      textColor: textColor2,
      boxShadow: boxShadow2,
      tooltipColor: 'rgba(0, 0, 0, .85)',
      tooltipTextColor: baseColor
    }
  }
})
