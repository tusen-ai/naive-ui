import commonVariables from './_common'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import type { TagTheme } from './light'

const tagDark: TagTheme = {
  name: 'Tag',
  common: commonDark,
  self (vars) {
    const {
      textColor2,
      primaryColorHover,
      primaryColorPressed,
      primaryColor,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      baseColor,
      borderColor,
      opacityDisabled,
      closeColor,
      closeColorHover,
      closeColorPressed,
      borderRadiusSmall: borderRadius,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      heightTiny,
      heightSmall,
      heightMedium
    } = vars
    return {
      ...commonVariables,
      heightSmall: heightTiny,
      heightMedium: heightSmall,
      heightLarge: heightMedium,
      borderRadius,
      opacityDisabled,
      fontSizeSmall: fontSizeTiny,
      fontSizeMedium: fontSizeSmall,
      fontSizeLarge: fontSizeMedium,
      // checked
      textColorCheckable: textColor2,
      textColorHoverCheckable: primaryColorHover,
      textColorPressedCheckable: primaryColorPressed,
      textColorChecked: baseColor,
      colorCheckable: '#0000',
      colorHoverCheckable: '#0000',
      colorPressedCheckable: '#0000',
      colorChecked: primaryColor,
      colorCheckedHover: primaryColorHover,
      colorCheckedPressed: primaryColorPressed,
      // default
      border: `1px solid ${borderColor}`,
      textColor: textColor2,
      color: '#0000',
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      borderPrimary: `1px solid ${changeColor(primaryColor, { alpha: 0.3 })}`,
      textColorPrimary: primaryColor,
      colorPrimary: '#0000',
      closeColorPrimary: changeColor(primaryColor, { alpha: 0.7 }),
      closeColorHoverPrimary: changeColor(primaryColor, { alpha: 0.85 }),
      closeColorPressedPrimary: changeColor(primaryColor, { alpha: 0.57 }),
      borderInfo: `1px solid ${changeColor(infoColor, { alpha: 0.3 })}`,
      textColorInfo: infoColor,
      colorInfo: '#0000',
      closeColorInfo: changeColor(infoColor, { alpha: 0.7 }),
      closeColorHoverInfo: changeColor(infoColor, { alpha: 0.85 }),
      closeColorPressedInfo: changeColor(infoColor, { alpha: 0.57 }),
      borderSuccess: `1px solid ${changeColor(successColor, { alpha: 0.3 })}`,
      textColorSuccess: successColor,
      colorSuccess: '#0000',
      closeColorSuccess: changeColor(successColor, { alpha: 0.7 }),
      closeColorHoverSuccess: changeColor(successColor, { alpha: 0.85 }),
      closeColorPressedSuccess: changeColor(successColor, { alpha: 0.57 }),
      borderWarning: `1px solid ${changeColor(warningColor, { alpha: 0.3 })}`,
      textColorWarning: warningColor,
      colorWarning: '#0000',
      closeColorWarning: changeColor(warningColor, { alpha: 0.7 }),
      closeColorHoverWarning: changeColor(warningColor, { alpha: 0.85 }),
      closeColorPressedWarning: changeColor(warningColor, { alpha: 0.57 }),
      borderError: `1px solid ${changeColor(errorColor, { alpha: 0.3 })}`,
      textColorError: errorColor,
      colorError: '#0000',
      closeColorError: changeColor(errorColor, { alpha: 0.7 }),
      closeColorHoverError: changeColor(errorColor, { alpha: 0.85 }),
      closeColorPressedError: changeColor(errorColor, { alpha: 0.57 })
    }
  }
}

export default tagDark
