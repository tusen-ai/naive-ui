import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import { baseLight } from '../../_styles/base'
import { inputLight } from '../../input/styles'
import { iconLight } from '../../icon/styles'
import commonVars from './_common'

export default create({
  theme: 'light',
  name: 'DatePicker',
  peer: [baseLight, inputLight, iconLight],
  getLocalVars (vars) {
    return {
      ...commonVars,
      itemFontSize: vars.fontSize,
      panelDayFontSize: vars.fontSize,
      panelMonthFontSize: vars.fontSize,
      itemTextColor: vars.textColor2,
      itemTextColorDisabled: vars.textColorDisabled,
      itemTextColorMatched: vars.popoverColor,
      itemTextColorCurrent: vars.primaryColor,
      itemSupColor: vars.primaryColor,
      itemSupColorMatch: vars.popoverColor,
      itemColorHover: changeColor(vars.primaryColor, { alpha: 0.1 }),
      itemColorActive: vars.primaryColor,
      itemBorderRadius: vars.borderRadiusSmall,
      panelColor: vars.popoverColor,
      panelTextColor: vars.textColor2,
      panelArrowButtonColor: vars.iconColor,
      panelMonthTextColor: vars.textColorPrimary,
      panelHeaderDividerColor: vars.dividerColor,
      panelDayDividerColor: vars.dividerColor,
      panelVerticalDividerColor: vars.dividerColor,
      panelActionDivider: vars.dividerColor,
      panelBoxShadow: vars.boxShadow2,
      panelBorderRadius: vars.borderRadius,
      panelMonthFontWeight: vars.fontWeightStrong
    }
  }
})
