import create from '../../../_styles/utils/create-component-base'

export default create({
  name: 'BaseLoading',
  theme: 'light',
  getLocalVars (vars) {
    return {
      color: vars.primaryColor
    }
  }
})
