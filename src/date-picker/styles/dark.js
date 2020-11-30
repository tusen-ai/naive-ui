import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import commonVars from './_common'

export default create({
  theme: 'dark',
  name: 'DatePicker',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVars,
      itemTextColor: derived.textColor2Overlay,
      itemTextColorMatched: derived.popoverColor,
      itemSupColor: derived.primaryColor,
      itemSupColorMatch: derived.popoverColor,
      itemColorHover: changeColor(derived.primaryColor, { alpha: 0.15 }),
      itemColorActive: derived.primaryColor,
      itemBorderRadius: base.borderRadiusSmall,
      panelColor: derived.popoverColor,
      panelTextColor: derived.textColor2Overlay,
      panelIconColor: derived.iconColorOverlay,
      panelMonthTextColor: derived.textColorPrimaryOverlay,
      panelHeaderDividerColor: derived.dividerColorOverlay,
      panelDayDividerColor: derived.dividerColorOverlay,
      panelVerticalDividerColor: derived.dividerColorOverlay,
      panelActionDivider: derived.dividerColorOverlay,
      panelBorderRadius: base.borderRadius,
      panelBoxShadow: derived.boxShadow2,
      panelMonthFontWeight: base.fontWeightStrong
    }
  }
})
