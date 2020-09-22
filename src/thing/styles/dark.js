import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Thing',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimaryOverlay,
      textColorSecondaryOverlay
    } = derived
    const {
      fontWeightStrong
    } = base
    return {
      headerTextColor: textColorPrimaryOverlay,
      textColor: textColorSecondaryOverlay,
      headerFontWeight: fontWeightStrong
    }
  }
})
