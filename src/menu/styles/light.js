import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'light',
  name: 'Menu',
  getDerivedVariables ({ base, derived }) {
    return {
      borderRadius: base.borderRadius,
      groupTextColor: derived.textColorTertiary,
      itemColorMatch: changeColor(derived.primaryColor, { alpha: 0.1 }),
      itemTextColor: derived.textColorSecondary,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorChildSelected: derived.primaryColor,
      itemTextColorSelected: derived.primaryColor,
      itemExtraTextColor: derived.textColorTertiary,
      itemExtraTextColorHover: derived.primaryColorHover,
      itemExtraTextColorChildSelected: derived.primaryColor,
      itemExtraTextColorSelected: derived.primaryColor,
      itemIconColor: derived.textColorPrimary,
      itemIconColorHover: derived.primaryColorHover,
      itemIconColorSelected: derived.primaryColor,
      itemIconColorChildSelected: derived.primaryColor,
      itemIconColorCollapsed: derived.textColorPrimary,
      borderColorHorizontal: derived.primaryColor,
      submenuArrowColor: derived.primaryColor
    }
  }
})
