import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  theme: 'dark',
  name: 'DatePicker',
  getDerivedVariables ({ base, derived }) {
    return {
      itemTextColor: derived.textColor2Overlay,
      itemTextColorMatched: derived.popoverColor,
      itemSupColor: derived.primaryColor,
      itemSupColorMatch: derived.popoverColor,
      itemColorHover: changeColor(derived.primaryColor, { alpha: 0.5 }),
      itemColorActive: derived.primaryColor,
      itemBorderRadius: base.borderRadiusSmall,
      panelColor: derived.popoverColor,
      panelTextColor: derived.textColor2Overlay,
      panelIconColor: derived.iconColorOverlay,
      panelHeaderTextColor: derived.textColor1Overlay,
      panelDividerColor: derived.dividerColorOverlay,
      panelBorderRadius: base.borderRadius,
      panelBoxShadow: derived.boxShadow2,
      pickerTextDecorationColor: derived.textColor2Overlay,
      panelHeaderFontWeight: base.fontWeightStrong
    }
  }
})
