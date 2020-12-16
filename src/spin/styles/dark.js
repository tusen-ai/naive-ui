import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { baseLoadingDark } from '../../_base/loading/styles'

export default create({
  name: 'Spin',
  theme: 'dark',
  peer: [baseDark, baseLoadingDark],
  getLocalVars (vars) {
    const {
      opacityDisabled,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      heightHuge
    } = vars
    return {
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      heightHuge,
      opacitySpinning: opacityDisabled
    }
  }
})
