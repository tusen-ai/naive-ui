import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'Menu',
  getDerivedVariables ({ base, derived }) {
    return {
      groupTextColor: derived.tertiaryTextOverlayColor,
      itemColorMatch: changeColor(derived.primaryColor, { alpha: 0.15 }),
      itemTextColor: derived.secondaryTextOverlayColor,
      itemTextColorHover: derived.primaryHoverColor,
      itemTextColorChildSelected: derived.primaryColor,
      itemTextColorSelected: derived.primaryColor,
      itemExtraTextColor: derived.tertiaryTextOverlayColor,
      itemExtraTextColorHover: derived.primaryHoverColor,
      itemExtraTextColorChildSelected: derived.primaryColor,
      itemExtraTextColorSelected: derived.primaryColor,
      itemIconColor: derived.primaryTextOverlayColor,
      itemIconColorHover: derived.primaryHoverColor,
      itemIconColorSelected: derived.primaryColor,
      itemIconColorChildSelected: derived.primaryColor,
      itemIconColorCollapsed: derived.primaryTextOverlayColor,
      borderColorHorizontal: derived.primaryColor,
      submenuArrowColor: derived.primaryColor
    }
  }
})
