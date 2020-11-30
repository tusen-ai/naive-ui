import create from '../../_styles/utils/create-component-base'
import {
  tagDark
} from '../../styles'

export default create({
  name: 'DynamicTags',
  theme: 'dark',
  peer: [
    tagDark
  ],
  getDerivedVars (vars) {
    return {}
  }
})
