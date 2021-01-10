import { inputLight } from '../../input/styles'
import { buttonLight } from '../../button/styles'
import { commonLight } from '../../_styles/new-common'
import commonVariables from './_common'

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
