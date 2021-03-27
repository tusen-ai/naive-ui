import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { inputLight } from '../../input/styles'

const self = (vars: ThemeCommonVars) => {
  const { boxShadow2 } = vars
  return {
    menuBoxShadow: boxShadow2
  }
}

const mentionLight = createTheme({
  name: 'Mention',
  common: commonLight,
  peers: {
    InternalSelectMenu: internalSelectMenuLight,
    Input: inputLight
  },
  self
})

export default mentionLight
export type MentionTheme = typeof mentionLight
export type MentionThemeVars = ReturnType<typeof self>
