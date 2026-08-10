import type { InternalSelectMenuTheme } from '../../_internal/select-menu/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { InputTheme } from '../../input/styles'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { inputLight } from '../../input/styles'

function self(vars: ThemeCommonVars) {
  const { boxShadow2 } = vars
  return {
    menuBoxShadow: boxShadow2
  }
}

const mentionLight: MentionTheme = createTheme({
  name: 'Mention',
  common: commonLight,
  peers: {
    InternalSelectMenu: internalSelectMenuLight,
    Input: inputLight
  },
  self
})

export interface MentionTheme extends Theme<
  'Mention',
  MentionThemeVars,
  {
    InternalSelectMenu: InternalSelectMenuTheme
    Input: InputTheme
  }
> {}

export interface MentionThemeOverrides extends ExtractThemeOverrides<MentionTheme> {}

export default mentionLight
export interface MentionThemeVars extends ReturnType<typeof self> {}
