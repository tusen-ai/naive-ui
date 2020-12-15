import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon/styles'

export default create({
  theme: 'dark',
  name: 'Collapse',
  peer: [baseDark, iconDark],
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
      fontSize,
      textColor: textColor2,
      arrowColor: textColor2
    }
  }
})
