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
