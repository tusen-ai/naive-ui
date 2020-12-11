import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon'

export default create({
  theme: 'light',
  name: 'Steps',
  peer: [
    baseDark,
    iconDark
  ],
  getLocalVars (vars) {
    return {
      ...commonVariables,
      stepHeaderFontWeight: vars.fontWeightStrong,
      indicatorTextColorProcess: vars.baseColor,
      indicatorTextColorWait: vars.textColorDisabled,
      indicatorTextColorFinish: vars.primaryColor,
      indicatorTextColorError: vars.errorColor,
      indicatorBorderColorProcess: vars.primaryColor,
      indicatorBorderColorWait: vars.textColorDisabled,
      indicatorBorderColorFinish: vars.primaryColor,
      indicatorBorderColorError: vars.errorColor,
      indicatorColorProcess: vars.primaryColor,
      indicatorColorWait: 'transparent',
      indicatorColorFinish: 'transparent',
      indicatorColorError: 'transparent',
      splitorColorProcess: vars.textColorDisabled,
      splitorColorWait: vars.textColorDisabled,
      splitorColorFinish: vars.primaryColor,
      splitorColorError: vars.textColorDisabled,
      headerTextColorProcess: vars.textColor1,
      headerTextColorWait: vars.textColorDisabled,
      headerTextColorFinish: vars.textColorDisabled,
      headerTextColorError: vars.errorColor,
      descriptionTextColorProcess: vars.textColor2,
      descriptionTextColorWait: vars.textColorDisabled,
      descriptionTextColorFinish: vars.textColorDisabled,
      descriptionTextColorError: vars.errorColor
    }
  }
})
