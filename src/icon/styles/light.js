import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Icon',
  getDerivedVariables ({ derived }) {
    const {
      textColorBase,
      opacity1,
      opacity2,
      opacity3
    } = derived
    return {
      color: textColorBase,
      opacity1Depth: opacity1,
      opacity2Depth: opacity2,
      opacity3Depth: opacity3
    }
  }
})
