import { commonDark } from '../../_styles/common'
import type { MentionTheme } from './light'
import { internalSelectMenuDark } from '../../_internal/select-menu/styles'
import { inputDark } from '../../input/styles'

const listDark: MentionTheme = {
  name: 'Mention',
  common: commonDark,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    Input: inputDark
  },
  self (vars) {
    const { boxShadow2 } = vars
    return {
      menuBoxShadow: boxShadow2
    }
  }
}

export default listDark
