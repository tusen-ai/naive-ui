import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.textColorTertiary,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorActive: derived.primaryColorPressed,
      itemTextColorMatch: derived.textColorSecondary,
      separatorColor: derived.textColorTertiary
    }
  }
})
