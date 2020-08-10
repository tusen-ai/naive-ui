import create from '../../styles/_utils/create-component-base'
import inputStyle from '../../input/styles/light'
import buttonStyle from '../../button/styles/light'

export default create({
  theme: 'light',
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
