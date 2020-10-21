import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.textColor3,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorActive: derived.primaryColorPressed,
      itemTextColorMatch: derived.textColor2,
      separatorColor: derived.textColor3
    }
  }
})
