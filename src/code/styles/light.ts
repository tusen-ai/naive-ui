import type { ExtractThemeOverrides, Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

function self(vars: ThemeCommonVars) {
  const { textColor2, fontSize, fontWeightStrong, textColor3 } = vars
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
    'hue-6-2': '#c18401',
    // line-number styles
    lineNumberTextColor: textColor3
  }
}

export interface CodeThemeVars extends ReturnType<typeof self> {}

const codeLight: CodeTheme = {
  name: 'Code',
  common: commonLight,
  self
}

export interface CodeTheme extends Theme<'Code', CodeThemeVars> {}

export interface CodeThemeOverrides extends ExtractThemeOverrides<CodeTheme> {}

export default codeLight
