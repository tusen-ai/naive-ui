import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Thing',
  common: commonLight,
  getLocalVars (vars) {
    const { textColor1, textColor2, fontWeightStrong, fontSize } = vars
    return {
      fontSize,
      titleTextColor: textColor1,
      textColor: textColor2,
      titleFontWeight: fontWeightStrong
    }
  }
}
