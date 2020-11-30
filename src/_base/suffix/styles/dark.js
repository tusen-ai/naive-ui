import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  name: 'BaseSuffix',
  theme: 'dark',
  getDerivedVars (vars) {
    return {
      ...commonVariables,
      crossColor: vars.textColor4Overlay,
      crossColorHover: vars.primaryColorHover,
      crossColorPressed: vars.primaryColorPressed,
      arrowColor: vars.textColor4Overlay,
      arrowColorHover: vars.primaryColorHover,
      arrowColorActive: vars.primaryColorHover,
      arrowColorDisabled: vars.textColor5Overlay,
      crossColorWarning: vars.warningColor,
      crossColorHoverWarning: vars.warningColorHover,
      crossColorPressedWarning: vars.warningColorPressed,
      arrowColorWarning: vars.warningColor,
      arrowColorHoverWarning: vars.warningColorHover,
      arrowColorActiveWarning: vars.warningColorHover,
      arrowColorDisabledWarning: vars.textColor5Overlay,
      crossColorError: vars.errorColor,
      crossColorHoverError: vars.errorColorHover,
      crossColorPressedError: vars.errorColorPressed,
      arrowColorError: vars.errorColor,
      arrowColorHoverError: vars.errorColorHover,
      arrowColorActiveError: vars.errorColorHover,
      arrowColorDisabledError: vars.textColor5Overlay
    }
  }
})
