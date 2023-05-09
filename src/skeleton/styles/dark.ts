import { commonDark } from '../../_styles/common'
import { type SkeletonTheme } from './light'

export const skeletonDark: SkeletonTheme = {
  name: 'Skeleton',
  common: commonDark,
  self (vars) {
    const { heightSmall, heightMedium, heightLarge, borderRadius } = vars
    return {
      color: 'rgba(255, 255, 255, 0.12)',
      colorEnd: 'rgba(255, 255, 255, 0.18)',
      borderRadius,
      heightSmall,
      heightMedium,
      heightLarge
    }
  }
}
