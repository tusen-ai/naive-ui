import { baseSelectMenuLight } from '../../_base/select-menu/styles'
import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'AutoComplete',
  common: commonLight,
  peers: {
    BaseSelectMenu: baseSelectMenuLight,
    Input: inputLight
  }
}
