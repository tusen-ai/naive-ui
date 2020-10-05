import create from '../../_styles/utils/create-component-base'
import inputStyle from '../../input/styles/light'
import buttonStyle from '../../button/styles/light'

export default create({
  theme: 'dark',
  name: 'DynamicInput',
  peer: [
    inputStyle,
    buttonStyle
  ],
  getDerivedVariables ({ derived }) {
    return {

    }
  }
})
