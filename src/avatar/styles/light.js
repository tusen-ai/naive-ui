import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Avatar',
  peer: [baseLight],
  getLocalVars (vars) {
    const {
      borderRadius,
      avatarColorOverlay
    } = vars
    return {
      ...commonVariables,
      borderRadius,
      color: avatarColorOverlay
    }
  }
})
