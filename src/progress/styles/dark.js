import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon'

export default create({
  name: 'Progress',
  theme: 'dark',
  peer: [
    baseDark,
    iconDark
  ],
  getLocalVars (vars) {
    const {
      infoColor,
      successColor,
      warningColor,
      errorColor,
      textColor2,
      progressRailColorOverlay
    } = vars
    return {
      fontSizeCircle: '28px',
      railColor: progressRailColorOverlay,
      railHeight: '10px',
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
      lineBgProcessing: 'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
    }
  }
})
