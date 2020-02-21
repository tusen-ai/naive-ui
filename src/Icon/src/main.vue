<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import formatLength from '../../_utils/css/formatLength'

export default {
  name: 'NIcon',
  mixins: [ withapp, themeable ],
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
    if (this.$parent && this.$parent.$options.name === 'NIcon') return this.$slots.default
    else {
      return h('i', {
        staticClass: 'n-icon',
        class: {
          [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
          [`n-icon--${this.depth}-depth`]: this.depth
        },
        style: {
          ...this.styles,
          ...this.syntheticStyle
        },
        on: Object.assign({}, this.$listeners)
      }, this.$slots.default)
    }
  }
}
</script>
