import create from '../../_styles/utils/create-component-base'
import {
  tagDark
} from '../../tag'
import { baseDark } from '../../_styles/base'
import {
  inputDark
} from '../../input'
import {
  buttonDark
} from '../../button'

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
