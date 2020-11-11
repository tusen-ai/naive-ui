import create from '../../styles/_utils/create-component-base'
import tagDarkStyle from '../../tag/styles/light'

export default create({
  name: 'DynamicTags',
  theme: 'dark',
  peer: [
    tagDarkStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})
