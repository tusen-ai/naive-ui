import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import commonVariables from './_common'

export default create({
  name: 'Message',
  theme: 'dark',
  getDerivedVars (vars) {
    const {
      textColorBase,
      textColor2Overlay,
      infoColorSuppl,
      successColorSuppl,
      errorColorSuppl,
      warningColorSuppl,
      popoverColor,
      boxShadow2
    } = vars
    return {
      ...commonVariables,
      textColorInfo: textColorBase,
      textColorSuccess: textColorBase,
      textColorError: textColorBase,
      textColorWarning: textColorBase,
      textColorLoading: textColor2Overlay,
      colorInfo: infoColorSuppl,
      colorSuccess: successColorSuppl,
      colorError: errorColorSuppl,
      colorWarning: warningColorSuppl,
      colorLoading: popoverColor,
      boxShadowInfo: `0 2px 12px 0 ${changeColor(infoColorSuppl, { alpha: '0.4' })}`,
      boxShadowSuccess: `0 2px 12px 0 ${changeColor(successColorSuppl, { alpha: '0.4' })}`,
      boxShadowError: `0 2px 12px 0 ${changeColor(errorColorSuppl, { alpha: '0.4' })}`,
      boxShadowWarning: `0 2px 12px 0 ${changeColor(warningColorSuppl, { alpha: '0.4' })}`,
      boxShadowLoading: boxShadow2,
      iconColorInfo: 'rgba(255, 255, 255, .5)',
      iconColorSuccess: 'rgba(255, 255, 255, .5)',
      iconColorWarning: 'rgba(255, 255, 255, .5)',
      iconColorError: 'rgba(255, 255, 255, .5)',
      iconColorLoading: 'rgba(255, 255, 255, .5)',
      closeColorInfo: 'rgba(255, 255, 255, .5)',
      closeColorHoverInfo: 'rgba(255, 255, 255, .6)',
      closeColorPressedInfo: 'rgba(255, 255, 255, .4)',
      closeColorSuccess: 'rgba(255, 255, 255, .5)',
      closeColorHoverSuccess: 'rgba(255, 255, 255, .6)',
      closeColorPressedSuccess: 'rgba(255, 255, 255, .4)',
      closeColorError: 'rgba(255, 255, 255, .5)',
      closeColorHoverError: 'rgba(255, 255, 255, .6)',
      closeColorPressedError: 'rgba(255, 255, 255, .4)',
      closeColorWarning: 'rgba(255, 255, 255, .5)',
      closeColorHoverWarning: 'rgba(255, 255, 255, .6)',
      closeColorPressedWarning: 'rgba(255, 255, 255, .4)',
      closeColorLoading: 'rgba(255, 255, 255, .5)',
      closeColorHoverLoading: 'rgba(255, 255, 255, .6)',
      closeColorPressedLoading: 'rgba(255, 255, 255, .4)'
    }
  }
})
