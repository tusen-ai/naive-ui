import { computed, defineComponent, h } from 'vue'
import {
  emptyThemeClassHandle,
  useConfig,
  useTheme,
  useThemeClass
} from '../../_mixins'
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
  color: String,
  iconColor: String
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
        self: { color, iconColor }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color,
        '--n-icon-color': iconColor
      }
    })
    const themeClassHandle = disableInlineTheme
      ? useThemeClass('icon-wrapper', undefined, cssVarsRef, props)
      : emptyThemeClassHandle
    return () => {
      const size = formatLength(props.size)
      themeClassHandle.onRender?.()
      return (
        <div
          class={[
            `${mergedClsPrefixRef.value}-icon-wrapper`,
            themeClassHandle?.themeClass?.value
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
