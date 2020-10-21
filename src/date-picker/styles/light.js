import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'light',
  name: 'DatePicker',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.textColor2,
      itemTextColorDisabled: derived.textColorDisabled,
      itemTextColorMatched: derived.popoverColor,
      itemTextColorCurrent: derived.primaryColor,
      itemSupColor: derived.primaryColor,
      itemSupColorMatch: derived.popoverColor,
      itemColorHover: changeColor(derived.primaryColor, { alpha: 0.1 }),
      itemColorActive: derived.primaryColor,
      itemBorderRadius: base.borderRadiusSmall,
      panelColor: derived.popoverColor,
      panelTextColor: derived.textColor2,
      panelIconColor: derived.iconColor,
      panelHeaderTextColor: derived.textColor1,
      panelDividerColor: derived.dividerColor,
      panelBoxShadow: derived.popoverBoxShadow,
      panelBorderRadius: base.borderRadius,
      pickerTextDecorationColor: derived.textColor2,
      panelHeaderFontWeight: base.fontWeightStrong
    }
  }
})
