import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'BackTop',
  getDerivedVariables ({ base, derived }) {
    return {
      backTopButtonFill: {
        default: 'rgba(0, 0, 0, .6)',
        hover: 'rgba(0, 0, 0, .5)',
        active: 'rgba(0, 0, 0, .7)'
      },
      backTopBoxShadow: {
        default: '0 2px 8px 0px rgba(0, 0, 0, .12)',
        hover: `0 2px 12px 0px rgba(0, 0, 0, .18)`,
        active: `0 2px 12px 0px rgba(0, 0, 0, .18)`
      }
    }
  }
})
