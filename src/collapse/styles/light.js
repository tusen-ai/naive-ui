import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'

export default create({
  theme: 'light',
  name: 'Collapse',
  peer: [baseLight, iconLight],
  getLocalVars (vars) {
    const {
      fontWeightStrong,
      textColor1,
      textColor2,
      dividerColorOverlay,
      fontSize
    } = vars
    return {
      titleFontSize: fontSize,
      titleFontWeight: fontWeightStrong,
      dividerColor: dividerColorOverlay,
      titleTextColor: textColor1,
      fontSize: fontSize,
      textColor: textColor2,
      arrowColor: textColor2
    }
  }
})
