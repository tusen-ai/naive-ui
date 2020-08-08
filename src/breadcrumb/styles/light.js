import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      linkTextColor: {
        default: derived.tertiaryTextOverlayColor,
        active: derived.primaryTextOverlayColor,
        hover: derived.primaryColor
      },
      seperatorTextColor: {
        default: derived.tertiaryTextOverlayColor
      }
    }
  }
})
