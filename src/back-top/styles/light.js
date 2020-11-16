import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'BackTop',
  getDerivedVariables ({ base, derived }) {
    return {
      color: 'rgba(0, 0, 0, .6)',
      colorHover: 'rgba(0, 0, 0, .5)',
      colorActive: 'rgba(0, 0, 0, .7)',
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)'
    }
  }
})
