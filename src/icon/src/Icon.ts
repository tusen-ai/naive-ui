import {
  type Component,
  computed,
  defineComponent,
  h,
  mergeProps,
  type PropType
} from 'vue'
import {
  type ThemeProps,
  useThemeClass,
  useConfig,
  useTheme
} from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { formatLength, warn } from '../../_utils'
import type { IconTheme } from '../styles'
import { iconLight } from '../styles'
import style from './styles/index.cssr'

export type Depth = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5' | undefined

export const iconProps = {
  ...(useTheme.props as ThemeProps<IconTheme>),
  depth: [String, Number] as PropType<Depth>,
  size: [Number, String] as PropType<number | string>,
  color: String,
  component: Object as PropType<Component>
} as const

export type IconProps = ExtractPublicPropTypes<typeof iconProps>

export const NIcon = defineComponent({
  _n_icon__: true,
  name: 'Icon',
  inheritAttrs: false,
  props: iconProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Icon',
      '-icon',
      style,
      iconLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { depth } = props
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      if (depth !== undefined) {
        const { color, [`opacity${depth}Depth` as const]: opacity } = self
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-color': color,
          '--n-opacity': opacity
        }
      }
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': '',
        '--n-opacity': ''
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'icon',
        computed(() => `${props.depth || 'd'}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedStyle: computed(() => {
        const { size, color } = props
        return {
          fontSize: formatLength(size),
          color
        }
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { $parent, depth, mergedClsPrefix, component, onRender, themeClass } =
      this
    if ($parent?.$options?._n_icon__) {
      warn('icon', "don't wrap `n-icon` inside `n-icon`")
    }
    onRender?.()
    return h(
      'i',
      mergeProps(this.$attrs, {
        role: 'img',
        class: [
          `${mergedClsPrefix}-icon`,
          themeClass,
          {
            [`${mergedClsPrefix}-icon--depth`]: depth,
            [`${mergedClsPrefix}-icon--color-transition`]: depth !== undefined
          }
        ],
        style: [this.cssVars, this.mergedStyle]
      }),
      component ? h(component) : this.$slots
    )
  }
})
