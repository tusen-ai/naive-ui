import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'BackTop',
  getDerivedVariables ({ base, derived }) {
    return {
      backTopFill: 'rgba(0, 0, 0, .6)',
      backTopFillHover: 'rgba(0, 0, 0, .5)',
      backTopFillActive: 'rgba(0, 0, 0, .7)',
      backTopBoxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      backTopBoxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      backTopBoxShadowActive: '0 2px 12px 0px rgba(0, 0, 0, .18)'
    }
  }
})
