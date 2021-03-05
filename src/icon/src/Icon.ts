import { h, defineComponent, computed, mergeProps } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength, warn } from '../../_utils'
import { iconLight } from '../styles'
import type { IconTheme } from '../styles'
import commonProps from './common-props'
import style from './styles/index.cssr'

export default defineComponent({
  __NAIVE_ICON__: true,
  name: 'Icon',
  props: {
    ...(useTheme.props as ThemeProps<IconTheme>),
    ...commonProps,
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
    const themeRef = useTheme('Icon', 'Icon', style, iconLight, props)
    return {
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
    const { $parent, depth } = this
    if ($parent?.$options.__NAIVE_ICON__) {
      warn('icon', "don't wrap `n-icon` inside `n-icon`")
    }
    return h(
      'i',
      mergeProps(this.$attrs, {
        class: [
          'n-icon',
          {
            'n-icon--depth': depth,
            'n-icon--color-transition': depth
          }
        ],
        style: Object.assign(this.cssVars, this.mergedStyle)
      }),
      this.$slots
    )
  }
})
