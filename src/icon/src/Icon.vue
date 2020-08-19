<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import formatLength from '../../_utils/css/formatLength'
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index'

export default {
  name: 'Icon',
  __NAIVE_ICON__: true,
  mixins: [ withapp, themeable, usecssr(styles) ],
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
  render (h) {
    const parent = this.$parent
    if (parent && parent.$options.__NAIVE_ICON__) return getDefaultSlot(this)
    else {
      const syntheticTheme = this.syntheticTheme
      const depth = this.depth
      return h('i', {
        staticClass: 'n-icon',
        class: {
          [`n-${syntheticTheme}-theme`]: syntheticTheme,
          [`n-icon--${depth}-depth`]: depth
        },
        style: {
          ...this.styles,
          ...this.syntheticStyle
        },
        on: Object.assign({}, this.$listeners)
      }, getDefaultSlot(this))
    }
  }
}
</script>
