import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color'

export default create({
  name: 'Message',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      baseTextColor,
      secondaryTextOverlayColor,
      infoHsColor,
      successHsColor,
      errorHsColor,
      warningHsColor,
      popoverBackgroundColor
    } = derived
    const {
      popmenuBoxShadow
    } = base
    return {
      textColor: {
        info: baseTextColor,
        success: baseTextColor,
        error: baseTextColor,
        warning: baseTextColor,
        loading: secondaryTextOverlayColor
      },
      iconColor: 'rgba(255, 255, 255, .5)',
      closeColor: {
        default: 'rgba(255, 255, 255, .5)',
        hover: 'rgba(255, 255, 255, .6)',
        active: 'rgba(255, 255, 255, .4)'
      },
      loadingCloseColor: {
        default: 'rgba(255, 255, 255, .5)',
        hover: 'rgba(255, 255, 255, .6)',
        active: 'rgba(255, 255, 255, .4)'
      },
      color: {
        info: infoHsColor,
        success: successHsColor,
        error: errorHsColor,
        warning: warningHsColor,
        loading: popoverBackgroundColor
      },
      boxShadow: {
        info: `0 2px 12px 0 ${changeColor(infoHsColor, { alpha: '0.4' })}`,
        success: `0 2px 12px 0 ${changeColor(successHsColor, { alpha: '0.4' })}`,
        error: `0 2px 12px 0 ${changeColor(errorHsColor, { alpha: '0.4' })}`,
        warning: `0 2px 12px 0 ${changeColor(warningHsColor, { alpha: '0.4' })}`,
        loading: popmenuBoxShadow
      }
    }
  }
})
