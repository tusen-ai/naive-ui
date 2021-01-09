import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Divider',
  common: commonLight,
  self (vars) {
    const { textColor1, dividerColorOverlay, fontWeightStrong } = vars
    return {
      textColor: textColor1,
      color: dividerColorOverlay,
      fontWeight: fontWeightStrong
    }
  }
}
