import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Thing',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor1,
      textColor2
    } = derived
    const {
      fontWeightStrong
    } = base
    return {
      headerTextColor: textColor1,
      textColor: textColor2,
      headerFontWeight: fontWeightStrong
    }
  }
})
