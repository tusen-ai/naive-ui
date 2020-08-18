import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
  name: 'Checkbox',
  getDerivedVariables ({ base, derived }) {
    const {
      transformDebounceScale
    } = base
    const {
      disbaledBackgroundColor,
      cardBackgroundColor,
      modalBackgroundColor,
      borderOverlayColor,
      primaryColor,
      secondaryTextOverlayColor,
      disabledTextOverlayColor
    } = derived
    return {
      ...commonVariables,
      transformDebounceScale,
      color: {
        default: 'transparent',
        disabled: disbaledBackgroundColor,
        table: cardBackgroundColor,
        modalTable: modalBackgroundColor
      },
      iconColor: {
        default: cardBackgroundColor,
        disabled: disabledTextOverlayColor
      },
      borderColor: {
        default: borderOverlayColor,
        disabled: borderOverlayColor,
        active: primaryColor,
        boxShadow: changeColor(primaryColor, { alpha: 0.3 })
      },
      labelTextColor: {
        default: secondaryTextOverlayColor,
        disabled: disabledTextOverlayColor
      }
    }
  }
})
