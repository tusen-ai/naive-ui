import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Code',
  common: commonDark,
  self (vars) {
    const { textColor2, fontSize, fontWeightStrong } = vars
    return {
      textColor: textColor2,
      fontSize,
      fontWeightStrong,
      // extracted from hljs atom-one-dark.scss
      'mono-3': '#5c6370',
      'hue-1': '#56b6c2',
      'hue-2': '#61aeee',
      'hue-3': '#c678dd',
      'hue-4': '#98c379',
      'hue-5': '#e06c75',
      'hue-5-2': '#be5046',
      'hue-6': '#d19a66',
      'hue-6-2': '#e6c07b'
    }
  }
}
