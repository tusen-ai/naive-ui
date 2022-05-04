import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'
import { composite } from 'seemly'

export const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    avatarColor,
    cardColor,
    fontSize,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    modalColor,
    popoverColor
  } = vars
  return {
    borderRadius,
    fontSize,
    border: `2px solid ${cardColor}`,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    color: composite(cardColor, avatarColor),
    colorModal: composite(modalColor, avatarColor),
    colorPopover: composite(popoverColor, avatarColor)
  }
}

export type AvatarThemeVars = ReturnType<typeof self>

const avatarLight: Theme<'Avatar', AvatarThemeVars> = {
  name: 'Avatar',
  common: commonLight,
  self
}

export default avatarLight
export type AvatarTheme = typeof avatarLight
export type AvatarGroupTheme = typeof avatarLight
