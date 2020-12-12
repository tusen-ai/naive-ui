import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'

export default create({
  name: 'Progress',
  theme: 'light',
  peer: [baseLight, iconLight],
  getLocalVars (vars) {
    const {
      infoColor,
      successColor,
      warningColor,
      errorColor,
      textColor2,
      progressRailColor
    } = vars
    return {
      fontSizeCircle: '28px',
      railColor: progressRailColor,
      railHeight: '10px',
      iconSizeCircle: '36px',
      iconSizeLine: '18px',
      iconColor: infoColor,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      textColorCircle: textColor2,
      textColorLineInner: 'rgb(255, 255, 255)',
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
})
