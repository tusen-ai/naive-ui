import {
  Component,
  computed,
  defineComponent,
  h,
  mergeProps,
  PropType
} from 'vue'
import type { ThemeProps } from '../../_mixins'
import { useConfig, useTheme } from '../../_mixins'
import { formatLength, warn } from '../../_utils'
import type { IconTheme } from '../styles'
import { iconLight } from '../styles'
import style from './styles/index.cssr'

export type Depth = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5' | undefined

export const NIcon = defineComponent({
  _n_icon__: true,
  name: 'Icon',
  inheritAttrs: false,
  props: {
    ...(useTheme.props as ThemeProps<IconTheme>),
    depth: [String, Number] as PropType<Depth>,
    size: [Number, String],
    color: String,
    component: Object as PropType<Component>
  },
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Icon',
      '-icon',
      style,
      iconLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedStyle: computed(() => {
        const { size, color } = props
        return {
          fontSize: formatLength(size),
          color
        }
      }),
      cssVars: computed(() => {
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
          '--n-bezier': cubicBezierEaseInOut
        }
      })
    }
  },
  render () {
    const { $parent, depth, mergedClsPrefix, component } = this
    if ($parent?.$options?._n_icon__) {
      warn('icon', "don't wrap `n-icon` inside `n-icon`")
    }
    return h(
      'i',
      mergeProps(this.$attrs, {
        role: 'img',
        class: [
          `${mergedClsPrefix}-icon`,
          {
            [`${mergedClsPrefix}-icon--depth`]: depth,
            [`${mergedClsPrefix}-icon--color-transition`]: depth !== undefined
          }
        ],
        style: Object.assign(this.cssVars, this.mergedStyle)
      }),
      component ? h(component) : this.$slots
    )
  }
})
