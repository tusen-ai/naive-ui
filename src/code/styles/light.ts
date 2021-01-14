import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'

const codeLight = {
  name: 'Code',
  common: commonLight,
  self (vars: ThemeCommonVars) {
    const { textColor2, fontSize, fontWeightStrong } = vars
    return {
      textColor: textColor2,
      fontSize,
      fontWeightStrong,
      // extracted from hljs atom-one-light.scss
      'mono-3': '#a0a1a7',
      'hue-1': '#0184bb',
      'hue-2': '#4078f2',
      'hue-3': '#a626a4',
      'hue-4': '#50a14f',
      'hue-5': '#e45649',
      'hue-5-2': '#c91243',
      'hue-6': '#986801',
      'hue-6-2': '#c18401'
    }
  }
}

export default codeLight
export type CodeThemeVars = ReturnType<typeof codeLight.self>
