import create from '../../_styles/utils/create-component-base'
import { tagLight } from '../../tag/styles'
import { baseLight } from '../../_styles/base'
import { inputLight } from '../../input/styles'
import { buttonLight } from '../../button/styles'

export default create({
  name: 'DynamicTags',
  theme: 'light',
  peer: [baseLight, inputLight, buttonLight, tagLight],
  getLocalVars (vars) {
    return {}
  }
})
