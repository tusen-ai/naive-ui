import sizeVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { TimelineTheme } from './light'

const timelineDark: TimelineTheme = {
  name: 'Timeline',
  common: commonDark,
  self (vars) {
    const {
      textColor3Overlay,
      infoColorSuppl,
      errorColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      textColor1Overlay,
      textColor2Overlay,
      railColorOverlay,
      fontWeightStrong,
      fontSize
    } = vars
    return {
      ...sizeVariables,
      contentFontSize: fontSize,
      titleFontWeight: fontWeightStrong,
      circleBorder: `2px solid ${textColor3Overlay}`,
      circleBorderInfo: `2px solid ${infoColorSuppl}`,
      circleBorderError: `2px solid ${errorColorSuppl}`,
      circleBorderSuccess: `2px solid ${successColorSuppl}`,
      circleBorderWarning: `2px solid ${warningColorSuppl}`,
      titleTextColor: textColor1Overlay,
      contentTextColor: textColor2Overlay,
      metaTextColor: textColor3Overlay,
      lineColor: railColorOverlay
    }
  }
}

export default timelineDark
