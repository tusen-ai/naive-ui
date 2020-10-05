import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'DatePicker',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.textColorSecondaryOverlay,
      itemTextColorMatched: derived.popoverColor,
      itemSupColor: derived.primaryColor,
      itemSupColorMatch: derived.popoverColor,
      itemColorHover: changeColor(derived.primaryColor, { alpha: 0.5 }),
      itemColorActive: derived.primaryColor,
      itemBorderRadius: base.borderRadiusSmall,
      panelColor: derived.popoverColor,
      panelTextColor: derived.textColorSecondaryOverlay,
      panelIconColor: derived.iconColorOverlay,
      panelHeaderTextColor: derived.textColorPrimaryOverlay,
      panelDividerColor: derived.dividerColorOverlay,
      panelBorderRadius: base.borderRadius,
      panelBoxShadow: derived.popoverBoxShadow,
      pickerTextDecorationColor: derived.textColorSecondaryOverlay,
      panelHeaderFontWeight: base.fontWeightStrong
    }
  }
})
