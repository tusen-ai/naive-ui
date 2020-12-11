import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import { baseDark } from '../../_styles/base'
import { inputDark } from '../../input'
import { iconDark } from '../../icon'
import commonVars from './_common'

export default create({
  theme: 'dark',
  name: 'DatePicker',
  peer: [
    baseDark,
    inputDark,
    iconDark
  ],
  getLocalVars (vars) {
    return {
      ...commonVars,
      itemTextColor: vars.textColor2Overlay,
      itemTextColorMatched: vars.popoverColor,
      itemSupColor: vars.primaryColor,
      itemSupColorMatch: vars.popoverColor,
      itemColorHover: changeColor(vars.primaryColor, { alpha: 0.15 }),
      itemColorActive: vars.primaryColor,
      itemBorderRadius: vars.borderRadiusSmall,
      panelColor: vars.popoverColor,
      panelTextColor: vars.textColor2Overlay,
      panelArrowButtonColor: vars.iconColorOverlay,
      panelMonthTextColor: vars.textColorPrimaryOverlay,
      panelHeaderDividerColor: vars.dividerColorOverlay,
      panelDayDividerColor: vars.dividerColorOverlay,
      panelVerticalDividerColor: vars.dividerColorOverlay,
      panelActionDivider: vars.dividerColorOverlay,
      panelBorderRadius: vars.borderRadius,
      panelBoxShadow: vars.boxShadow2,
      panelMonthFontWeight: vars.fontWeightStrong
    }
  }
})
