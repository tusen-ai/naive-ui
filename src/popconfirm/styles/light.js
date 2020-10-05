import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Popconfirm',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      iconColor: derived.warningColor
    }
  }
})
