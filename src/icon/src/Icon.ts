import { h, defineComponent, computed, mergeProps, PropType } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength, warn } from '../../_utils'
import { iconLight } from '../styles'
import type { IconTheme } from '../styles'
import style from './styles/index.cssr'

export type Depth = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5' | undefined

export default defineComponent({
  __ICON__: true,
  name: 'Icon',
  props: {
    ...(useTheme.props as ThemeProps<IconTheme>),
    depth: {
      type: [String, Number] as PropType<Depth>,
      default: undefined
    },
    size: {
      type: [Number, String],
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Icon',
      'Icon',
      style,
      iconLight,
      props,
      mergedClsPrefix
    )
    return {
      cPrefix: mergedClsPrefix,
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
            '--bezier': cubicBezierEaseInOut,
            '--color': color,
            '--opacity': opacity
          }
        }
        return {
          '--bezier': cubicBezierEaseInOut
        }
      })
    }
  },
  render () {
    const { $parent, depth, cPrefix } = this
    if ($parent?.$options.__ICON__) {
      warn('icon', "don't wrap `n-icon` inside `n-icon`")
    }
    return h(
      'i',
      mergeProps(this.$attrs, {
        class: [
          `${cPrefix}-icon`,
          {
            [`${cPrefix}-icon--depth`]: depth,
            [`${cPrefix}-icon--color-transition`]: depth !== undefined
          }
        ],
        style: Object.assign(this.cssVars, this.mergedStyle)
      }),
      this.$slots
    )
  }
})
