<script>
import intersection from 'lodash/intersection'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NCollapse',
  provide () {
    return {
      NCollapse: this
    }
  },
  mixins: [
    withapp,
    themeable
  ],
  props: {
    value: {
      type: [Array, String],
      default: null
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collectedItemNames: []
    }
  },
  methods: {
    toggleItem (collapse, name) {
      if (this.accordion) {
        if (collapse) {
          this.$emit('input', [name])
        } else {
          this.$emit('input', [])
        }
      } else {
        if (!Array.isArray(this.value)) {
          this.$emit('input', [name])
        } else {
          const activeNames = intersection(this.value, this.collectedItemNames)
          const index = activeNames.findIndex(activeName => name === activeName)
          if (~index) {
            activeNames.splice(index, 1)
            this.$emit('input', activeNames)
          } else {
            activeNames.push(name)
            this.$emit('input', activeNames)
          }
        }
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-collapse',
      class: {
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
      }
    }, this.$slots.default)
  }
}
</script>
