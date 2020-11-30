import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Popconfirm',
  theme: 'light',
  getDerivedVars (vars) {
    return {
      iconColor: vars.warningColor
    }
  }
})
