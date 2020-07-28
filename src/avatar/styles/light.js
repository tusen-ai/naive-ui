import create from '../../styles/_utils/create-component-base'
import commonVariables from '../../styles/_common-style/avatar'

export default create({
  theme: 'light',
  name: 'Avatar',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius
    } = base
    const {
      avatarBackgroundOverlayColor
    } = derived
    return {
      ...commonVariables,
      borderRadius,
      backgroundColor: avatarBackgroundOverlayColor
    }
  }
})
