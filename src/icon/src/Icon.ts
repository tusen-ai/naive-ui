import { h, defineComponent, computed, inject, mergeProps } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength, warn } from '../../_utils'
import { iconLight } from '../styles'
import type { IconTheme } from '../styles'
import commonProps from './common-props'
import style from './styles/index.cssr'

import type { Depth } from './common-props'

export interface IconConfigProviderInjection {
  depth: Depth
}

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
    },
    // private
    configurable: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const NIconConfigProvider = inject<IconConfigProviderInjection | null>(
      'NIconConfigProvider',
      null
    )
    const mergedDepthRef = computed(() => {
      const { depth, configurable } = props
      if (depth !== undefined) return depth
      return configurable ? NIconConfigProvider?.depth : undefined
    })
    const themeRef = useTheme('Icon', 'Icon', style, iconLight, props)
    return {
      mergedStyle: computed(() => {
        const { size, color } = props
        return {
          fontSize: formatLength(size),
          color
        }
      }),
      mergedDepth: mergedDepthRef,
      cssVars: computed(() => {
        const { value: depth } = mergedDepthRef
        const {
          common: { cubicBezierEaseInOut },
          self
        } = themeRef.value
        if (depth !== undefined) {
          const {
            color,
            [`opacity${depth}Depth` as 'opacity1Depth']: opacity
          } = self
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
    const { $parent, mergedDepth } = this
    if ($parent?.$options.__NAIVE_ICON__) {
      warn('icon', "don't wrap `n-icon` inside `n-icon`")
    }
    return h(
      'i',
      mergeProps(this.$attrs, {
        class: [
          'n-icon',
          {
            'n-icon--depth': mergedDepth,
            'n-icon--color-transition': mergedDepth
          }
        ],
        style: Object.assign(this.cssVars, this.mergedStyle)
      }),
      this.$slots
    )
  }
})
