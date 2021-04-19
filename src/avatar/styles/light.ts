import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    avatarColor,
    fontSize,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge
  } = vars
  return {
    borderRadius,
    fontSize,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    color: avatarColor
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
