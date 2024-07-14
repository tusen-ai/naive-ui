import { commonDark } from '../../_styles/common'
import { internalSelectMenuDark } from '../../_internal/select-menu/styles'
import { inputDark } from '../../input/styles'
import type { MentionTheme } from './light'

const listDark: MentionTheme = {
  name: 'Mention',
  common: commonDark,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    Input: inputDark
  },
  self(vars) {
    const { boxShadow2 } = vars
    return {
      menuBoxShadow: boxShadow2
    }
  }
}

export default listDark
