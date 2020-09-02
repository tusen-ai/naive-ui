import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Steps',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      stepHeaderFontWeight: base.strongFontWeight,
      indicatorTextColorProcess: 'black',
      indicatorTextColorWait: derived.disabledTextColor,
      indicatorTextColorFinish: derived.primaryColor,
      indicatorTextColorError: derived.errorColor,
      indicatorBorderColorProcess: derived.primaryColor,
      indicatorBorderColorWait: derived.disabledTextColor,
      indicatorBorderColorFinish: derived.primaryColor,
      indicatorBorderColorError: derived.errorColor,
      indicatorColorProcess: derived.primaryColor,
      indicatorColorWait: 'transparent',
      indicatorColorFinish: 'transparent',
      indicatorColorError: 'transparent',
      splitorColorProcess: derived.disabledTextColor,
      splitorColorWait: derived.disabledTextColor,
      splitorColorFinish: derived.primaryColor,
      splitorColorError: derived.disabledTextColor,
      headerTextColorProcess: derived.primaryTextColor,
      headerTextColorWait: derived.disabledTextColor,
      headerTextColorFinish: derived.disabledTextColor,
      headerTextColorError: derived.errorColor,
      descriptionTextColorProcess: derived.secondaryTextColor,
      descriptionTextColorWait: derived.disabledTextColor,
      descriptionTextColorFinish: derived.disabledTextColor,
      descriptionTextColorError: derived.errorColor
    }
  }
})
