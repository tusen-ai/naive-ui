import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Statistic',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      primaryTextColor
    } = derived
    return {
      statisticValueLabelTextColor: secondaryTextColor,
      statisticValuePrefixTextColor: primaryTextColor,
      statisticValueSuffixTextColor: primaryTextColor,
      statisticValueContentTextColor: primaryTextColor
    }
  }
})
