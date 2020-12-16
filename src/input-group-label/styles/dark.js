import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'InputGroupLabel',
  theme: 'dark',
  peer: [baseDark],
  getLocalVars (vars) {
    return {
      heightTiny: vars.heightTiny,
      heightSmall: vars.heightSmall,
      heightMedium: vars.heightMedium,
      heightLarge: vars.heightLarge,
      borderRadius: vars.borderRadius,
      color: vars.inputColorOverlay,
      textColor: vars.textColor2,
      boxShadow: 'inset 0 0 0 1px transparent'
    }
  }
})
