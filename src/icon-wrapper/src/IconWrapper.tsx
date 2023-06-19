import { computed, defineComponent, h } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { type ExtractPublicPropTypes, formatLength } from '../../_utils'
import { iconWrapperLight } from '../styles'
import type { IconWrapperTheme } from '../styles'
import style from './styles/index.cssr'

export const iconWrapperProps = {
  ...(useTheme.props as ThemeProps<IconWrapperTheme>),
  size: {
    type: Number,
    default: 24
  },
  borderRadius: {
    type: Number,
    default: 6
  },
  color: String,
  iconColor: String
} as const

export type IconWrapperProps = ExtractPublicPropTypes<typeof iconWrapperProps>

export const NIconWrapper = defineComponent({
  name: 'IconWrapper',
  props: iconWrapperProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'IconWrapper',
      '-icon-wrapper',
      style,
      iconWrapperLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { color, iconColor }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color,
        '--n-icon-color': iconColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('icon-wrapper', undefined, cssVarsRef, props)
      : undefined
    return () => {
      const size = formatLength(props.size)
      themeClassHandle?.onRender()
      return (
        <div
          class={[
            `${mergedClsPrefixRef.value}-icon-wrapper`,
            themeClassHandle?.themeClass.value
          ]}
          style={[
            cssVarsRef?.value as any,
            {
              height: size,
              width: size,
              borderRadius: formatLength(props.borderRadius),
              backgroundColor: props.color,
              color: props.iconColor
            }
          ]}
        >
          {slots}
        </div>
      )
    }
  }
})
