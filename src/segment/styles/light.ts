import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import sizeVariables from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    baseColor,
    segmentColor,
    lineHeight,
    textColor2,
    textColorDisabled,
    borderRadiusSmall,
    borderRadiusMedium,
    borderRadiusLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    pressedColor
  } = vars
  return {
    color: segmentColor,
    lineHeight,
    borderRadiusSmall,
    borderRadiusMedium,
    borderRadiusLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    textColor: textColor2,
    textColorDisabled,
    segmentCapsuleColorSegment: baseColor,
    segmentHoverBg: pressedColor,
    ...sizeVariables
  }
}

export type SegmentThemeVars = ReturnType<typeof self>

const segmentLight: Theme<'Segment', SegmentThemeVars> = {
  name: 'Segment',
  common: commonLight,
  self
}

export default segmentLight
export type SegmentTheme = typeof segmentLight
