import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'InputGroupLabel',
  theme: 'light',
  peer: [baseLight],
  getLocalVars (vars) {
    return {
      heightTiny: vars.heightTiny,
      heightSmall: vars.heightSmall,
      heightMedium: vars.heightMedium,
      heightLarge: vars.heightLarge,
      borderRadius: vars.borderRadius,
      color: vars.actionColor,
      textColor: vars.textColor2,
      boxShadow: `inset 0 0 0 1px ${vars.borderColor}`
    }
  }
})
