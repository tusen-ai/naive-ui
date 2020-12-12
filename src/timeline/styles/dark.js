import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'Timeline',
  theme: 'dark',
  peer: [baseDark],
  getLocalVars (vars) {
    const {
      textColor3Overlay,
      infoColorSuppl,
      errorColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      textColor1Overlay,
      textColor2Overlay,
      railColorOverlay,
      fontWeightStrong
    } = vars
    return {
      ...sizeVariables,
      headerFontWeight: fontWeightStrong,
      circleBorderColor: textColor3Overlay,
      circleBorderColorInfo: infoColorSuppl,
      circleBorderColorError: errorColorSuppl,
      circleBorderColorSuccess: successColorSuppl,
      circleBorderColorWarning: warningColorSuppl,
      headerTextColor: textColor1Overlay,
      contentTextColor: textColor2Overlay,
      metaTextColor: textColor3Overlay,
      lineColor: railColorOverlay
    }
  }
})
