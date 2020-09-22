import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Divider',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimary,
      dividerColorOverlay
    } = derived
    return {
      textColor: textColorPrimary,
      color: dividerColorOverlay,
      fontWeight: base.strongFontWeight
    }
  }
})
