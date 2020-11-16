import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'GradientText',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor,
      successColor,
      warningColor,
      errorColor,
      infoColor,
      primaryColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl,
      infoColorSuppl
    } = derived
    return {
      fontWeight: base.fontWeightStrong,
      rotate: '252deg',
      colorStartPrimary: primaryColor,
      colorEndPrimary: primaryColorSuppl,
      colorStartInfo: infoColor,
      colorEndInfo: infoColorSuppl,
      colorStartWarning: warningColor,
      colorEndWarning: warningColorSuppl,
      colorStartError: errorColor,
      colorEndError: errorColorSuppl,
      colorStartSuccess: successColor,
      colorEndSuccess: successColorSuppl
    }
  }
})
