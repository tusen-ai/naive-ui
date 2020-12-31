import { commonDark } from '../../_styles/new-common'

export default {
  common: commonDark,
  self (vars) {
    const { textColor1Overlay, dividerColorOverlay, fontWeightStrong } = vars
    return {
      textColor: textColor1Overlay,
      color: dividerColorOverlay,
      fontWeight: fontWeightStrong
    }
  }
}
