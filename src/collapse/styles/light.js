import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'

export default create({
  theme: 'light',
  name: 'Collapse',
  peer: [
    baseLight,
    iconLight
  ],
  getLocalVars (vars) {
    const {
      fontWeightStrong,
      textColor1,
      textColor2,
      dividerColorOverlay
    } = vars
    return {
      titleFontSize: '14px',
      titleFontWeight: fontWeightStrong,
      dividerColor: dividerColorOverlay,
      titleTextColor: textColor1,
      fontSize: '14px',
      textColor: textColor2,
      arrowColor: textColor2
    }
  }
})
