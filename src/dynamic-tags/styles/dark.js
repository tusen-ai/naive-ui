import { tagDark } from '../../tag/styles'
import { inputDark } from '../../input/styles'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'DynamicTags',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    Tag: tagDark
  }
}
