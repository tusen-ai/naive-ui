import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { baseLoadingLight } from '../../_base/loading/styles'

export default create({
  name: 'Spin',
  theme: 'light',
  peer: [baseLight, baseLoadingLight],
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
