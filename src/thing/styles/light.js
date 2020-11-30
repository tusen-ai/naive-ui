import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Thing',
  theme: 'light',
  getDerivedVars (vars) {
    const {
      textColor1,
      textColor2,
      fontWeightStrong
    } = vars
    return {
      headerTextColor: textColor1,
      textColor: textColor2,
      headerFontWeight: fontWeightStrong
    }
  }
})
