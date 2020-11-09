import { h } from 'vue'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles/index'
import { formatLength } from '../../_utils'
import { getSlot } from '../../_utils/vue'

export default {
  __NAIVE_ICON__: true,
  name: 'Icon',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
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
    }
  },
  computed: {
    styles () {
      const {
        size,
        color
      } = this
      return {
        fontSize: formatLength(size),
        color
      }
    }
  },
  render () {
    const parent = this.$parent
    if (parent && parent.$options.__NAIVE_ICON__) return getSlot(this)
    else {
      const mergedTheme = this.mergedTheme
      const depth = this.depth
      return h('i', {
        ...this.$attrs,
        class: {
          'n-icon': true,
          [`n-${mergedTheme}-theme`]: mergedTheme,
          [`n-icon--${depth}-depth`]: depth
        },
        style: {
          ...this.styles,
          ...this.mergedStyle
        }
      }, this.$slots)
    }
  }
}
