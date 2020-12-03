import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  theme: 'light',
  name: 'Menu',
  getLocalVars (vars) {
    return {
      borderRadius: vars.borderRadius,
      groupTextColor: vars.textColor3,
      itemColorMatch: changeColor(vars.primaryColor, { alpha: 0.1 }),
      itemTextColor: vars.textColor2,
      itemTextColorHover: vars.primaryColorHover,
      itemTextColorChildSelected: vars.primaryColor,
      itemTextColorSelected: vars.primaryColor,
      itemExtraTextColor: vars.textColor3,
      itemExtraTextColorHover: vars.primaryColorHover,
      itemExtraTextColorChildSelected: vars.primaryColor,
      itemExtraTextColorSelected: vars.primaryColor,
      itemIconColor: vars.textColor1,
      itemIconColorHover: vars.primaryColorHover,
      itemIconColorSelected: vars.primaryColor,
      itemIconColorChildSelected: vars.primaryColor,
      itemIconColorCollapsed: vars.textColor1,
      borderColorHorizontal: 'transparent',
      submenuArrowColor: vars.primaryColor
    }
  }
})
