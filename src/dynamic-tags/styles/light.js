import create from '../../_styles/utils/create-component-base'
import {
  tagLight
} from '../../styles'

export default create({
  name: 'DynamicTags',
  theme: 'light',
  peer: [
    tagLight
  ],
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})
