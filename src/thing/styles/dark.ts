import { commonDark } from '../../_styles/new-common'
import { ThingTheme } from './light'

const thingDark: ThingTheme = {
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

export default thingDark
