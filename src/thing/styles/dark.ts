import { commonDark } from '../../_styles/common'
import { ThingTheme } from './light'

const thingDark: ThingTheme = {
  name: 'Thing',
  common: commonDark,
  self (vars) {
    const { textColor1, textColor2, fontWeightStrong, fontSize } = vars
    return {
      fontSize,
      titleTextColor: textColor1,
      textColor: textColor2,
      titleFontWeight: fontWeightStrong
    }
  }
}

export default thingDark
