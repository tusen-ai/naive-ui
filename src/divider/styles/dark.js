import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Divider',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor1Overlay,
      dividerColorOverlay
    } = derived
    return {
      textColor: textColor1Overlay,
      color: dividerColorOverlay,
      fontWeight: base.fontWeightStrong
    }
  }
})
