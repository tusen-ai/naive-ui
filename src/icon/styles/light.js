import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Icon',
  common: commonLight,
  self (vars) {
    const {
      textColorBase,
      opacity1,
      opacity2,
      opacity3,
      opacity4,
      opacity5
    } = vars
    return {
      color: textColorBase,
      opacity1Depth: opacity1,
      opacity2Depth: opacity2,
      opacity3Depth: opacity3,
      opacity4Depth: opacity4,
      opacity5Depth: opacity5
    }
  }
}
