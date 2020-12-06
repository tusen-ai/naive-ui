import create from '../../_styles/utils/create-component-base'
import {
  tagDark
} from '../../tag/styles'

export default create({
  name: 'DynamicTags',
  theme: 'dark',
  peer: [
    tagDark
  ],
  getLocalVars (vars) {
    return {}
  }
})
