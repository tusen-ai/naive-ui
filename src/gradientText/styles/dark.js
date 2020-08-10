import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'GradientText',
  getDerivedVariables ({ derived }) {
    const {
      primaryColor,
      successColor,
      warningColor,
      errorColor,
      infoColor,
      primaryHsColor,
      successHsColor,
      warningHsColor,
      errorHsColor,
      infoHsColor
    } = derived
    return {
      textBackgroundImage: {
        primary: `linear-gradient(252deg, ${primaryColor} 0%, ${primaryHsColor} 100%)`,
        success: `linear-gradient(252deg, ${successColor} 0%, ${successHsColor} 100%)`,
        warning: ` linear-gradient(252deg, ${warningColor} 0%, ${warningHsColor} 100%)`,
        error: `linear-gradient(252deg, ${errorColor} 0%, ${errorHsColor} 100%)`,
        info: `linear-gradient(252deg, ${infoColor} 0%, ${infoHsColor} 100%)`
      }
    }
  }
})
