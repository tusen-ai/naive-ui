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
