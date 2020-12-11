import create from '../../_styles/utils/create-component-base'
import {
  tagDark
} from '../../tag/styles'
import { baseDark } from '../../_styles/base'
import {
  inputDark
} from '../../input/styles'
import {
  buttonDark
} from '../../button/styles'

export default create({
  name: 'DynamicTags',
  theme: 'dark',
  peer: [
    baseDark,
    tagDark,
    inputDark,
    buttonDark
  ],
  getLocalVars (vars) {
    return {}
  }
})
