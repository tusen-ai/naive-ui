import create from '../_utils/create-component-base'

export default create({
  name: 'Badge',
  theme: 'dark',
  getDerivedVariables ({ derived }) {
    return {
      default: { color: derived.errorHsColor },
      info: { color: derived.infoHsColor },
      success: { color: derived.successHsColor },
      error: { color: derived.errorHsColor },
      warning: { color: derived.warningHsColor }
    }
  }
})
