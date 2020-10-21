import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Message',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2,
      baseColor,
      closeColor,
      closeColorHover,
      infoColor,
      successColor,
      errorColor,
      warningColor,
      popoverColor
    } = derived
    const {
      popmenuBoxShadow
    } = base
    const coloredBoxShadow = '0px 2px 18px 0px rgba(0, 0, 0, 0.27)'
    return {
      textColorInfo: baseColor,
      textColorSuccess: baseColor,
      textColorError: baseColor,
      textColorWarning: baseColor,
      textColorLoading: textColor2,
      colorInfo: infoColor,
      colorSuccess: successColor,
      colorError: errorColor,
      colorWarning: warningColor,
      colorLoading: popoverColor,
      boxShadowInfo: coloredBoxShadow,
      boxShadowSuccess: coloredBoxShadow,
      boxShadowError: coloredBoxShadow,
      boxShadowWarning: coloredBoxShadow,
      boxShadowLoading: popmenuBoxShadow,
      iconColorInfo: 'rgba(255, 255, 255, .45)',
      iconColorSuccess: 'rgba(255, 255, 255, .45)',
      iconColorWarning: 'rgba(255, 255, 255, .45)',
      iconColorError: 'rgba(255, 255, 255, .45)',
      iconColorLoading: 'rgba(255, 255, 255, .45)',
      closeColor: 'rgba(255, 255, 255, .5)',
      closeColorHover: 'rgba(255, 255, 255, .6)',
      closeColorActive: 'rgba(255, 255, 255, .4)',
      closeColorLoading: closeColor,
      closeColorLoadingHover: closeColorHover,
      closeColorLoadingActive: closeColor
    }
  }
})
