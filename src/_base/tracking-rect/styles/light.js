import create from '../../../styles/_utils/create-component-base'
import { composite } from '../../../_utils/color'

export default create({
  name: 'BaseTrackingRect',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      rectColor: composite(
        derived.baseColor,
        derived.hoverColorOverlay
      )
    }
  }
})
