import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Divider',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor1,
      dividerColorOverlay
    } = derived
    return {
      textColor: textColor1,
      color: dividerColorOverlay,
      fontWeight: base.fontWeightStrong
    }
  }
})
