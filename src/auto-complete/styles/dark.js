import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'AutoComplete',
  common: commonDark,
  peers: {
    BaseSelectMenu: baseSelectMenuDark,
    Input: inputDark
  }
}
