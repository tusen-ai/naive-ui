import type { HeatmapTheme } from './light'
import { commonDark } from '../../_styles/common'
import { self } from './light'

const HeatmapDark: HeatmapTheme = {
  name: 'Heatmap',
  common: commonDark,
  self(vars) {
    const lightSelf = self(vars)
    return {
      ...lightSelf,
      loadingColorStart: 'rgba(255, 255, 255, 0.12)',
      loadingColorEnd: 'rgba(255, 255, 255, 0.18)'
    }
  }
}

export default HeatmapDark
