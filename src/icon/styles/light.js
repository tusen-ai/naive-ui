import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
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
