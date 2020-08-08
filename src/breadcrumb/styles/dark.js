import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.tertiaryTextOverlayColor,
      itemTextColorHover: derived.primaryHoverColor,
      itemTextColorActive: derived.primaryActiveColor,
      itemTextColorMatch: derived.secondaryTextOverlayColor,
      seperatorColor: derived.tertiaryTextOverlayColor
    }
  }
})
