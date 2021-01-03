import { inputLight } from '../../input/styles'
import { buttonLight } from '../../button/styles'
import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'DynamicInput',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight
  },
  self () {
    return {
      ...commonVariables
    }
  }
}
