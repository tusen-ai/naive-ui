import { commonDark } from '../../_styles/common'
import type { ProgressTheme } from './light'

const progressDark: ProgressTheme = {
  name: 'Progress',
  common: commonDark,
  self (vars) {
    const {
      infoColor,
      successColor,
      warningColor,
      errorColor,
      textColor2,
      progressRailColor,
      fontSize,
      fontWeight
    } = vars
    return {
      fontWeightCircle: fontWeight,
      fontSize,
      fontSizeCircle: '28px',
      railColor: progressRailColor,
      railHeight: '8px',
      iconSizeCircle: '36px',
      iconSizeLine: '18px',
      iconColor: infoColor,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      textColorCircle: textColor2,
      textColorLineInner: 'rgb(0, 0, 0)',
      textColorLineOuter: textColor2,
      fillColor: infoColor,
      fillColorInfo: infoColor,
      fillColorSuccess: successColor,
      fillColorWarning: warningColor,
      fillColorError: errorColor,
      lineBgProcessing:
        'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
    }
  }
}

export default progressDark
