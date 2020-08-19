import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      primaryTextOverlayColor
    } = derived
    return {
      statisticValueLabelTextColor: secondaryTextOverlayColor,
      statisticValuePrefixTextColor: primaryTextOverlayColor,
      statisticValueSuffixTextColor: primaryTextOverlayColor,
      statisticValueContentTextColor: primaryTextOverlayColor
    }
  }
})
