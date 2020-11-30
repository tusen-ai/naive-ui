import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Avatar',
  getDerivedVars (vars) {
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
