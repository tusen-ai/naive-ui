import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.textColor3Overlay,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorActive: derived.primaryColorPressed,
      itemTextColorMatch: derived.textColor2Overlay,
      separatorColor: derived.textColor3Overlay
    }
  }
})
