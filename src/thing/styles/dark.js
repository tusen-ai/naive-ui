import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Thing',
  common: commonDark,
  self (vars) {
    const {
      textColor1Overlay,
      textColor2Overlay,
      fontWeightStrong,
      fontSize
    } = vars
    return {
      fontSize,
      titleTextColor: textColor1Overlay,
      textColor: textColor2Overlay,
      titleFontWeight: fontWeightStrong
    }
  }
}
