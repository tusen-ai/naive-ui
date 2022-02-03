import { computed, defineComponent, h } from 'vue'
import { useConfig, useTheme, useCssVarsClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength } from '../../_utils'
import { iconWrapperLight } from '../styles'
import type { IconWrapperTheme } from '../styles'
import style from './styles/index.cssr'

const iconWrapperProps = {
  ...(useTheme.props as ThemeProps<IconWrapperTheme>),
  size: {
    type: Number,
    default: 24
  },
  borderRadius: {
    type: Number,
    default: 6
  },
  color: String
} as const

export const NIconWrapper = defineComponent({
  name: 'IconWrapper',
  props: iconWrapperProps,
  setup (props, { slots }) {
    const themeRef = useTheme(
      'IconWrapper',
      '-icon-wrapper',
      style,
      iconWrapperLight,
      props
    )
    const { mergedClsPrefixRef, NConfigProvider } = useConfig(props)
    const { disableInlineTheme } = NConfigProvider || {}
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { color }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color
      }
    })
    const cssVarsClassRef = disableInlineTheme
      ? useCssVarsClass('icon-wrapper', undefined, cssVarsRef, props)
      : undefined
    return () => {
      const size = formatLength(props.size)
      return (
        <div
          class={[
            `${mergedClsPrefixRef.value}-icon-wrapper`,
            cssVarsClassRef?.value
          ]}
          style={[
            cssVarsRef?.value as any,
            {
              height: size,
              width: size,
              borderRadius: formatLength(props.borderRadius),
              backgroundColor: props.color
            }
          ]}
        >
          {slots}
        </div>
      )
    }
  }
})
