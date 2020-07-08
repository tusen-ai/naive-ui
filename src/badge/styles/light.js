import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Badge',
  theme: 'light',
  getDerivedVariables ({ derived }) {
    return {
      default: { color: derived.errorColor },
      info: { color: derived.infoColor },
      success: { color: derived.successColor },
      error: { color: derived.errorColor },
      warning: { color: derived.warningColor }
    }
  }
})
