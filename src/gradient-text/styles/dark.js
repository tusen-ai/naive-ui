import create from '../../styles/_utils/create-component-base'

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
      primaryHsColor,
      successHsColor,
      warningHsColor,
      errorHsColor,
      infoHsColor
    } = derived
    return {
      fontWeight: base.strongFontWeight,
      backgroundImagePrimary: `linear-gradient(252deg, ${primaryColor} 0%, ${primaryHsColor} 100%)`,
      backgroundImageSuccess: `linear-gradient(252deg, ${successColor} 0%, ${successHsColor} 100%)`,
      backgroundImageWarning: ` linear-gradient(252deg, ${warningColor} 0%, ${warningHsColor} 100%)`,
      backgroundImageError: `linear-gradient(252deg, ${errorColor} 0%, ${errorHsColor} 100%)`,
      backgroundImageInfo: `linear-gradient(252deg, ${infoColor} 0%, ${infoHsColor} 100%)`
    }
  }
})
