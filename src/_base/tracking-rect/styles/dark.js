import create from '../../../styles/_utils/create-component-base'

export default create({
  name: 'BaseTrackingRect',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    return {
      rectColor: derived.pendingBackgroundOverlayColor
    }
  }
})
