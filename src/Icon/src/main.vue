<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NIcon',
  mixins: [ withapp, themeable ],
  props: {
    size: {
      type: [Number, String],
      default: null
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    tertiary: {
      type: Boolean,
      default: false
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
        style['font-size'] = `${this.size}px`
      }
      if (this.color) {
        style.fill = this.color
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
          'n-icon--primary': this.primary,
          'n-icon--secondary': this.secondary,
          'n-icon--tertiary': this.tertiary
        },
        style: {
          ...this.styles,
          ...this.syntheticStyle
        },
        on: this.$listeners
      }, this.$slots.default)
    }
  }
}
</script>
