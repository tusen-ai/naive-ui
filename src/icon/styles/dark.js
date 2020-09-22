import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Icon',
  getDerivedVariables ({ derived }) {
    const {
      textColorBase,
      opacityPrimary,
      opacitySecondary,
      opacityTertiary
    } = derived
    return {
      color: textColorBase,
      opacityPrimaryDepth: opacityPrimary,
      opacitySecondaryDepth: opacitySecondary,
      opacityTertiaryDepth: opacityTertiary
    }
  }
})
