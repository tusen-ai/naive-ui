import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.tertiaryTextColor,
      itemTextColorHover: derived.primaryHoverColor,
      itemTextColorActive: derived.primaryActiveColor,
      itemTextColorMatch: derived.secondaryTextColor,
      seperatorColor: derived.tertiaryTextColor
    }
  }
})
