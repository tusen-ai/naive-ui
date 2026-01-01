import type { ThemeCommonVars } from '../../_styles/common'
import { changeColor } from 'seemly'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { progressLight } from '../../progress/styles'

export function self(vars: ThemeCommonVars) {
  const {
    iconColor,
    primaryColor,
    errorColor,
    textColor2,
    successColor,
    opacityDisabled,
    actionColor,
    borderColor,
    hoverColor,
    lineHeight,
    borderRadius,
    fontSize
  } = vars
  return {
    fontSize,
    lineHeight,
    borderRadius,
    draggerColor: actionColor,
    draggerBorder: `1px dashed ${borderColor}`,
    draggerBorderHover: `1px dashed ${primaryColor}`,
    itemColorHover: hoverColor,
    itemColorHoverError: changeColor(errorColor, {
      alpha: 0.06
    }),
    itemTextColor: textColor2,
    itemTextColorError: errorColor,
    itemTextColorSuccess: successColor,
    itemIconColor: iconColor,
    itemDisabledOpacity: opacityDisabled,
    itemBorderImageCardError: `1px solid ${errorColor}`,
    itemBorderImageCard: `1px solid ${borderColor}`
  }
}

export type UploadThemeVars = ReturnType<typeof self>

const uploadLight = createTheme({
  name: 'Upload',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Progress: progressLight
  },
  self
})

export default uploadLight
export type UploadTheme = typeof uploadLight
