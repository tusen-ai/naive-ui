import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Steps',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      stepHeaderFontWeight: base.strongFontWeight,
      indicatorTextColorProcess: 'black',
      indicatorTextColorWait: derived.disabledTextOverlayColor,
      indicatorTextColorFinish: derived.primaryColor,
      indicatorTextColorError: derived.errorColor,
      indicatorBorderColorProcess: derived.primaryColor,
      indicatorBorderColorWait: derived.disabledTextOverlayColor,
      indicatorBorderColorFinish: derived.primaryColor,
      indicatorBorderColorError: derived.errorColor,
      indicatorColorProcess: derived.primaryColor,
      indicatorColorWait: 'transparent',
      indicatorColorFinish: 'transparent',
      indicatorColorError: 'transparent',
      splitorColorProcess: derived.disabledTextOverlayColor,
      splitorColorWait: derived.disabledTextOverlayColor,
      splitorColorFinish: derived.primaryColor,
      splitorColorError: derived.disabledTextOverlayColor,
      headerTextColorProcess: derived.primaryTextOverlayColor,
      headerTextColorWait: derived.disabledTextOverlayColor,
      headerTextColorFinish: derived.disabledTextOverlayColor,
      headerTextColorError: derived.errorColor,
      descriptionTextColorProcess: derived.secondaryTextOverlayColor,
      descriptionTextColorWait: derived.disabledTextOverlayColor,
      descriptionTextColorFinish: derived.disabledTextOverlayColor,
      descriptionTextColorError: derived.errorColor
    }
  }
})
