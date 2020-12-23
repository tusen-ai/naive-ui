import { h } from 'vue'
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles/index'
import { formatLength, getSlot } from '../../_utils'
import commonProps from './common-props'

export default {
  __NAIVE_ICON__: true,
  name: 'Icon',
  inject: {
    NIconConfigProvider: {
      default: null
    }
  },
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    size: {
      type: [Number, String],
      default: undefined
    },
    depth: {
      validator (value) {
        return [1, 2, 3, 4, 5, '1', '2', '3', '4', '5'].includes(value)
      },
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    },
    colorTransition: {
      type: Boolean,
      default: false
    },
    ...commonProps
  },
  computed: {
    styles () {
      const { size, color } = this
      return {
        fontSize: formatLength(size),
        color
      }
    },
    mergedDepth () {
      const { depth } = this
      if (depth !== undefined) return depth
      return this.NIconConfigProvider?.depth
    }
  },
  render () {
    const parent = this.$parent
    if (parent && parent.$options.__NAIVE_ICON__) return getSlot(this)
    else {
      const { mergedTheme, mergedDepth, colorTransition } = this
      return h(
        'i',
        {
          ...this.$attrs,
          class: [
            'n-icon',
            {
              [`n-${mergedTheme}-theme`]: mergedTheme,
              [`n-icon--${mergedDepth}-depth`]: mergedDepth,
              'n-icon--color-transition':
                colorTransition || mergedDepth !== undefined
            }
          ],
          style: {
            ...this.styles,
            ...this.mergedStyle
          }
        },
        this.$slots
      )
    }
  }
}
