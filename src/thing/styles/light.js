import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'Thing',
  theme: 'light',
  peer: [baseLight],
  getLocalVars (vars) {
    const { textColor1, textColor2, fontWeightStrong } = vars
    return {
      headerTextColor: textColor1,
      textColor: textColor2,
      headerFontWeight: fontWeightStrong
    }
  }
})
