import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Thing',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor1Overlay,
      textColor2Overlay
    } = derived
    const {
      fontWeightStrong
    } = base
    return {
      headerTextColor: textColor1Overlay,
      textColor: textColor2Overlay,
      headerFontWeight: fontWeightStrong
    }
  }
})
