import type { ThemeProps } from '../../_mixins'
import { useTheme } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { MarqueeTheme } from '../styles'

export const marqueeProps = {
  ...(useTheme.props as ThemeProps<MarqueeTheme>),
  autoFill: Boolean,
  speed: {
    type: Number,
    default: 48
  }
}

export type MarqueeProps = ExtractPublicPropTypes<typeof marqueeProps>
