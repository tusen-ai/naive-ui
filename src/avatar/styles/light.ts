import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    avatarColorOverlay,
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
    color: avatarColorOverlay
  }
}

export type AvatarThemeVars = ReturnType<typeof self>

const avatarLight: Theme<AvatarThemeVars> = {
  name: 'Avatar',
  common: commonLight,
  self
}

export default avatarLight
export type AvatarTheme = typeof avatarLight
