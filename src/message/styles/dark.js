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
      textColorInfo: baseTextColor,
      textColorSuccess: baseTextColor,
      textColorError: baseTextColor,
      textColorWarning: baseTextColor,
      textColorLoading: secondaryTextOverlayColor,
      colorInfo: infoHsColor,
      colorSuccess: successHsColor,
      colorError: errorHsColor,
      colorWarning: warningHsColor,
      colorLoading: popoverBackgroundColor,
      boxShadowInfo: `0 2px 12px 0 ${changeColor(infoHsColor, { alpha: '0.4' })}`,
      boxShadowSuccess: `0 2px 12px 0 ${changeColor(successHsColor, { alpha: '0.4' })}`,
      boxShadowError: `0 2px 12px 0 ${changeColor(errorHsColor, { alpha: '0.4' })}`,
      boxShadowWarning: `0 2px 12px 0 ${changeColor(warningHsColor, { alpha: '0.4' })}`,
      boxShadowLoading: popmenuBoxShadow,
      iconColorInfo: 'rgba(255, 255, 255, .5)',
      iconColorSuccess: 'rgba(255, 255, 255, .5)',
      iconColorWarning: 'rgba(255, 255, 255, .5)',
      iconColorError: 'rgba(255, 255, 255, .5)',
      iconColorLoading: 'rgba(255, 255, 255, .5)',
      closeColor: 'rgba(255, 255, 255, .5)',
      closeColorHover: 'rgba(255, 255, 255, .6)',
      closeColorActive: 'rgba(255, 255, 255, .4)',
      closeColorLoading: 'rgba(255, 255, 255, .5)',
      closeColorLoadingHover: 'rgba(255, 255, 255, .6)',
      closeColorLoadingActive: 'rgba(255, 255, 255, .4)'
    }
  }
})
