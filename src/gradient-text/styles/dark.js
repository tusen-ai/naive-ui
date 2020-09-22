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
      primaryColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl,
      infoColorSuppl
    } = derived
    return {
      fontWeight: base.strongFontWeight,
      backgroundImagePrimary: `linear-gradient(252deg, ${primaryColor} 0%, ${primaryColorSuppl} 100%)`,
      backgroundImageSuccess: `linear-gradient(252deg, ${successColor} 0%, ${successColorSuppl} 100%)`,
      backgroundImageWarning: ` linear-gradient(252deg, ${warningColor} 0%, ${warningColorSuppl} 100%)`,
      backgroundImageError: `linear-gradient(252deg, ${errorColor} 0%, ${errorColorSuppl} 100%)`,
      backgroundImageInfo: `linear-gradient(252deg, ${infoColor} 0%, ${infoColorSuppl} 100%)`
    }
  }
})
