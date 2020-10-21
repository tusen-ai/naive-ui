import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Steps',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      stepHeaderFontWeight: base.fontWeightStrong,
      indicatorTextColorProcess: 'black',
      indicatorTextColorWait: derived.textColorDisabledOverlay,
      indicatorTextColorFinish: derived.primaryColor,
      indicatorTextColorError: derived.errorColor,
      indicatorBorderColorProcess: derived.primaryColor,
      indicatorBorderColorWait: derived.textColorDisabledOverlay,
      indicatorBorderColorFinish: derived.primaryColor,
      indicatorBorderColorError: derived.errorColor,
      indicatorColorProcess: derived.primaryColor,
      indicatorColorWait: 'transparent',
      indicatorColorFinish: 'transparent',
      indicatorColorError: 'transparent',
      splitorColorProcess: derived.textColorDisabledOverlay,
      splitorColorWait: derived.textColorDisabledOverlay,
      splitorColorFinish: derived.primaryColor,
      splitorColorError: derived.textColorDisabledOverlay,
      headerTextColorProcess: derived.textColor1Overlay,
      headerTextColorWait: derived.textColorDisabledOverlay,
      headerTextColorFinish: derived.textColorDisabledOverlay,
      headerTextColorError: derived.errorColor,
      descriptionTextColorProcess: derived.textColor2Overlay,
      descriptionTextColorWait: derived.textColorDisabledOverlay,
      descriptionTextColorFinish: derived.textColorDisabledOverlay,
      descriptionTextColorError: derived.errorColor
    }
  }
})
