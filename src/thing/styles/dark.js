import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'Thing',
  theme: 'dark',
  peer: [
    baseDark
  ],
  getLocalVars (vars) {
    const {
      textColor1Overlay,
      textColor2Overlay,
      fontWeightStrong
    } = vars
    return {
      headerTextColor: textColor1Overlay,
      textColor: textColor2Overlay,
      headerFontWeight: fontWeightStrong
    }
  }
})
