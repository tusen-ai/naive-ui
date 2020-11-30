import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'Popover',
  theme: 'dark',
  getDerivedVars (vars) {
    const {
      popoverColor,
      textColor2Overlay,
      boxShadow2,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      borderRadius,
      color: popoverColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow2,
      tooltipColor: popoverColor,
      tooltipTextColor: textColor2Overlay
    }
  }
})
