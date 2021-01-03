import { tagLight } from '../../tag/styles'
import { inputLight } from '../../input/styles'
import { buttonLight } from '../../button/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'DynamicTags',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    Tag: tagLight
  }
}
