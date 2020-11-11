import tagLightStyle from '../../tag/styles/light'
import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'DynamicTags',
  theme: 'light',
  peer: [
    tagLightStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})
