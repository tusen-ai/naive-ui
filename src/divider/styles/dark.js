import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Divider',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimaryOverlay,
      dividerColorOverlay
    } = derived
    return {
      textColor: textColorPrimaryOverlay,
      color: dividerColorOverlay,
      fontWeight: base.fontWeightStrong
    }
  }
})
