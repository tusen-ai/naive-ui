import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Thing',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimary,
      textColorSecondary
    } = derived
    const {
      fontWeightStrong
    } = base
    return {
      headerTextColor: textColorPrimary,
      textColor: textColorSecondary,
      headerFontWeight: fontWeightStrong
    }
  }
})
