import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'light',
  name: 'DatePicker',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.textColorSecondary,
      itemTextColorDisabled: derived.textColorDisabled,
      itemTextColorMatched: derived.popoverColor,
      itemTextColorCurrent: derived.primaryColor,
      itemSupColor: derived.primaryColor,
      itemSupColorMatch: derived.popoverColor,
      itemColorHover: changeColor(derived.primaryColor, { alpha: 0.1 }),
      itemColorActive: derived.primaryColor,
      itemBorderRadius: base.smallBorderRadius,
      panelColor: derived.popoverColor,
      panelTextColor: derived.textColorSecondary,
      panelIconColor: derived.iconColor,
      panelHeaderTextColor: derived.textColorPrimary,
      panelDividerColor: derived.dividerColor,
      panelBoxShadow: derived.popoverBoxShadow,
      panelBorderRadius: base.borderRadius,
      pickerTextDecorationColor: derived.textColorSecondary,
      panelHeaderFontWeight: base.strongFontWeight
    }
  }
})
