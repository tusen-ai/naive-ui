import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Popconfirm',
  theme: 'dark',
  getLocalVars (vars) {
    return {
      iconColor: vars.warningColor
    }
  }
})
