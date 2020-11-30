import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import commonVars from './_common'

export default create({
  theme: 'light',
  name: 'DatePicker',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVars,
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
      panelArrowButtonColor: derived.iconColor,
      panelMonthTextColor: derived.textColorPrimary,
      panelHeaderDividerColor: derived.dividerColor,
      panelDayDividerColor: derived.dividerColor,
      panelVerticalDividerColor: derived.dividerColor,
      panelActionDivider: derived.dividerColor,
      panelBoxShadow: derived.boxShadow2,
      panelBorderRadius: base.borderRadius,
      panelMonthFontWeight: base.fontWeightStrong
    }
  }
})
