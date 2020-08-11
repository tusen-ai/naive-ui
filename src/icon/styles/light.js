import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Icon',
  getDerivedVariables ({ derived }) {
    const {
      baseTextColor,
      primaryOpacity,
      secondaryOpacity,
      tertiaryOpacity
    } = derived
    return {
      baseTextColor,
      primaryOpacity,
      secondaryOpacity,
      tertiaryOpacity
    }
  }
})
