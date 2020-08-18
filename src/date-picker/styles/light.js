import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'light',
  name: 'DatePicker',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.secondaryTextColor,
      itemTextColorDisabled: derived.disabledTextColor,
      itemTextColorMatched: derived.popoverBackgroundColor,
      itemTextColorCurrent: derived.primaryColor,
      itemSupColor: derived.primaryColor,
      itemSupColorMatch: derived.popoverBackgroundColor,
      itemColorHover: changeColor(derived.primaryColor, { alpha: 0.1 }),
      itemColorActive: derived.primaryColor,
      panelColor: derived.popoverBackgroundColor,
      panelTextColor: derived.secondaryTextColor,
      panelIconColor: derived.iconColor,
      panelHeaderTextColor: derived.primaryTextColor,
      panelDividerColor: derived.dividerColor,
      panelBoxShadow: derived.popoverBoxShadow,
      panelBorderRadius: base.borderRadius,
      pickerTextDecorationColor: derived.secondaryTextColor
    }
  }
})
