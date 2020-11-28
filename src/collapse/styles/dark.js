import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Collapse',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor1,
      textColor2,
      dividerColorOverlay
    } = derived
    const {
      fontWeightStrong
    } = base
    return {
      titleFontSize: '14px',
      titleFontWeight: fontWeightStrong,
      dividerColor: dividerColorOverlay,
      titleTextColor: textColor1,
      fontSize: '14px',
      textColor: textColor2,
      arrowColor: textColor2
    }
  }
})
