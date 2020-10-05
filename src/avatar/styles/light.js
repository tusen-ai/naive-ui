import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Avatar',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
    const {
      avatarColorOverlay
    } = derived
    return {
      ...commonVariables,
      borderRadius,
      color: avatarColorOverlay
    }
  }
})
