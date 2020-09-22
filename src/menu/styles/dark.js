import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'Menu',
  getDerivedVariables ({ base, derived }) {
    return {
      borderRadius: base.borderRadius,
      groupTextColor: derived.textColorTertiaryOverlay,
      itemColorMatch: changeColor(derived.primaryColor, { alpha: 0.15 }),
      itemTextColor: derived.textColorSecondaryOverlay,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorChildSelected: derived.primaryColor,
      itemTextColorSelected: derived.primaryColor,
      itemExtraTextColor: derived.textColorTertiaryOverlay,
      itemExtraTextColorHover: derived.primaryColorHover,
      itemExtraTextColorChildSelected: derived.primaryColor,
      itemExtraTextColorSelected: derived.primaryColor,
      itemIconColor: derived.textColorPrimaryOverlay,
      itemIconColorHover: derived.primaryColorHover,
      itemIconColorSelected: derived.primaryColor,
      itemIconColorChildSelected: derived.primaryColor,
      itemIconColorCollapsed: derived.textColorPrimaryOverlay,
      borderColorHorizontal: derived.primaryColor,
      submenuArrowColor: derived.primaryColor
    }
  }
})
