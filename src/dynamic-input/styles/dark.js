import { inputDark } from '../../input/styles'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/new-common'
import commonVariables from './_common'

export default {
  name: 'DynamicInput',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark
  },
  self () {
    return {
      ...commonVariables
    }
  }
}
