import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.textColorTertiaryOverlay,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorActive: derived.primaryColorPressed,
      itemTextColorMatch: derived.textColorSecondaryOverlay,
      separatorColor: derived.textColorTertiaryOverlay
    }
  }
})
