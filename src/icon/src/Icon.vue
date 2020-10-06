<script>
import { h } from 'vue'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles/index'
import formatLength from '../../_utils/css/formatLength'
import { getSlot } from '../../_utils/vue'

export default {
  __NAIVE_ICON__: true,
  name: 'Icon',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    size: {
      type: [Number, String],
      default: null
    },
    depth: {
      validator (value) {
        return ['primary', 'secondary', 'tertiary'].includes(value)
      },
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    styles () {
      let style = {}
      if (this.size) {
        style['font-size'] = formatLength(this.size)
      }
      if (this.color) {
        style.fill = this.color
        style.stroke = this.color
      }
      return style
    }
  },
  render () {
    const parent = this.$parent
    if (parent && parent.$options.__NAIVE_ICON__) return getSlot(this)
    else {
      const syntheticTheme = this.syntheticTheme
      const depth = this.depth
      return h('i', {
        ...this.$attrs,
        class: {
          'n-icon': true,
          [`n-${syntheticTheme}-theme`]: syntheticTheme,
          [`n-icon--${depth}-depth`]: depth
        },
        style: {
          ...this.styles,
          ...this.syntheticStyle
        }
      }, this.$slots)
    }
  }
}
</script>
