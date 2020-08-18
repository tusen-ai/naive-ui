import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Checkbox',
  getDerivedVariables ({ base, derived }) {
    const {
      transformDebounceScale
    } = base
    const {
      baseBackgroundColor,
      disabledBackgroundColor,
      cardBackgroundColor,
      modalBackgroundColor,
      disabledTextColor,
      borderColor,
      primaryColor,
      secondaryTextColor
    } = derived
    return {
      ...commonVariables,
      transformDebounceScale,
      color: {
        default: baseBackgroundColor,
        disabled: disabledBackgroundColor,
        table: cardBackgroundColor,
        modalTable: modalBackgroundColor
      },
      iconColor: {
        default: baseBackgroundColor,
        disabled: disabledTextColor
      },
      borderColor: {
        default: borderColor,
        disabled: borderColor,
        active: primaryColor,
        boxShadow: changeColor(primaryColor, { alpha: 0.3 })
      },
      labelTextColor: {
        default: secondaryTextColor,
        disabled: disabledTextColor
      }
    }
  }
})
